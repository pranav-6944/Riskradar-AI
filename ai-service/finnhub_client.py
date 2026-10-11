"""
RiskRadar AI - Live Finnhub Financial News Integration Client
Pulls live real-time market and company news via Finnhub Stock API and feeds it into the NLP engine.
"""

import os
import httpx
from datetime import datetime, timedelta
import asyncio
import random
from typing import List, Dict, Optional, Set

FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY", "db5map9r01qv1n8viqtgdb5map9r01qv1n8viqu0")
BASE_URL = "https://finnhub.io/api/v1"
SPRING_BOOT_INTERNAL_URL = "http://localhost:8080/internal/event"

TICKER_MAP = {
    "JPM": "JPMorgan Chase",
    "GS": "Goldman Sachs",
    "WFC": "Wells Fargo",
    "C": "Citigroup",
    "BAC": "Bank of America"
}

COMPANY_TO_TICKER = {v: k for k, v in TICKER_MAP.items()}

class FinnhubClient:
    def __init__(self, api_key: str = FINNHUB_API_KEY):
        self.api_key = api_key
        self._cache: Dict[str, List[dict]] = {}
        self._article_index: Dict[str, int] = {k: 0 for k in TICKER_MAP.keys()}
        self._seen_ids: Set[int] = set()

    async def fetch_company_news(self, symbol: str, days_back: int = 14) -> List[dict]:
        """Fetches live real-world news articles for a financial institution ticker from Finnhub."""
        symbol = symbol.upper()
        today = datetime.now().date()
        start_date = today - timedelta(days=days_back)
        
        url = f"{BASE_URL}/company-news"
        params = {
            "symbol": symbol,
            "from": start_date.strftime("%Y-%m-%d"),
            "to": today.strftime("%Y-%m-%d"),
            "token": self.api_key,
        }

        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                res = await client.get(url, params=params)
                if res.status_code == 200:
                    data = res.json()
                    self._cache[symbol] = data
                    return data
                else:
                    print(f"[Finnhub] API returned status {res.status_code}: {res.text}")
                    return []
        except Exception as e:
            print(f"[Finnhub] Error fetching news for {symbol}: {e}")
            return []

    async def fetch_market_news(self, category: str = "general") -> List[dict]:
        """Fetches general live market news from Bloomberg, Reuters, CNBC via Finnhub."""
        url = f"{BASE_URL}/news"
        params = {
            "category": category,
            "token": self.api_key,
        }

        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                res = await client.get(url, params=params)
                if res.status_code == 200:
                    return res.json()
                return []
        except Exception as e:
            print(f"[Finnhub] Error fetching market news: {e}")
            return []

    async def ingest_next_live_article(self, symbol: str) -> Optional[dict]:
        """
        Pulls the next real, live Finnhub article for this company, classifies it
        via the 120+ regex NLP engine, updates rolling CRI, and dispatches to Spring Boot.
        """
        symbol = symbol.upper()
        articles = self._cache.get(symbol)
        
        # If cache empty or exhausted, fetch fresh from Finnhub
        if not articles:
            articles = await self.fetch_company_news(symbol, days_back=14)
            if articles:
                self._cache[symbol] = articles

        if not articles:
            # Fallback to general market news if company news empty
            articles = await self.fetch_market_news()

        if not articles:
            return None

        # Find the next unseen article
        chosen_article = None
        current_idx = self._article_index.get(symbol, 0)
        
        for i in range(len(articles)):
            idx = (current_idx + i) % len(articles)
            candidate = articles[idx]
            cand_id = candidate.get("id")
            if cand_id not in self._seen_ids:
                chosen_article = candidate
                self._seen_ids.add(cand_id)
                self._article_index[symbol] = idx + 1
                break

        # If all articles in cache have been seen once, recycle oldest
        if not chosen_article:
            idx = current_idx % len(articles)
            chosen_article = articles[idx]
            self._article_index[symbol] = (idx + 1) % len(articles)

        return await self._process_and_dispatch(chosen_article, symbol)

    async def ingest_live_news_item(self, symbol: str, item_index: int = 0) -> Optional[dict]:
        """Direct manual sync for a specific article index."""
        symbol = symbol.upper()
        articles = self._cache.get(symbol) or await self.fetch_company_news(symbol, days_back=14)
        if not articles:
            articles = await self.fetch_market_news()

        if not articles:
            return None

        article = articles[item_index % len(articles)]
        return await self._process_and_dispatch(article, symbol)

    async def _process_and_dispatch(self, article: dict, symbol: str) -> Optional[dict]:
        from risk_engine import ingest
        
        company_name = TICKER_MAP.get(symbol.upper(), "JPMorgan Chase")
        headline = article.get("headline", "").strip()
        summary = article.get("summary", "").strip()
        source_name = f"Finnhub Live Wire ({article.get('source', 'Reuters')})"
        
        combined_text = f"{headline}. {summary}".strip()
        if not combined_text:
            combined_text = headline
            
        if not combined_text:
            return None

        # 1. Run 120+ regex NLP engine & CRI computation
        result = ingest(combined_text, company_name, source_name)
        
        # 2. Attach live Finnhub metadata
        if "event" in result:
            result["event"]["url"] = article.get("url", "")
            result["event"]["image"] = article.get("image", "")
            result["event"]["finnhubId"] = article.get("id", "")
            result["event"]["isLiveApi"] = True
            result["event"]["datetime"] = article.get("datetime", int(datetime.now().timestamp()))

        # 3. Asynchronously post to Java Spring Boot internal webhook
        asyncio.create_task(self._post_to_spring_boot(result.get("event")))
        return result

    async def _post_to_spring_boot(self, event_data: dict):
        if not event_data:
            return
        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                await client.post(SPRING_BOOT_INTERNAL_URL, json=event_data)
        except Exception as e:
            print(f"[Finnhub] Error posting event to Spring Boot: {e}")

finnhub = FinnhubClient()

"""
RiskRadar AI - Live Finnhub Financial News Integration Client
Pulls live real-time market and company news via Finnhub Stock API and feeds it into the NLP engine.
"""

import os
import httpx
from datetime import datetime, timedelta
import asyncio
from typing import List, Dict, Optional

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

    async def ingest_live_news_item(self, symbol: str, item_index: int = 0) -> Optional[dict]:
        """
        Fetches live article for ticker, runs 120+ regex NLP classification,
        computes CRI impact, and posts live event to Java Spring Boot gateway.
        """
        from risk_engine import ingest
        
        symbol = symbol.upper()
        company_name = TICKER_MAP.get(symbol, "JPMorgan Chase")
        
        articles = await self.fetch_company_news(symbol, days_back=14)
        if not articles:
            # Fallback to general market news
            articles = await self.fetch_market_news()

        if not articles:
            return None

        # Pick article at requested index
        article = articles[item_index % len(articles)]
        headline = article.get("headline", "")
        summary = article.get("summary", "")
        source_name = f"Finnhub Live Wire ({article.get('source', 'Reuters')})"
        
        combined_text = f"{headline}. {summary}".strip()
        if not combined_text:
            combined_text = headline

        # Run full NLP analysis & CRI computation
        result = ingest(combined_text, company_name, source_name)
        
        # Attach raw Finnhub metadata
        if "event" in result:
            result["event"]["url"] = article.get("url", "")
            result["event"]["image"] = article.get("image", "")
            result["event"]["finnhubId"] = article.get("id", "")
            result["event"]["isLiveApi"] = True

        # Asynchronously dispatch to Spring Boot internal webhook
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

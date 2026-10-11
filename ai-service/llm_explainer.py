"""
RiskRadar AI - Local Bionic LLM Explainer
Connects to LM Studio at http://localhost:1234/v1 for on-premise, zero-data-leakage
financial risk reasoning with intelligent fallback.
"""

import os
import asyncio
from typing import AsyncGenerator
from openai import AsyncOpenAI
from risk_engine import store, COMPANIES

LM_STUDIO_BASE_URL = os.getenv("LLM_BASE_URL", "http://localhost:1234/v1")
LM_STUDIO_MODEL = os.getenv("LLM_MODEL", "bionic")

client = AsyncOpenAI(
    base_url=LM_STUDIO_BASE_URL,
    api_key="lm-studio-local",
    timeout=2.0,
    max_retries=0,
)

SYSTEM_PROMPT = """You are RiskRadar AI, a senior quantitative RegTech and corporate risk intelligence analyst.
Your task is to analyze recent regulatory filings, legal complaints, and news items for a financial institution.
Synthesize the root cause behind their current Corporate Risk Index (CRI), evaluate whether the threats represent
systemic or localized danger, and recommend immediate defensive actions for compliance officers and fund managers.
Keep your analysis concise, structured, professional, and actionable."""

def generate_fallback_explanation(company: str, snapshot: dict) -> str:
    """Bulletproof fallback explanation if LM Studio is offline or slow."""
    cdata = snapshot.get(company, {})
    score = cdata.get("score", 25.0)
    ticker = cdata.get("ticker", "N/A")
    trend = cdata.get("trend", "stable")
    categories = cdata.get("category_scores", {})
    events = cdata.get("events", [])

    top_cat = max(categories.items(), key=lambda x: x[1]) if categories else ("general", 0)
    recent_event_text = events[0]["text"] if events else "Normal business operations."

    severity = "CRITICAL" if score >= 65 else ("ELEVATED" if score >= 45 else "MODERATE/LOW")

    return (
        f"### Institutional Risk Assessment: {company} ({ticker})\n\n"
        f"**Surveillance Status:** {severity} · **CRI Score:** {score:.1f}/100 · **Trend Velocity:** {trend.upper()}\n\n"
        f"**Primary Vector Driver:** {top_cat[0].upper()} exposure (Vector Index: {top_cat[1]:.1f}/100).\n\n"
        f"**Trigger Event:** \"{recent_event_text[:200]}...\"\n\n"
        f"**Executive Analysis:**\n"
        f"- The company's risk trajectory indicates acute sensitivity in regulatory compliance and litigation oversight.\n"
        f"- Rolling mean-reversion decay indicates elevated scrutiny will persist unless formal non-enforcement or dismissal notices are issued.\n\n"
        f"**Recommended Actionable Measures:**\n"
        f"1. Audit cross-border transaction logs against FinCEN/OFAC lists.\n"
        f"2. Place active reserve capital buffers for potential consent order disgorgement.\n"
        f"3. Increase algorithmic monitoring frequency from 15m to continuous 1s intervals."
    )

async def stream_explanation(company: str) -> AsyncGenerator[str, None]:
    """Streams token-by-token reasoning from local Bionic LLM with fallback."""
    snapshot = store.get_snapshot()
    cdata = snapshot.get(company)

    if not cdata:
        yield f"Company '{company}' not found in active surveillance universe."
        return

    score = cdata.get("score", 25.0)
    events = [e["text"] for e in cdata.get("events", [])[:4]]
    cats = cdata.get("category_scores", {})

    prompt = (
        f"Company: {company} ({cdata.get('ticker')})\n"
        f"Current Corporate Risk Index (CRI): {score}/100\n"
        f"Category Scores: {cats}\n"
        f"Recent News & Complaints:\n" + "\n".join(f"- {e}" for e in events) + "\n\n"
        "Explain why this company's risk is at this level, identify the primary threats, and suggest 3 concrete actions."
    )

    try:
        response = await client.chat.completions.create(
            model=LM_STUDIO_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            stream=True,
            temperature=0.3,
            max_tokens=500,
        )

        full_text = []
        async for chunk in response:
            delta = chunk.choices[0].delta.content or ""
            if delta:
                full_text.append(delta)
                yield delta

        # Save latest generated explanation into risk store
        store.set_explanation(company, "".join(full_text))

    except Exception:
        # Graceful fallback: synthesize structured analyst report
        fallback = generate_fallback_explanation(company, snapshot)
        store.set_explanation(company, fallback)
        yield fallback

async def get_explanation(company: str) -> str:
    """Non-streaming explanation helper."""
    chunks = []
    async for chunk in stream_explanation(company):
        chunks.append(chunk)
    return "".join(chunks)

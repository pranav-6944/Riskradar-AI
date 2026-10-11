"""
RiskRadar AI - Python FastAPI Microservice (Port 8000)
Hosts NLP Scoring Engine, local Bionic LLM client, and Continuous News Simulator.
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import uvicorn
from contextlib import asynccontextmanager

from risk_engine import store, analyze_text, COMPANIES
from llm_explainer import stream_explanation, get_explanation
from data_simulator import simulator
from models import AnalyzeRequest, IngestRequest, SimulationToggleRequest, ScenarioTestRequest
from finnhub_client import finnhub, TICKER_MAP

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Launch real-time background news simulation loop
    await simulator.start()
    yield
    # Shutdown: Stop simulation loop
    await simulator.stop()

app = FastAPI(
    title="RiskRadar AI - Natural Language Risk Intelligence Microservice",
    description="NLP regex scoring, rolling CRI physics, and on-premise local Bionic LLM synthesis.",
    version="1.0.0",
    lifespan=lifespan,
)

# Enable CORS for frontend and Spring Boot gateway
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "RiskRadar-AI-NLP-Engine",
        "port": 8000,
        "companies_tracked": list(COMPANIES.keys()),
        "simulator_active": simulator.is_running(),
    }

@app.get("/snapshot")
async def get_all_companies():
    """Returns real-time risk scores, rolling history, and category vectors for all companies."""
    return store.get_snapshot()

@app.get("/company/{company_name}")
async def get_single_company(company_name: str):
    snapshot = store.get_snapshot()
    if company_name not in snapshot:
        raise HTTPException(status_code=404, detail=f"Company '{company_name}' not found")
    return snapshot[company_name]

@app.post("/analyze")
async def analyze_custom_text(req: AnalyzeRequest):
    """Direct NLP text analysis with 120+ regex patterns, negation dampening, and noise filter."""
    if req.company not in COMPANIES:
        raise HTTPException(status_code=400, detail=f"Target company '{req.company}' not recognized")
    return analyze_text(req.text, req.company)

@app.post("/ingest")
async def ingest_custom_event(req: IngestRequest):
    """Ingests an event into the live store, computes new CRI, and relays to Spring Boot."""
    if req.company not in COMPANIES:
        raise HTTPException(status_code=400, detail=f"Target company '{req.company}' not recognized")
    result = await simulator.generate_single_event(
        company_override=req.company,
        text_override=req.text
    )
    return result

@app.get("/explain/{company_name}")
async def explain_company_risk_stream(company_name: str):
    """Streams explanation tokens directly from local Bionic LLM (LM Studio)."""
    if company_name not in COMPANIES:
        raise HTTPException(status_code=404, detail=f"Company '{company_name}' not found")
    
    return StreamingResponse(
        stream_explanation(company_name),
        media_type="text/plain"
    )

@app.get("/explain-json/{company_name}")
async def explain_company_risk_json(company_name: str):
    """Returns structured analyst assessment from Bionic LLM or rule-based fallback."""
    if company_name not in COMPANIES:
        raise HTTPException(status_code=404, detail=f"Company '{company_name}' not found")
    
    text = await get_explanation(company_name)
    return {
        "company": company_name,
        "ticker": COMPANIES[company_name]["ticker"],
        "explanation": text
    }

@app.post("/simulator/toggle")
async def toggle_simulator(req: SimulationToggleRequest):
    if req.enabled:
        await simulator.start()
    else:
        await simulator.stop()
    return {"simulator_active": simulator.is_running()}

@app.post("/simulator/trigger")
async def trigger_instant_event():
    """Generates an instant random simulated event."""
    result = await simulator.generate_single_event()
    return result

# ─── Live Finnhub Stock News Integration Endpoints ──────────────────────
@app.get("/api/v1/finnhub/news/{ticker}")
async def get_finnhub_news(ticker: str, limit: int = 10):
    """Fetches real-world live financial news for a ticker directly from Finnhub API."""
    ticker = ticker.upper()
    articles = await finnhub.fetch_company_news(ticker)
    return {
        "ticker": ticker,
        "company": TICKER_MAP.get(ticker, ticker),
        "total": len(articles),
        "articles": articles[:limit]
    }

@app.post("/api/v1/finnhub/sync/{ticker}")
async def sync_finnhub_news(ticker: str, index: int = Query(0, ge=0)):
    """Fetches live article from Finnhub, classifies via 120+ NLP rules, updates CRI, and relays to Spring Boot."""
    ticker = ticker.upper()
    result = await finnhub.ingest_live_news_item(ticker, item_index=index)
    if not result:
        raise HTTPException(status_code=502, detail=f"Failed to fetch live articles from Finnhub for {ticker}")
    return {
        "status": "success",
        "ticker": ticker,
        "source": "Finnhub Live Stock API",
        "result": result
    }

@app.post("/api/v1/finnhub/sync-all")
async def sync_all_finnhub_banks():
    """Fetches live news for all 5 tracked banks simultaneously from Finnhub."""
    results = []
    for ticker in TICKER_MAP.keys():
        try:
            res = await finnhub.ingest_live_news_item(ticker)
            if res:
                results.append({"ticker": ticker, "event": res.get("event")})
        except Exception as e:
            print(f"[Finnhub] Error syncing {ticker}: {e}")
    return {"synced_count": len(results), "events": results}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

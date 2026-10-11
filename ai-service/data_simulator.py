"""
RiskRadar AI - Continuous Real-Time News & Regulatory Complaint Simulator
Generates realistic financial news and complaints, classifies via NLP, and dispatches to Spring Boot Gateway.
"""

import asyncio
import random
import httpx
from datetime import datetime
from risk_engine import ingest, COMPANIES

SPRING_BOOT_INTERNAL_URL = "http://localhost:8080/internal/event"

SIMULATION_TEMPLATES = [
    # ─── HIGH RISK: Legal & Regulatory (DOJ, SEC, Class Actions) ──────────────
    ("{company} faces formal Department of Justice (DOJ) criminal indictment over alleged municipal bond price manipulation.", "DOJ Press Wire", True),
    ("SEC issues formal subpoena to {company} regarding undisclosed off-balance-sheet derivatives exposure.", "SEC Enforcement Bulletin", True),
    ("Federal grand jury launches criminal inquiry into {company} executives over potential insider trading ahead of merger.", "Wall Street Journal", True),
    ("Class-action lawsuit certified against {company} alleging predatory consumer credit practices and systemic billing deception.", "Reuters Legal", True),
    ("State Attorney General files landmark civil fraud complaint seeking $1.4B in penalties from {company}.", "Bloomberg Law", True),
    ("Whistleblower submits 300-page dossier to regulatory authorities detailing material accounting irregularities at {company}.", "Financial Times", True),
    
    # ─── HIGH RISK: Compliance & Sanctions (AML, FinCEN, KYC) ─────────────────
    ("FinCEN penalizes {company} $680M for widespread Anti-Money Laundering (AML) failures and unfiled SARs.", "FinCEN Enforcement Desk", True),
    ("OCC slaps {company} with sweeping consent order over internal compliance control defects in wealth management.", "OCC Regulatory News", True),
    ("Treasury Department investigates {company} over potential sanctions violation regarding sanctioned international oligarch accounts.", "Washington Post", True),
    ("CFPB issues stern warning to {company} following 4,000+ consumer complaints regarding unauthorized overdraft charges.", "CFPB Consumer Digest", True),
    ("European regulators initiate formal GDPR investigation into {company} after massive unencrypted client database leak.", "EU Data Protection Board", True),

    # ─── HIGH RISK: Financial Distress & Solvency ─────────────────────────────
    ("Moody's slashes credit rating on {company} senior debt to junk status amid deteriorating liquidity cushions.", "Moody's Ratings", True),
    ("Emergency liquidity injection requested by {company} as overnight repo funding spreads widen dramatically.", "Bloomberg Markets", True),
    ("Massive $2.8B quarterly write-off forced at {company} following default of major commercial real estate borrower.", "CNBC Financials", True),
    ("Audit committee at {company} announces delay in 10-K annual report due to ongoing accounting restatement reviews.", "SEC Edgar Feed", True),
    ("Credit default swap (CDS) spreads on {company} surge 180 bps as counterparties demand margin call collaterals.", "Derivatives Watch", True),

    # ─── HIGH RISK: Operational & Cyber Vulnerability ──────────────────────────
    ("{company} suffers catastrophic 14-hour core banking outage, locking millions of retail and commercial accounts.", "TechCrunch Banking", True),
    ("Ransomware syndicate claims infiltration of {company} corporate intranets, threatening exfiltration of confidential memos.", "CyberSurveillance Wire", True),
    ("Sudden resignation of {company} Chief Risk Officer (CRO) sparks management crisis ahead of annual stress testing.", "Bloomberg Executive Alert", True),
    ("Workforce union at {company} declares immediate strike across critical operational clearance facilities.", "Labor Dispatch", True),
    
    # ─── HIGH RISK: Reputational & Consumer Backlash ──────────────────────────
    ("Senate Banking Committee summons {company} CEO for emergency testimony on algorithmic bias in mortgage approvals.", "Capitol Hill Briefing", True),
    ("Grassroots boycott against {company} gains nationwide momentum following public outrage over controversial fossil fuel financing.", "MarketWatch", True),
    ("Investigation uncovers systemic culture of discrimination and harassment within {company} investment banking division.", "New York Times", True),

    # ─── NEGATION / RESOLUTION SIGNALS (Decreases Threat) ──────────────────────
    ("Federal appellate judge dismissed all allegations in securities class action against {company}, closing the case.", "Court of Appeals Docket", False),
    ("Department of Justice closes multi-year inquiry into {company}, finding no evidence of criminal wrongdoing.", "DOJ Press Wire", False),
    ("Regulatory authorities formally clear {company} of AML allegations following third-party independent forensic audit.", "Regulatory Compliance Review", False),
    ("{company} reaches amicable settlement with regulatory commission without admitting liability or material fines.", "Corporate Press Release", False),
    ("Federal Reserve releases annual stress test results, praising {company} for resilient Tier-1 capital adequacy.", "Federal Reserve Board", False),

    # ─── ROUTINE CORPORATE NOISE (Ignored / Filtered) ─────────────────────────
    ("{company} declares regular quarterly dividend of $1.15 per share, in line with analyst projections.", "PR Newswire", False),
    ("{company} reports record quarterly earnings driven by investment banking advisory fees.", "Business Wire", False),
    ("{company} sponsors annual sustainable finance conference, hosting leaders from across the sector.", "Corporate PR", False),
    ("{company} announces nationwide college campus recruitment initiative for software engineers.", "Careers Gazette", False),
    ("{company} celebrates 25th anniversary of community foundation with $50M philanthropic pledge.", "Philanthropy Digest", False),
    ("{company} unveils new mobile banking user interface with customizable budget widgets.", "Fintech Weekly", False),
]

class DataSimulator:
    def __init__(self):
        self._running = False
        self._task = None

    async def start(self):
        if self._running:
            return
        self._running = True
        self._task = asyncio.create_task(self._simulation_loop())

    async def stop(self):
        self._running = False
        if self._task:
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass

    def is_running(self) -> bool:
        return self._running

    async def generate_single_event(self, company_override: str = None, text_override: str = None):
        """Generates or ingests a single event and relays to Spring Boot."""
        company = company_override or random.choice(list(COMPANIES.keys()))
        
        if text_override:
            text = text_override
            source = "Analyst Manual Injection"
        else:
            template, source, _ = random.choice(SIMULATION_TEMPLATES)
            text = template.format(company=company)

        # 1. NLP scoring in Python
        result = ingest(text, company, source)
        
        # 2. Asynchronously notify Spring Boot internal endpoint
        asyncio.create_task(self._post_to_spring_boot(result.get("event")))
        return result

    async def _post_to_spring_boot(self, event_data: dict):
        if not event_data:
            return
        try:
            async with httpx.AsyncClient(timeout=2.0) as http:
                await http.post(SPRING_BOOT_INTERNAL_URL, json=event_data)
        except Exception:
            # Spring Boot might still be starting or restarting, ignore connection fail
            pass

    async def _simulation_loop(self):
        # Initial sleep before first emit
        await asyncio.sleep(4)
        while self._running:
            try:
                await self.generate_single_event()
            except Exception as e:
                print(f"[Simulator] Error: {e}")
            
            # Fire next item every 8 to 14 seconds
            await asyncio.sleep(random.uniform(8.0, 14.0))

simulator = DataSimulator()

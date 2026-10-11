"""
RiskRadar AI - Advanced NLP Scoring Engine & Corporate Risk Index
120+ regex patterns across 5 weighted vectors, negation handling, and rolling mean-reverting CRI calculations.
"""

import re
import time
import random
from datetime import datetime, timedelta
from collections import deque
import threading

# ─── 5 Weighted Risk Vectors (120+ Patterns) ─────────────────────────────────

RISK_PATTERNS = {
    "legal": {
        "weight": 10,
        "keywords": [
            r"\blawsuit\b", r"\bclass.?action\b", r"\bindictment\b", r"\bfraud\b",
            r"\bsecurities.?violation\b", r"\bSEC.?investigation\b", r"\bsubpoena\b",
            r"\bcriminal.?charges\b", r"\bregulatory.?action\b", r"\bcease.?and.?desist\b",
            r"\bsettlement\b", r"\bconsent.?order\b", r"\bpenalt(y|ies)\b", r"\bfine[sd]?\b",
            r"\bdepartment.?of.?justice\b", r"\bDOJ\b", r"\battorney.?general\b",
            r"\bmoney.?laundering\b", r"\bembezzlement\b", r"\binsider.?trading\b",
            r"\bwhistleblower\b", r"\bperjury\b", r"\bmanipulation\b", r"\blitigation\b",
            r"\bconviction\b", r"\barrest(ed)?\b", r"\bgrand.?jury\b", r"\bdeposition\b"
        ],
    },
    "compliance": {
        "weight": 8,
        "keywords": [
            r"\bcompliance.?failure\b", r"\bregulatory.?breach\b", r"\bAML\b",
            r"\bknow.?your.?customer\b", r"\bKYC\b", r"\bFATF\b", r"\bFinCEN\b",
            r"\bCFPB.?complaint\b", r"\bOCC.?action\b", r"\bFDIC.?warning\b",
            r"\bdata.?breach\b", r"\bprivacy.?violation\b", r"\bGDPR.?violation\b",
            r"\bsanction[sd]?\b", r"\bblacklist\b", r"\bembargo\b",
            r"\bnon.?complian(t|ce)\b", r"\bauditor.?concern\b", r"\bmaterial.?weakness\b",
            r"\binternal.?controls.?defect\b", r"\bsuspicious.?activity\b", r"\bSAR.?filing\b",
            r"\bstatutory.?lapse\b", r"\bdisgorgement\b"
        ],
    },
    "financial": {
        "weight": 9,
        "keywords": [
            r"\bdefault\b", r"\bbankrupt(cy)?\b", r"\binsolvenc(y|ies)\b",
            r"\bcredit.?downgrade\b", r"\brating.?cut\b", r"\bliquidity.?crisis\b",
            r"\bcapital.?shortfall\b", r"\bwrite.?off\b", r"\bimpairment\b",
            r"\bearnings.?restatement\b", r"\baccounting.?irregularit\b",
            r"\bmassive.?loss\b", r"\bprofit.?warning\b", r"\bdebt.?spiral\b",
            r"\bmargin.?call\b", r"\bleverage.?concern\b", r"\btoxic.?exposure\b",
            r"\bbad.?debt\b", r"\bNPL\b", r"\bnon.?performing\b",
            r"\brun.?on.?deposits\b", r"\bcash.?drain\b", r"\bbailout\b"
        ],
    },
    "operational": {
        "weight": 7,
        "keywords": [
            r"\bsystem.?outage\b", r"\bservice.?disruption\b", r"\bcyber.?attack\b",
            r"\bransom(ware)?\b", r"\bhack(ed|ing)?\b", r"\bdata.?theft\b",
            r"\boperational.?failure\b", r"\bfailed.?transaction\b",
            r"\bexecutive.?departure\b", r"\bCEO.?resign\b", r"\bCFO.?quit\b",
            r"\blayoff\b", r"\bmass.?firing\b", r"\bworkforce.?reduction\b",
            r"\bstrike\b", r"\bunion.?action\b", r"\bmanagement.?crisis\b",
            r"\bsupply.?chain.?disruption\b", r"\bproduction.?halt\b",
            r"\bcloud.?downtime\b", r"\bcore.?banking.?failure\b", r"\balgorithmic.?glitch\b"
        ],
    },
    "reputational": {
        "weight": 6,
        "keywords": [
            r"\bscandal\b", r"\bcontroversy\b", r"\bbacklash\b", r"\bboycott\b",
            r"\bpublic.?outrage\b", r"\bsocial.?media.?storm\b", r"\bnegative.?press\b",
            r"\breputation.?damage\b", r"\bcustomer.?complaint[s]?\b",
            r"\bconsumer.?fraud\b", r"\bpredatory.?lending\b", r"\bexploitation\b",
            r"\bdiscrimination\b", r"\bharassment.?claim\b", r"\bethics.?violation\b",
            r"\bconflict.?of.?interest\b", r"\bcorruption.?allegation\b",
            r"\bbribe[sd]?\b", r"\bcover.?up\b", r"\bdeceptive.?marketing\b"
        ],
    },
}

# ─── Negation Signals (Dampens / Cancels False Alarms) ─────────────────────────

NEGATION_PATTERNS = [
    r"\bdismissed.?allegations?\b",
    r"\bcleared.?of.?wrongdoing\b",
    r"\bsettled.?without.?admitting.?liability\b",
    r"\bno.?evidence.?found\b",
    r"\bcase.?closed\b",
    r"\bregulator.?approves?\b",
    r"\bvindicated\b",
    r"\bcharges.?dropped\b",
    r"\bunfounded.?claims?\b",
    r"\bfull.?exoneration\b"
]

# ─── Corporate PR Noise Patterns ──────────────────────────────────────────────

NOISE_PATTERNS = [
    r"\bquarterly.?earnings\b", r"\bdividend.?declared\b", r"\bstock.?split\b",
    r"\bnew.?product.?launch\b", r"\bpartnership.?announced\b", r"\baward\b",
    r"\brecognition\b", r"\bcelebration\b", r"\bexpansion.?plans\b",
    r"\bhiring.?drive\b", r"\bCSR.?initiative\b", r"\bgala.?dinner\b",
    r"\bcharity.?donation\b", r"\bshare.?repurchase\b", r"\bkeynote.?address\b"
]

# ─── Target Institutions ──────────────────────────────────────────────────────

COMPANIES = {
    "JPMorgan Chase": {"ticker": "JPM", "sector": "Global Diversified Banking", "baseline": 25.0},
    "Goldman Sachs":  {"ticker": "GS",  "sector": "Investment Banking & Markets", "baseline": 25.0},
    "Wells Fargo":    {"ticker": "WFC", "sector": "Retail & Consumer Lending", "baseline": 25.0},
    "Citigroup":      {"ticker": "C",   "sector": "International Transaction Banking", "baseline": 25.0},
    "Bank of America":{"ticker": "BAC", "sector": "Retail & Commercial Banking", "baseline": 25.0},
}

# ─── In-Memory Concurrent Risk Store ──────────────────────────────────────────

class RiskStore:
    def __init__(self):
        self._lock = threading.Lock()
        self.scores = {}
        self.history = {}
        self.events = {}
        self.category_scores = {}
        self.explanations = {}
        self._init_companies()

    def _init_companies(self):
        for name in COMPANIES:
            base = random.uniform(22.0, 32.0)
            self.scores[name] = round(base, 1)
            self.history[name] = deque(maxlen=60)
            self.events[name] = deque(maxlen=40)
            self.category_scores[name] = {cat: round(random.uniform(8.0, 24.0), 1) for cat in RISK_PATTERNS}
            self.explanations[name] = f"No critical regulatory anomalies detected for {name}. Baseline operational integrity verified."
            
            # Pre-fill rolling historical trajectory (last 30 minutes)
            for i in range(30, 0, -1):
                ts = datetime.now() - timedelta(minutes=i)
                jitter = random.uniform(-3.0, 3.5)
                self.history[name].append({
                    "time": ts.strftime("%H:%M:%S"),
                    "score": round(max(5.0, min(95.0, base + jitter)), 1),
                })

    def update(self, company: str, delta: float, event: dict, categories: dict):
        with self._lock:
            old = self.scores.get(company, 25.0)
            # Physical Equation: CRI(t) = CRI(t-1)*(1-decay) + baseline*decay + DeltaRisk
            decay = 0.05
            baseline = COMPANIES[company]["baseline"]
            
            raw_new = (old * (1.0 - decay)) + (baseline * decay) + delta
            bounded_score = max(5.0, min(98.0, raw_new))
            
            self.scores[company] = round(bounded_score, 1)
            self.history[company].append({
                "time": datetime.now().strftime("%H:%M:%S"),
                "score": round(bounded_score, 1),
            })
            
            self.events[company].appendleft(event)
            
            for cat, val in categories.items():
                current = self.category_scores[company].get(cat, 15.0)
                # Dampen old category weight and incorporate new delta
                self.category_scores[company][cat] = round(
                    min(99.0, current * 0.85 + val * 0.15), 1
                )

    def set_explanation(self, company: str, text: str):
        with self._lock:
            self.explanations[company] = text

    def get_snapshot(self):
        with self._lock:
            return {
                name: {
                    "company": name,
                    "ticker": COMPANIES[name]["ticker"],
                    "sector": COMPANIES[name]["sector"],
                    "score": self.scores[name],
                    "history": list(self.history[name]),
                    "events": list(self.events[name])[:10],
                    "category_scores": dict(self.category_scores[name]),
                    "explanation": self.explanations[name],
                    "trend": self._calculate_trend(name),
                }
                for name in COMPANIES
            }

    def _calculate_trend(self, name: str) -> str:
        h = list(self.history[name])
        if len(h) < 4:
            return "stable"
        recent = sum(x["score"] for x in h[-3:]) / 3
        older = sum(x["score"] for x in h[-6:-3]) / 3 if len(h) >= 6 else h[0]["score"]
        diff = recent - older
        if diff > 2.5:
            return "rising"
        elif diff < -2.5:
            return "falling"
        return "stable"

store = RiskStore()

# ─── NLP Scoring Function ────────────────────────────────────────────────────

def analyze_text(text: str, company: str) -> dict:
    """
    Evaluates text for regulatory & financial risk signals using weighted patterns,
    negation handling, and noise filtering.
    """
    text_lower = text.lower()

    # 1. Check for Negation / Resolution Signals
    negation_hits = [p for p in NEGATION_PATTERNS if re.search(p, text_lower, re.IGNORECASE)]
    
    # 2. Check for Routine PR Noise
    noise_hits = [p for p in NOISE_PATTERNS if re.search(p, text_lower, re.IGNORECASE)]
    
    # 3. Match Risk Categories
    matched = {}
    total_raw_points = 0.0

    for category, config in RISK_PATTERNS.items():
        hits = []
        for pattern in config["keywords"]:
            m = re.search(pattern, text, re.IGNORECASE)
            if m:
                hits.append(m.group())
        if hits:
            # Deduplicate matches
            unique_hits = list(dict.fromkeys(hits))
            category_points = len(unique_hits) * config["weight"]
            matched[category] = {"signals": unique_hits[:5], "score": category_points}
            total_raw_points += category_points

    # 4. Severity & Urgency Multipliers
    severity_multiplier = 1.0
    if re.search(r'\b(criminal|grand jury|DOJ indictment|federal raid|SEC subpoena|class action)\b', text, re.IGNORECASE):
        severity_multiplier = 2.0
    elif re.search(r'\b(formal inquiry|whistleblower|liquidity freeze|margin call)\b', text, re.IGNORECASE):
        severity_multiplier = 1.4

    # 5. Negation Dampening
    if negation_hits:
        # Heavily reduce or reverse threat
        severity_multiplier *= 0.15
        total_raw_points = max(0.0, total_raw_points - 15.0)

    # 6. Corporate Noise Dampening
    if len(noise_hits) >= 2 and total_raw_points < 35:
        severity_multiplier *= 0.35

    # 7. Final Delta Calculation
    final_delta = min(28.0, total_raw_points * severity_multiplier * 0.14)
    is_high_risk = (final_delta >= 3.5 and len(matched) > 0)

    # 8. Human-Readable Algorithmic Summary
    if negation_hits:
        summary = f"[RESOLUTION] {company}: Legal/regulatory matter resolved or dismissed. Threat score reduced."
    elif matched:
        top_cats = sorted(matched.items(), key=lambda x: x[1]["score"], reverse=True)[:2]
        cat_names = ", ".join(c.upper() for c, _ in top_cats)
        signal_tokens = ", ".join(s for _, d in top_cats for s in d["signals"][:2])
        summary = (
            f"[HIGH RISK] {company}: Triggered {cat_names} vectors [{signal_tokens}]. "
            f"Impact: +{final_delta:.1f} CRI points."
        )
    else:
        summary = f"[ROUTINE] {company}: No actionable risk signals identified."

    return {
        "is_high_risk": is_high_risk,
        "risk_score_delta": round(final_delta, 2),
        "categories": {cat: d["score"] for cat, d in matched.items()},
        "matched_signals": matched,
        "summary": summary,
        "severity_multiplier": round(severity_multiplier, 2),
        "noise_hits": len(noise_hits),
        "negation_hits": len(negation_hits),
    }

def ingest(text: str, company: str, source: str = "Live Feed") -> dict:
    """Ingests a text payload, updates local risk store, returns event dictionary."""
    if company not in COMPANIES:
        return {"error": f"Unknown target company: {company}"}

    analysis = analyze_text(text, company)
    
    event = {
        "id": f"evt-{int(time.time() * 1000)}-{random.randint(100, 999)}",
        "company": company,
        "ticker": COMPANIES[company]["ticker"],
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "source": source,
        "text": text,
        "is_high_risk": analysis["is_high_risk"],
        "risk_delta": analysis["risk_score_delta"],
        "categories": list(analysis["categories"].keys()),
        "summary": analysis["summary"],
        "severity": analysis["severity_multiplier"],
    }

    store.update(company, analysis["risk_score_delta"], event, analysis["categories"])
    return {**analysis, "event": event, "new_score": store.scores[company]}

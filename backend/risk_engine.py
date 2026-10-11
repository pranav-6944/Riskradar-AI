"""
RiskRadar AI - Corporate Risk Scoring Engine
Detects high-risk signals from unstructured text and computes rolling Corporate Risk Index.
"""

import re
import time
import random
from datetime import datetime, timedelta
from collections import deque
import threading

# ─── Risk Signal Patterns ─────────────────────────────────────────────────────

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
            r"\bwhistleblower\b", r"\bperjury\b", r"\bmanipulation\b",
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
            r"\bmargin.?call\b", r"\bleverage.?concern\b", r"\bexposure\b",
            r"\bbad.?debt\b", r"\bNPL\b", r"\bnon.?performing\b",
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
        ],
    },
}

NOISE_PATTERNS = [
    r"\bquarterly.?earnings\b", r"\bdividend.?declared\b", r"\bstock.?split\b",
    r"\bnew.?product.?launch\b", r"\bpartnership.?announced\b", r"\baward\b",
    r"\brecognition\b", r"\bcelebration\b", r"\bexpansion.?plans\b",
    r"\bhiring.?drive\b", r"\bCSR.?initiative\b",
]

# ─── Company Data Store ────────────────────────────────────────────────────────

COMPANIES = {
    "JPMorgan Chase": {"ticker": "JPM", "sector": "Banking"},
    "Goldman Sachs":  {"ticker": "GS",  "sector": "Investment Banking"},
    "Wells Fargo":    {"ticker": "WFC", "sector": "Retail Banking"},
    "Citigroup":      {"ticker": "C",   "sector": "Global Banking"},
    "Bank of America":{"ticker": "BAC", "sector": "Retail & Commercial Banking"},
}

# ─── Risk Store ───────────────────────────────────────────────────────────────

class RiskStore:
    def __init__(self):
        self._lock = threading.Lock()
        self.scores = {}
        self.history = {}          # company -> deque of (timestamp, score)
        self.events = {}           # company -> list of recent risk events
        self.category_scores = {}  # company -> {category: score}
        self.explanations = {}     # company -> latest explanation text
        self._init_companies()

    def _init_companies(self):
        for name in COMPANIES:
            base = random.uniform(18, 35)
            self.scores[name] = base
            self.history[name] = deque(maxlen=60)
            self.events[name] = deque(maxlen=30)
            self.category_scores[name] = {cat: random.uniform(5, 25) for cat in RISK_PATTERNS}
            self.explanations[name] = f"No significant risk signals detected for {name} recently."
            # pre-fill history
            for i in range(30, 0, -1):
                ts = datetime.now() - timedelta(minutes=i * 2)
                self.history[name].append({
                    "time": ts.strftime("%H:%M:%S"),
                    "score": round(base + random.uniform(-5, 5), 1),
                })

    def update(self, company, delta, event, categories):
        with self._lock:
            old = self.scores.get(company, 30)
            new = max(0, min(100, old + delta))
            # exponential decay toward baseline (mean-reversion)
            baseline = 25
            decay = 0.05
            new = new * (1 - decay) + baseline * decay
            self.scores[company] = round(new, 1)
            self.history[company].append({
                "time": datetime.now().strftime("%H:%M:%S"),
                "score": round(new, 1),
            })
            self.events[company].appendleft(event)
            for cat, val in categories.items():
                current = self.category_scores[company].get(cat, 10)
                self.category_scores[company][cat] = round(
                    min(100, current * 0.9 + val * 0.1), 1
                )

    def get_snapshot(self):
        with self._lock:
            return {
                name: {
                    "score": self.scores[name],
                    "history": list(self.history[name]),
                    "events": list(self.events[name])[:8],
                    "category_scores": dict(self.category_scores[name]),
                    "explanation": self.explanations[name],
                    "ticker": COMPANIES[name]["ticker"],
                    "sector": COMPANIES[name]["sector"],
                    "trend": self._trend(name),
                }
                for name in COMPANIES
            }

    def _trend(self, name):
        h = list(self.history[name])
        if len(h) < 5:
            return "stable"
        recent = sum(x["score"] for x in h[-3:]) / 3
        older  = sum(x["score"] for x in h[-6:-3]) / 3
        diff = recent - older
        if diff > 3:   return "rising"
        if diff < -3:  return "falling"
        return "stable"

# Singleton store
store = RiskStore()

# ─── Text Analysis ────────────────────────────────────────────────────────────

def analyze_text(text: str, company: str) -> dict:
    """
    Analyze text for risk signals.
    Returns: {is_high_risk, risk_score_delta, categories, matched_signals, summary}
    """
    text_lower = text.lower()

    # Check if it's noise
    noise_hits = sum(1 for p in NOISE_PATTERNS if re.search(p, text_lower, re.IGNORECASE))

    matched = {}
    total_score = 0

    for category, config in RISK_PATTERNS.items():
        hits = []
        for pattern in config["keywords"]:
            if re.search(pattern, text, re.IGNORECASE):
                hits.append(re.search(pattern, text, re.IGNORECASE).group())
        if hits:
            cat_score = len(hits) * config["weight"]
            matched[category] = {"signals": hits[:5], "score": cat_score}
            total_score += cat_score

    # Severity adjustment
    severity_multiplier = 1.0
    if re.search(r'\b(criminal|federal|DOJ|SEC enforcement|class action)\b', text, re.IGNORECASE):
        severity_multiplier = 1.8
    elif re.search(r'\b(alleged|investigating|concern|warning)\b', text, re.IGNORECASE):
        severity_multiplier = 1.2

    # Noise dampening
    if noise_hits > 2 and total_score < 30:
        severity_multiplier *= 0.4

    final_delta = min(25, total_score * severity_multiplier * 0.15)
    is_high_risk = final_delta >= 2.5 and len(matched) > 0

    # Build explanation
    if matched:
        top_cats = sorted(matched.items(), key=lambda x: x[1]["score"], reverse=True)[:2]
        signals_str = ", ".join(
            s for cat, d in top_cats for s in d["signals"][:2]
        )
        explanation = (
            f"🔴 HIGH RISK DETECTED for {company}: "
            f"Signals in {', '.join(c for c, _ in top_cats)} risk categories. "
            f"Key triggers: [{signals_str}]. "
            f"Risk delta: +{final_delta:.1f} points."
        )
    else:
        explanation = f"✅ Routine information for {company}. No significant risk signals."

    return {
        "is_high_risk": is_high_risk,
        "risk_score_delta": round(final_delta, 2),
        "categories": {cat: d["score"] for cat, d in matched.items()},
        "matched_signals": matched,
        "summary": explanation,
        "severity_multiplier": round(severity_multiplier, 2),
        "noise_score": noise_hits,
    }


def ingest(text: str, company: str, source: str = "Manual Input") -> dict:
    """
    Ingest a piece of text for a company, update risk store.
    Returns analysis result.
    """
    if company not in COMPANIES:
        return {"error": f"Unknown company: {company}"}

    result = analyze_text(text, company)

    event = {
        "id": int(time.time() * 1000),
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "source": source,
        "text": text[:200] + ("..." if len(text) > 200 else ""),
        "is_high_risk": result["is_high_risk"],
        "risk_delta": result["risk_score_delta"],
        "categories": list(result["categories"].keys()),
        "summary": result["summary"],
        "severity": result["severity_multiplier"],
    }

    if result["is_high_risk"] or result["risk_score_delta"] > 0:
        store.update(company, result["risk_score_delta"], event, result["categories"])
        store.explanations[company] = result["summary"]
    else:
        # Still log it but with minimal impact
        store.update(company, 0.1, event, {})

    return {**result, "event": event, "new_score": store.scores[company]}

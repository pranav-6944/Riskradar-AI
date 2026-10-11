import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, Scale, Cpu, Zap, Activity, ArrowRight, 
  CheckCircle2, Terminal, Code2, Database, Layers, BarChart 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Features = () => {
  const { isDark } = useTheme();
  const riskCategories = [
    {
      name: 'Legal Exposure',
      weight: 10,
      description: 'Lawsuits, DOJ indictments, class-action suits, securities fraud, subpoenas, and regulatory litigation.',
      patterns: ['r"\\blawsuit\\b"', 'r"\\bclass.?action\\b"', 'r"\\bDOJ\\b"', 'r"\\bSEC.?investigation\\b"', 'r"\\bsubpoena\\b"'],
      color: '#f43f5e',
    },
    {
      name: 'Compliance Breach',
      weight: 8,
      description: 'AML (Anti-Money Laundering) breaches, KYC violations, FinCEN/FATF inquiries, GDPR penalties, sanction violations.',
      patterns: ['r"\\bAML\\b"', 'r"\\bKYC\\b"', 'r"\\bFinCEN\\b"', 'r"\\bCFPB.?complaint\\b"', 'r"\\bGDPR.?violation\\b"'],
      color: '#ec4899',
    },
    {
      name: 'Financial Distress',
      weight: 9,
      description: 'Debt default warnings, credit rating downgrades, liquidity squeezes, restatements, margin calls, non-performing loans.',
      patterns: ['r"\\bdefault\\b"', 'r"\\bliquidity.?crisis\\b"', 'r"\\bcredit.?downgrade\\b"', 'r"\\bearnings.?restatement\\b"'],
      color: '#f59e0b',
    },
    {
      name: 'Operational & Cyber Threat',
      weight: 7,
      description: 'Critical system outages, ransomware attacks, cloud data theft, C-suite sudden resignations, major union walkouts.',
      patterns: ['r"\\bcyber.?attack\\b"', 'r"\\bransom(ware)?\\b"', 'r"\\bsystem.?outage\\b"', 'r"\\bCEO.?resign\\b"'],
      color: '#38bdf8',
    },
    {
      name: 'Reputational Damage',
      weight: 6,
      description: 'Public boycotts, predatory lending exposure, social media outrage storms, whistleblower ethics controversies.',
      patterns: ['r"\\bpredatory.?lending\\b"', 'r"\\bwhistleblower\\b"', 'r"\\bscandal\\b"', 'r"\\bbacklash\\b"'],
      color: '#a855f7',
    },
  ];

  return (
    <div className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 font-mono">
          Algorithmic Deep-Dive
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">
          Engineered for Quantitative RegTech
        </h1>
        <p className="text-base text-slate-400 mt-4 leading-relaxed">
          Explore how RiskRadar AI orchestrates high-throughput natural language processing, 
          mathematical mean-reversion decay, and local on-premise LLM reasoning.
        </p>
      </div>

      {/* 5 Risk Vectors Grid */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
          <Scale className="w-6 h-6 text-sky-400" />
          <span>The 5 Weighted Risk Vectors</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {riskCategories.map((cat) => (
            <div key={cat.name} className="clay-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white m-0">{cat.name}</h3>
                  <span 
                    className="clay-badge text-xs font-mono"
                    style={{ color: cat.color, borderColor: `${cat.color}40`, background: `${cat.color}15` }}
                  >
                    Weight: {cat.weight}/10
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">Sample Regex Signatures:</div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 font-mono text-[11px] text-slate-300">
                  {cat.patterns.map((p, i) => (
                    <div key={i} className="text-slate-400">
                      <span className="text-sky-400">pattern:</span> {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Noise Filter Card */}
          <div 
            className="clay-card p-6 border-emerald-500/30 flex flex-col justify-between" 
            style={{ 
              background: isDark 
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                : 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)' 
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white m-0">Corporate Noise Filter</h3>
                <span className="clay-badge text-emerald-400 bg-emerald-950/60 border-emerald-500/40 text-xs font-mono">
                  11+ PR Patterns
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Dampens routine corporate announcements (e.g. quarterly earnings, dividend declarations, charity galas, product awards) to prevent false risk alarms.
              </p>
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">Filter Multiplier:</div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-emerald-400">
                severity_multiplier *= 0.40
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mathematical Formulation Section */}
      <div className="clay-card p-8 sm:p-12 mb-20 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 font-mono">
              Quantitative Dynamics
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
              Rolling Corporate Risk Index (CRI)
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Corporate risk is not a static score. It behaves like an oscillating physical system: a major scandal spikes the index, but in the absence of new violations, market normalization exerts an exponential decay back toward the historical baseline.
            </p>
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-sm text-sky-300 mb-4 space-y-1">
              <div className="text-xs text-slate-400">// Mean-Reversion Differential Equation:</div>
              <div className="text-base text-white font-bold">
                CRI(t) = CRI(t-1) · (1 - λ) + B · λ + ΔRisk
              </div>
              <div className="text-xs text-slate-400 pt-2">
                Where <span className="text-sky-400">λ = 0.05</span> (decay velocity), <span className="text-sky-400">B = 25.0</span> (baseline), and <span className="text-sky-400">ΔRisk</span> is the NLP severity delta.
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono">
              Microservices Inter-Process Pipeline
            </h4>
            <div className="space-y-3 text-xs text-slate-300 font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span>1. Python FastAPI (:8000)</span>
                <span className="text-sky-400">Simulates/Ingests Text</span>
              </div>
              <div className="text-center text-slate-400">↓ HTTP Webhook (POST /internal/event)</div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span>2. Java Spring Boot (:8080)</span>
                <span className="text-indigo-400">Updates Concurrent RiskStore</span>
              </div>
              <div className="text-center text-slate-400">↓ Server-Sent Events (SSE /api/v1/stream)</div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span>3. React 19 Frontend (:5173)</span>
                <span className="text-emerald-400">Renders Claymorphic Radar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center">
        <Link to="/dashboard" className="clay-btn clay-btn-primary px-8 py-3.5 text-decoration-none">
          <span>Test The Engine in Real-Time Cockpit</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

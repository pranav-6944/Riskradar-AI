import React, { useState, useEffect } from 'react';
import { 
  FileText, ShieldAlert, Download, Printer, CheckCircle2, 
  AlertTriangle, Calendar, Building, Sparkles 
} from 'lucide-react';

export const Reports = () => {
  const [companies, setCompanies] = useState([]);
  const [reportDate] = useState(new Date().toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  }));

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('/api/v1/companies');
        if (res.ok) {
          const data = await res.json();
          setCompanies(Array.isArray(data) ? data : Object.values(data));
        }
      } catch (err) {}
    };
    fetchCompanies();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 px-4 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* ─── Action Bar ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white m-0">
            Executive Regulatory Audit Report
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Automated synthesized risk posture dossier for audit committees and compliance officers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="clay-btn clay-btn-primary py-2 px-4 text-xs flex items-center gap-2"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* ─── Printable Dossier Sheet ─────────────────────────────────── */}
      <div className="clay-card p-8 sm:p-12 space-y-8 bg-slate-950/90 border border-slate-700/80">
        {/* Dossier Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-sky-500 to-blue-700 text-white">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white tracking-tight">RiskRadar<span className="text-sky-400">.AI</span></span>
              <span className="text-xs text-slate-400 block font-mono">REGULATORY SURVEILLANCE DOSSIER #RR-2026-DYP</span>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs font-mono text-slate-400 space-y-1">
            <div><strong>Generated:</strong> {reportDate}</div>
            <div><strong>Security Classification:</strong> RESTRICTED INSTITUTIONAL</div>
            <div><strong>Oversight Jurisdiction:</strong> SEC / OCC / FinCEN / CFPB</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2 font-mono text-sky-400">
            1. Executive Synthesis
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            This automated audit summarizes real-time risk telemetry derived from continuous NLP parsing of regulatory enforcement orders, civil complaints, and corporate disclosures. The Corporate Risk Index (CRI) quantifies mathematical exposure on a 0–100 scale using rolling mean-reversion decay physics.
          </p>
        </div>

        {/* Target Institutions Summary Table */}
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 font-mono text-sky-400">
            2. Institutional Surveillance Scoreboard
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-3 px-3">Institution</th>
                  <th className="py-3 px-3">Ticker</th>
                  <th className="py-3 px-3">Sector</th>
                  <th className="py-3 px-3 text-right">Current CRI</th>
                  <th className="py-3 px-3 text-right">Trend</th>
                  <th className="py-3 px-3">Threat Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {companies.map((c) => (
                  <tr key={c.ticker} className="text-slate-200">
                    <td className="py-3 px-3 font-semibold">{c.company}</td>
                    <td className="py-3 px-3 font-mono text-sky-400">{c.ticker}</td>
                    <td className="py-3 px-3 text-slate-400">{c.sector}</td>
                    <td className="py-3 px-3 font-mono font-bold text-right text-white">
                      {c.score?.toFixed(1)} / 100
                    </td>
                    <td className="py-3 px-3 font-mono text-right capitalize">
                      <span className={c.trend === 'rising' ? 'text-rose-400' : (c.trend === 'falling' ? 'text-emerald-400' : 'text-slate-400')}>
                        {c.trend}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        c.score >= 65 ? 'bg-rose-950/60 text-rose-300' :
                        (c.score >= 45 ? 'bg-amber-950/60 text-amber-300' : 'bg-emerald-950/60 text-emerald-300')
                      }`}>
                        {c.score >= 65 ? 'CRITICAL' : (c.score >= 45 ? 'ELEVATED' : 'BASELINE')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Attestation & Sign-off */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-400 grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono">
          <div>
            <div><strong>Lead Quantitative Engineer:</strong> Pranav Lamkhade</div>
            <div><strong>Affiliation:</strong> MIT Academy of Engineering (MITAOE)</div>
            <div><strong>Repository:</strong> github.com/pranav-6944/Riskradar-AI</div>
          </div>
          <div className="text-left sm:text-right">
            <div><strong>Audit Status:</strong> VERIFIED AUTOMATED</div>
            <div><strong>Microservices:</strong> Spring Boot 8080 · FastAPI 8000</div>
            <div><strong>Inference:</strong> Bionic LLM Local Studio</div>
          </div>
        </div>
      </div>
    </div>
  );
};

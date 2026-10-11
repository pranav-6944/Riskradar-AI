import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ExternalLink, Cpu, Heart, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12 px-4 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' }}>
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">RiskRadar<span className="text-sky-400">.AI</span></span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Automated Corporate Risk Radar engineered for financial analysts, regulatory risk teams, and hedge fund managers. Continuous NLP stream ingestion, rolling Corporate Risk Index (CRI), and explainable local LLM synthesis.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>All 3 Microservices Synchronized (Spring Boot 8080 · FastAPI 8000 · React 5173)</span>
            </div>
          </div>

          {/* Platform Nav */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 font-mono">Platform</h4>
            <ul className="space-y-2 text-sm list-none p-0">
              <li><Link to="/dashboard" className="text-slate-400 hover:text-sky-400 transition-colors text-decoration-none">Real-Time Cockpit</Link></li>
              <li><Link to="/news-hub" className="text-slate-400 hover:text-sky-400 transition-colors text-decoration-none">Continuous News Hub</Link></li>
              <li><Link to="/simulator" className="text-slate-400 hover:text-sky-400 transition-colors text-decoration-none">Scenario Stress Lab</Link></li>
              <li><Link to="/features" className="text-slate-400 hover:text-sky-400 transition-colors text-decoration-none">Fintech NLP Engine</Link></li>
              <li><Link to="/pricing" className="text-slate-400 hover:text-sky-400 transition-colors text-decoration-none">Institutional Tiers</Link></li>
            </ul>
          </div>

          {/* Hackathon & Author */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 font-mono">Hackathon Project</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built for <strong className="text-slate-200">DY Patil College Hackathon</strong> (Fintech Track).
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-white">Pranav Lamkhade</div>
              <div className="text-[11px] text-slate-400">B.Tech Computer Engineering & Data Science</div>
              <div className="text-[10px] text-sky-400">MIT Academy of Engineering (MITAOE)</div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <a
                href="https://github.com/pranav-6944/Riskradar-AI"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="GitHub Repository"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/pranav-lamkhade-6b48bb372"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} RiskRadar AI. RegTech & Algorithmic Surveillance Engine.
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
            <span>Formula: CRI(t) = CRI(t-1)·(1-0.05) + 25·0.05 + ΔRisk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

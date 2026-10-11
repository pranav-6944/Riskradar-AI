import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, Activity, ArrowRight, Zap, Eye, Scale, 
  TrendingUp, TrendingDown, Cpu, ChevronRight, CheckCircle2, 
  AlertTriangle, Play, Sparkles, Building2, BarChart2 
} from 'lucide-react';

export const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('radar');
  const [miniRadarCompany, setMiniRadarCompany] = useState('Goldman Sachs');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const companiesPreview = [
    { name: 'JPMorgan Chase', ticker: 'JPM', score: 32.4, trend: 'stable', delta: '+1.2', status: 'Moderate', color: '#38bdf8' },
    { name: 'Goldman Sachs', ticker: 'GS', score: 71.8, trend: 'rising', delta: '+14.5', status: 'Critical', color: '#f43f5e' },
    { name: 'Wells Fargo', ticker: 'WFC', score: 58.2, trend: 'rising', delta: '+6.1', status: 'Elevated', color: '#f59e0b' },
    { name: 'Citigroup', ticker: 'C', score: 26.5, trend: 'falling', delta: '-2.4', status: 'Low', color: '#10b981' },
    { name: 'Bank of America', ticker: 'BAC', score: 29.0, trend: 'stable', delta: '+0.5', status: 'Low', color: '#10b981' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ─── Parallax Background Ambient Lights ────────────────────── */}
      <div 
        className="ambient-glow glow-cyan" 
        style={{ 
          width: 650, 
          height: 650, 
          top: '-10%', 
          left: '20%', 
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: 0.35 
        }} 
      />
      <div 
        className="ambient-glow glow-indigo" 
        style={{ 
          width: 700, 
          height: 700, 
          top: '30%', 
          right: '-10%', 
          transform: `translateY(${scrollY * 0.15}px)`,
          opacity: 0.3 
        }} 
      />
      <div 
        className="ambient-glow glow-rose" 
        style={{ 
          width: 500, 
          height: 500, 
          top: '70%', 
          left: '-5%', 
          transform: `translateY(${scrollY * -0.1}px)`,
          opacity: 0.2 
        }} 
      />

      {/* ─── HERO SECTION (Multi-Layer Depth) ───────────────────────── */}
      <section className="relative pt-24 pb-28 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Parallax Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold uppercase tracking-wider text-sky-300"
            style={{ 
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(37, 99, 235, 0.25) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4), inset 1px 1px 2px rgba(255, 255, 255, 0.15)',
              transform: `translateY(${scrollY * -0.15}px)`
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Fintech Hackathon Breakthrough · RegTech Surveillance</span>
          </div>

          {/* Master Headline */}
          <h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"
            style={{ transform: `translateY(${scrollY * -0.08}px)` }}
          >
            Automated Corporate <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Risk Radar
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ transform: `translateY(${scrollY * -0.04}px)` }}
          >
            Continuous real-time stream ingestion separating critical regulatory & legal threats from noise. 
            Powered by a 120+ rule NLP engine, rolling CRI index, and local explainable LLM reasoning.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link to="/dashboard" className="clay-btn clay-btn-primary text-base px-8 py-4 text-decoration-none">
              <Activity className="w-5 h-5" />
              <span>Launch Live Radar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/simulator" className="clay-btn clay-btn-secondary text-base px-7 py-4 text-decoration-none">
              <Cpu className="w-5 h-5" />
              <span>Scenario Stress Lab</span>
            </Link>
          </div>
        </div>

        {/* ─── Claymorphic Mini-Radar Preview Widget ──────────────────── */}
        <div 
          className="clay-card p-6 sm:p-8 max-w-5xl mx-auto relative overflow-hidden"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          {/* Top Widget Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-700/60 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <div>
                <h3 className="text-base font-bold text-white m-0">Live Institutional Surveillance Stream</h3>
                <span className="text-xs text-slate-400 font-mono">Real-time SSE feed: http://localhost:8080/api/v1/stream</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Target Focus:</span>
              <span className="clay-badge text-sky-400 bg-sky-950/60 border-sky-500/30">Top 5 US Banks</span>
            </div>
          </div>

          {/* Mini-Radar Visual Center & Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
            {/* Visual Radar Scope */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800 relative">
              <div className="w-60 h-60 rounded-full relative flex items-center justify-center overflow-hidden border border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.15)]">
                {/* Concentric rings */}
                <div className="absolute inset-4 rounded-full border border-sky-500/20 radar-ring" />
                <div className="absolute inset-12 rounded-full border border-sky-500/20" />
                <div className="absolute inset-20 rounded-full border border-sky-500/20" />
                <div className="absolute w-full h-[1px] bg-sky-500/20" />
                <div className="absolute h-full w-[1px] bg-sky-500/20" />

                {/* Rotating sweep line */}
                <div className="radar-sweep-arm" />

                {/* Radar blips representing banks */}
                <div className="absolute top-12 right-16 w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e] animate-pulse" title="Goldman Sachs (CRI: 71.8)" />
                <div className="absolute bottom-16 right-12 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" title="Wells Fargo (CRI: 58.2)" />
                <div className="absolute top-16 left-12 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" title="JPMorgan (CRI: 32.4)" />
                <div className="absolute bottom-12 left-16 w-2 h-2 rounded-full bg-emerald-400" title="Citigroup (CRI: 26.5)" />
                <div className="absolute top-24 left-24 w-2 h-2 rounded-full bg-emerald-400" title="Bank of America (CRI: 29.0)" />

                {/* Center dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-md" />
              </div>
              <div className="text-center mt-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  Surveillance Scope · 360° Threat Sweep
                </span>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="lg:col-span-7 space-y-3">
              {companiesPreview.map((c) => (
                <div 
                  key={c.ticker}
                  className="p-3.5 rounded-xl transition-all flex items-center justify-between border"
                  style={{ 
                    background: c.ticker === 'GS' ? 'linear-gradient(90deg, rgba(244, 63, 94, 0.12) 0%, rgba(15, 23, 42, 0.8) 100%)' : 'rgba(15, 23, 42, 0.6)',
                    borderColor: c.ticker === 'GS' ? 'rgba(244, 63, 94, 0.4)' : 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-sky-400 w-10">{c.ticker}</span>
                    <div>
                      <div className="text-sm font-semibold text-white">{c.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <span>Status:</span>
                        <span style={{ color: c.color }} className="font-semibold">{c.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="text-lg font-bold font-mono text-white leading-none">{c.score}</div>
                      <div className="text-[10px] text-slate-400 font-mono">CRI Index</div>
                    </div>
                    <div className="w-16 text-right">
                      <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${c.delta.startsWith('+') ? 'text-rose-400 bg-rose-950/40' : 'text-emerald-400 bg-emerald-950/40'}`}>
                        {c.delta}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM VS SOLUTION PARALLAX COMPARISON ──────────────── */}
      <section className="py-24 px-4 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 font-mono">
            The Industry Bottleneck
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2">
            Why Traditional Risk Monitoring Fails
          </h2>
          <p className="text-base text-slate-400 mt-4 leading-relaxed">
            Financial analysts spend 4–6 hours daily parsing regulatory disclosures, civil complaints, and noisy press releases.
            Critical legal threats hide inside the noise until penalties explode.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="clay-card p-8 border-rose-500/20 relative" style={{ background: 'linear-gradient(135deg, rgba(30, 15, 25, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)' }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-rose-950/60 border border-rose-500/30 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">The Unstructured Noise Deluge</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Thousands of daily SEC filings, CFPB complaints, and press releases overload analysts. By the time a pattern is manually pieced together, enforcement penalties are already finalized.
            </p>
            <ul className="space-y-3 text-sm text-slate-300 list-none p-0">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Routine dividend PR dilutes genuine DOJ investigations</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Static quarterly disclosures fail to capture intraday risk spikes</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Subjective human interpretation lacks quantifiable trend velocity</span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="clay-card p-8 border-sky-500/20 relative" style={{ background: 'linear-gradient(135deg, rgba(14, 35, 60, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)' }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-sky-950/60 border border-sky-500/30 text-sky-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">The RiskRadar Algorithmic Shield</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Continuous text ingestion instantly filters 11+ corporate noise categories while firing 120+ regex patterns across 5 weighted domains with rolling mean-reverting CRI mathematical physics.
            </p>
            <ul className="space-y-3 text-sm text-slate-300 list-none p-0">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sub-15ms NLP pattern classification with negation dampening</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Mathematical rolling CRI equation with 5% exponential mean-reversion</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Explainable local Bionic LLM reasoning streaming why risk shifted</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 4 PLATFORM PILLARS ───────────────────────────────────────── */}
      <section className="py-24 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 font-mono">
            System Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2">
            The 4 Engine Pillars
          </h2>
          <p className="text-base text-slate-400 mt-4">
            Engineered with a high-throughput microservices architecture for mission-critical reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="clay-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-sky-950/50 border border-sky-500/30 text-sky-400">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Continuous Stream</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Async background generator emits simulated real-time financial news and CFPB complaints every 8–15s to Spring Boot webhooks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-sky-400">
              Microservice: Python FastAPI (:8000)
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="clay-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-indigo-950/50 border border-indigo-500/30 text-indigo-400">
                <Scale className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">120+ Regex NLP Rules</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Covers 5 weighted risk vectors: Legal (10), Compliance (8), Financial (9), Operational (7), and Reputational (6).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-indigo-400">
              Noise Dampening & Negation
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="clay-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-purple-950/50 border border-purple-500/30 text-purple-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Rolling CRI Physics</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Corporate Risk Index dynamically adjusts via mean-reverting decay formula, maintaining a rolling 60-point historical trail.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-purple-400">
              Decay Rate: 0.05 / Mean: 25.0
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="clay-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Local Bionic LLM</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero data leakage. On-premise LM Studio inference streams human-readable risk explanations and recommended hedges.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
              Endpoint: localhost:1234/v1
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 lg:px-8 max-w-5xl mx-auto">
        <div className="clay-card p-10 sm:p-14 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Step Into the Surveillance Cockpit
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Experience the end-to-end fintech platform built for the DY Patil College Hackathon. 
              View live corporate scoreboards, test what-if stress scenarios, and stream explainable AI audits.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/dashboard" className="clay-btn clay-btn-primary text-base px-8 py-3.5 text-decoration-none">
                <span>Open Analyst Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/news-hub" className="clay-btn clay-btn-secondary text-base px-6 py-3.5 text-decoration-none">
                <span>View News Stream</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, Activity, ArrowRight, Zap, Eye, Scale, 
  TrendingUp, TrendingDown, Cpu, ChevronRight, CheckCircle2, 
  AlertTriangle, Play, Sparkles, Building2, BarChart2 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const { isDark } = useTheme();

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
    <div className="relative overflow-hidden transition-colors duration-300">
      {/* ─── Parallax Background Ambient Lights ────────────────────── */}
      <div 
        className="ambient-glow glow-cyan" 
        style={{ 
          width: 650, 
          height: 650, 
          top: '-10%', 
          left: '20%', 
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: isDark ? 0.35 : 0.15 
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
          opacity: isDark ? 0.3 : 0.12 
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
          opacity: isDark ? 0.2 : 0.08 
        }} 
      />

      {/* ─── HERO SECTION (Multi-Layer Depth) ───────────────────────── */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Parallax Badge */}
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-wider text-sky-400 dark:text-sky-400 light:text-sky-700 bg-sky-500/10 border border-sky-500/25 shadow-sm"
            style={{ transform: `translateY(${scrollY * -0.12}px)` }}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Fintech Hackathon Breakthrough · RegTech Surveillance</span>
          </div>

          {/* Master Headline */}
          <h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight leading-[1.1] mb-6 font-heading"
            style={{ transform: `translateY(${scrollY * -0.06}px)` }}
          >
            Automated Corporate <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Risk Radar
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8"
            style={{ transform: `translateY(${scrollY * -0.03}px)` }}
          >
            Continuous real-time stream ingestion separating critical regulatory & legal threats from noise. 
            Powered by a 120+ rule NLP engine, rolling CRI index, and local explainable LLM reasoning.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
            <Link to="/dashboard" className="clay-btn clay-btn-primary text-sm px-6 py-3 text-decoration-none shadow-md">
              <Activity className="w-4 h-4" />
              <span>Launch Live Radar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/simulator" className="clay-btn clay-btn-secondary text-sm px-5 py-3 text-decoration-none shadow-sm">
              <Cpu className="w-4 h-4" />
              <span>Scenario Stress Lab</span>
            </Link>
          </div>
        </div>

        {/* ─── Claymorphic Mini-Radar Preview Widget ──────────────────── */}
        <div 
          className="clay-card p-6 sm:p-8 max-w-5xl mx-auto relative overflow-hidden"
          style={{ transform: `translateY(${scrollY * 0.04}px)` }}
        >
          {/* Top Widget Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <div>
                <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900 m-0">Live Institutional Surveillance Stream</h3>
                <span className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">Real-time SSE feed: http://localhost:8080/api/v1/stream</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Target Focus:</span>
              <span className="clay-badge text-sky-400 dark:text-sky-400 light:text-sky-600 bg-sky-950/60 dark:bg-sky-950/60 light:bg-sky-50 border-sky-500/30">Top 5 US Banks</span>
            </div>
          </div>

          {/* Mini-Radar Visual Center & Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
            {/* Visual Radar Scope */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 relative shadow-inner">
              <div className="w-56 h-56 rounded-full relative flex items-center justify-center overflow-hidden border border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.15)]">
                {/* Concentric rings */}
                <div className="absolute inset-4 rounded-full border border-sky-500/20 radar-ring" />
                <div className="absolute inset-12 rounded-full border border-sky-500/20" />
                <div className="absolute inset-20 rounded-full border border-sky-500/20" />
                <div className="absolute w-full h-[1px] bg-sky-500/20" />
                <div className="absolute h-full w-[1px] bg-sky-500/20" />

                {/* Rotating sweep line */}
                <div className="radar-sweep-arm" />

                {/* Radar blips representing banks */}
                <div className="absolute top-10 right-14 w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e] animate-pulse" title="Goldman Sachs (CRI: 71.8)" />
                <div className="absolute bottom-14 right-10 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" title="Wells Fargo (CRI: 58.2)" />
                <div className="absolute top-14 left-10 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" title="JPMorgan (CRI: 32.4)" />
                <div className="absolute bottom-10 left-14 w-2 h-2 rounded-full bg-emerald-400" title="Citigroup (CRI: 26.5)" />
                <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-emerald-400" title="Bank of America (CRI: 29.0)" />

                {/* Center dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-md" />
              </div>
              <div className="text-center mt-3">
                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase tracking-widest">
                  Surveillance Scope · 360° Threat Sweep
                </span>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="lg:col-span-7 space-y-2.5">
              {companiesPreview.map((c) => (
                <div 
                  key={c.ticker}
                  className="p-3 rounded-xl transition-all flex items-center justify-between border bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border-slate-800/70 dark:border-slate-800/70 light:border-slate-200 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-sky-400 dark:text-sky-400 light:text-sky-600 w-10">{c.ticker}</span>
                    <div>
                      <div className="text-sm font-semibold text-white dark:text-white light:text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center gap-1.5">
                        <span>Status:</span>
                        <span style={{ color: c.color }} className="font-semibold">{c.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="text-base font-bold font-mono text-white dark:text-white light:text-slate-900 leading-none">{c.score}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">CRI Index</div>
                    </div>
                    <div className="w-16 text-right">
                      <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                        c.delta.startsWith('+') 
                          ? 'text-rose-400 dark:text-rose-400 light:text-rose-600 bg-rose-500/10' 
                          : 'text-emerald-400 dark:text-emerald-400 light:text-emerald-600 bg-emerald-500/10'
                      }`}>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/70 dark:border-slate-800/70 light:border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 dark:text-sky-400 light:text-sky-600 font-mono">
            The Industry Bottleneck
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-white light:text-slate-900 mt-2 font-heading">
            Why Traditional Risk Monitoring Fails
          </h2>
          <p className="text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 mt-3 leading-relaxed">
            Financial analysts spend 4–6 hours daily parsing regulatory disclosures, civil complaints, and noisy press releases.
            Critical legal threats hide inside the noise until penalties explode.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="clay-card p-7 border-rose-500/20 relative">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mb-2">The Unstructured Noise Deluge</h3>
            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed mb-5">
              Thousands of daily SEC filings, CFPB complaints, and press releases overload analysts. By the time a pattern is manually pieced together, enforcement penalties are already finalized.
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 list-none p-0">
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
          <div className="clay-card p-7 border-sky-500/20 relative">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mb-2">The RiskRadar Algorithmic Shield</h3>
            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed mb-5">
              Continuous text ingestion instantly filters 11+ corporate noise categories while firing 120+ regex patterns across 5 weighted domains with rolling mean-reverting CRI mathematical physics.
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 list-none p-0">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 dark:text-sky-400 light:text-sky-600 font-mono">
            System Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-white light:text-slate-900 mt-2 font-heading">
            The 4 Engine Pillars
          </h2>
          <p className="text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 mt-3">
            Engineered with a high-throughput microservices architecture for mission-critical reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="clay-card p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-sky-500/10 border border-sky-500/30 text-sky-400">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900 mb-2">Continuous Stream</h4>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                Async background generator emits simulated real-time financial news and CFPB complaints every 8–15s to Spring Boot webhooks.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-[11px] font-mono text-sky-400 dark:text-sky-400 light:text-sky-600">
              Microservice: Python FastAPI (:8000)
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="clay-card p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900 mb-2">120+ Regex NLP Rules</h4>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                Covers 5 weighted risk vectors: Legal (10), Compliance (8), Financial (9), Operational (7), and Reputational (6).
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-[11px] font-mono text-indigo-400 dark:text-indigo-400 light:text-indigo-600">
              Noise Dampening & Negation
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="clay-card p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900 mb-2">Rolling CRI Physics</h4>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                Corporate Risk Index dynamically adjusts via mean-reverting decay formula, maintaining a rolling 60-point historical trail.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-[11px] font-mono text-purple-400 dark:text-purple-400 light:text-purple-600">
              Decay Rate: 0.05 / Mean: 25.0
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="clay-card p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900 mb-2">Local Bionic LLM</h4>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                Zero data leakage. On-premise LM Studio inference streams human-readable risk explanations and recommended hedges.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-[11px] font-mono text-emerald-400 dark:text-emerald-400 light:text-emerald-600">
              Endpoint: localhost:1234/v1
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div 
          className="clay-card p-8 sm:p-12 text-center relative overflow-hidden shadow-xl"
          style={{ 
            background: isDark 
              ? 'linear-gradient(135deg, #0b1120 0%, #1e1b4b 100%)' 
              : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)' 
          }}
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 mb-3 font-heading">
              Step Into the Surveillance Cockpit
            </h2>
            <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              Experience the end-to-end fintech platform built for the DY Patil College Hackathon. 
              View live corporate scoreboards, test what-if stress scenarios, and stream explainable AI audits.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link to="/dashboard" className="clay-btn clay-btn-primary text-sm px-6 py-3 text-decoration-none shadow-md">
                <span>Open Analyst Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/news-hub" className="clay-btn clay-btn-secondary text-sm px-5 py-3 text-decoration-none shadow-sm">
                <span>View News Stream</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

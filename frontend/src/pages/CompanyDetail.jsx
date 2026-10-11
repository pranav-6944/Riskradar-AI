import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldAlert, ArrowLeft, Activity, Cpu, Sparkles, 
  TrendingUp, TrendingDown, Minus, Clock, Scale, 
  AlertTriangle, CheckCircle2, RefreshCw 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';

export const CompanyDetail = () => {
  const { ticker } = useParams();
  const [company, setCompany] = useState(null);
  const [llmExplanation, setLlmExplanation] = useState('');
  const [llmLoading, setLlmLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const res = await fetch(`/api/v1/companies/${ticker}`);
        if (res.ok) {
          const data = await res.json();
          setCompany(data);
          setLlmExplanation(data.explanation || '');
        }
      } catch (err) {
        console.error('Failed to load company detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
    const interval = setInterval(fetchCompanyData, 4000);
    return () => clearInterval(interval);
  }, [ticker]);

  const requestLlmAnalysis = async () => {
    if (!company) return;
    setLlmLoading(true);
    try {
      const res = await fetch(`/api/v1/companies/${ticker}/explanation`);
      if (res.ok) {
        const data = await res.json();
        setLlmExplanation(data.explanation || 'No response returned from model.');
      } else {
        // Fallback directly to Python AI service proxy
        const directRes = await fetch(`/ai-api/explain-json/${encodeURIComponent(company.company)}`);
        if (directRes.ok) {
          const directData = await directRes.json();
          setLlmExplanation(directData.explanation);
        }
      }
    } catch (err) {
      setLlmExplanation('Local Bionic LLM endpoint is currently offline. Ensure LM Studio is active at http://localhost:1234/v1.');
    } finally {
      setLlmLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full mb-4"></div>
        <p className="text-slate-400 font-mono text-sm">Retrieving regulatory dossiers...</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="py-24 text-center max-w-md mx-auto">
        <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Target Institution Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">Ticker symbol '{ticker}' is not currently in the active surveillance pool.</p>
        <Link to="/dashboard" className="clay-btn clay-btn-primary text-sm text-decoration-none">
          Return to Cockpit
        </Link>
      </div>
    );
  }

  const radarData = Object.entries(company.categoryScores || {}).map(([key, val]) => ({
    category: key.toUpperCase(),
    score: val,
    fullMark: 100,
  }));

  const historyData = company.history || [];

  return (
    <div className="py-8 px-4 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* ─── Back Link & Header ────────────────────────────────────────── */}
      <div>
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold mb-4 text-decoration-none">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Surveillance Cockpit</span>
        </Link>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white m-0">
                {company.company}
              </h1>
              <span className="font-mono text-sm font-bold text-sky-400 px-3 py-1 rounded-xl bg-sky-950/60 border border-sky-500/30">
                {company.ticker}
              </span>
            </div>
            <span className="text-sm text-slate-400 block mt-1">{company.sector} · Intraday Surveillance Pool</span>
          </div>

          {/* Current CRI Display */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white leading-none">
                {company.score?.toFixed(1)}
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                Corporate Risk Index
              </span>
            </div>
            <div className="text-right">
              <span className={`clay-badge text-xs ${company.score >= 65 ? 'text-rose-400 bg-rose-950/40 border-rose-500/40' : (company.score >= 45 ? 'text-amber-400 bg-amber-950/40 border-amber-500/40' : 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40')}`}>
                {company.score >= 65 ? 'CRITICAL THREAT' : (company.score >= 45 ? 'ELEVATED RISK' : 'STABLE BASELINE')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Trajectory Chart & 5-Vector Radar Chart ──────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Rolling Historical CRI Trajectory */}
        <div className="lg:col-span-7 clay-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white m-0 flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                <span>Rolling CRI Historical Trajectory</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Mean-Reversion λ = 0.05
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyData}>
                  <defs>
                    <linearGradient id="detailGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#475569" fontSize={10} />
                  <YAxis domain={[0, 100]} stroke="#475569" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ background: '#090e1a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#38bdf8" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#detailGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Historical Trail: Last {historyData.length} Readings</span>
            <span className="text-sky-400">Velocity: {company.trend?.toUpperCase()}</span>
          </div>
        </div>

        {/* 5 Risk Vectors Radar Chart */}
        <div className="lg:col-span-5 clay-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white m-0 flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-400" />
                <span>5-Vector Exposure Radar</span>
              </h3>
              <span className="text-xs font-mono text-purple-400">
                120+ Regex Match
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="category" stroke="#94a3b8" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={8} />
                  <Radar 
                    name={company.company} 
                    dataKey="score" 
                    stroke="#c084fc" 
                    fill="#a855f7" 
                    fillOpacity={0.45} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center font-mono">
            Legal (10) · Compliance (8) · Financial (9) · Operational (7) · Reputational (6)
          </div>
        </div>
      </div>

      {/* ─── Local Bionic LLM Explainer Card ──────────────────────────── */}
      <div className="clay-card p-6 sm:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.9) 100%)' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-700/60 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-950/80 border border-indigo-500/40 text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white m-0">Local Bionic LLM Risk Explainer</h3>
              <span className="text-xs text-slate-400 font-mono">
                On-premise LM Studio inference · Model: bionic · Endpoint: localhost:1234/v1
              </span>
            </div>
          </div>

          <button
            onClick={requestLlmAnalysis}
            disabled={llmLoading}
            className="clay-btn clay-btn-primary py-2 px-4 text-xs"
          >
            {llmLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Streaming Tokens...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Re-Synthesize Audit</span>
              </>
            )}
          </button>
        </div>

        {/* LLM Reasoning Text Box */}
        <div className="mt-6 p-6 rounded-2xl bg-slate-950/90 border border-slate-800/90 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap font-sans">
          {llmExplanation || (
            <span className="text-slate-400 italic">
              Click 'Re-Synthesize Audit' to stream live chain-of-thought analysis from the on-premise Bionic model.
            </span>
          )}
        </div>
      </div>

      {/* ─── Timeline of Recent Risk Events for this Institution ──────── */}
      <div className="clay-card p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-400" />
          <span>Recent Regulatory Ingestions & Filings</span>
        </h3>

        <div className="space-y-3">
          {(company.events || []).length > 0 ? (
            company.events.map((evt, idx) => (
              <div 
                key={evt.id || idx}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`clay-badge text-[10px] ${evt.highRisk ? 'text-rose-400 bg-rose-950/40 border-rose-500/40' : 'text-slate-400 bg-slate-900 border-slate-700'}`}>
                      {evt.highRisk ? 'HIGH RISK' : 'ROUTINE'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{evt.source || 'Regulatory Wire'}</span>
                    <span className="text-xs text-slate-400 font-mono">· {evt.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 m-0">{evt.text}</p>
                </div>

                <div className="shrink-0 text-right">
                  <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${evt.riskDelta > 0 ? 'text-rose-400 bg-rose-950/40' : 'text-emerald-400 bg-emerald-950/40'}`}>
                    +{evt.riskDelta?.toFixed(1)} Δ
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs font-mono">
              No recent high-risk violations logged for this company in current session.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

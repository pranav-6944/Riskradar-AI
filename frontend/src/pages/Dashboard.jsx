import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, Activity, TrendingUp, TrendingDown, Minus, 
  ExternalLink, Sparkles, Filter, AlertTriangle, ArrowUpRight, 
  Clock, RefreshCw, BarChart3, Radio 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';

export const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [latestEvents, setLatestEvents] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [filterSeverity, setFilterSeverity] = useState('all');

  // Fetch initial data + connect SSE
  useEffect(() => {
    let eventSource = null;

    const fetchSnapshot = async () => {
      try {
        const res = await fetch('/api/v1/companies');
        if (res.ok) {
          const data = await res.json();
          setCompanies(Array.isArray(data) ? data : Object.values(data));
        }
      } catch (err) {
        console.error('Failed to fetch snapshot:', err);
      }
    };

    fetchSnapshot();

    // Connect to Spring Boot SSE stream
    try {
      eventSource = new EventSource('/api/v1/stream');
      
      eventSource.onopen = () => {
        setConnectionStatus('connected');
      };

      eventSource.addEventListener('init-connection', (e) => {
        try {
          const data = JSON.parse(e.data);
          setCompanies(Array.isArray(data) ? data : Object.values(data));
        } catch (err) {}
      });

      eventSource.addEventListener('scoreboard-update', (e) => {
        try {
          const data = JSON.parse(e.data);
          setCompanies(Array.isArray(data) ? data : Object.values(data));
        } catch (err) {}
      });

      eventSource.addEventListener('risk-event', (e) => {
        try {
          const event = JSON.parse(e.data);
          setLatestEvents((prev) => [event, ...prev.slice(0, 19)]);
          // Trigger snapshot refresh
          fetchSnapshot();
        } catch (err) {}
      });

      eventSource.onerror = () => {
        setConnectionStatus('polling');
      };
    } catch (e) {
      setConnectionStatus('polling');
    }

    // Fallback polling every 5s if SSE is unavailable or in error
    const pollInterval = setInterval(() => {
      fetchSnapshot();
    }, 5000);

    return () => {
      if (eventSource) eventSource.close();
      clearInterval(pollInterval);
    };
  }, []);

  const getSeverity = (score) => {
    if (score >= 65) return { label: 'CRITICAL', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.4)' };
    if (score >= 45) return { label: 'ELEVATED', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)' };
    if (score >= 30) return { label: 'MODERATE', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.4)' };
    return { label: 'LOW RISK', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)' };
  };

  const filteredCompanies = companies.filter((c) => {
    if (filterSeverity === 'all') return true;
    if (filterSeverity === 'critical') return c.score >= 65;
    if (filterSeverity === 'elevated') return c.score >= 45 && c.score < 65;
    if (filterSeverity === 'low') return c.score < 45;
    return true;
  });

  return (
    <div className="py-8 px-4 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* ─── Top Cockpit Header ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white m-0">
              Surveillance Cockpit
            </h1>
            <span className="clay-badge text-xs text-sky-400 bg-sky-950/60 border-sky-500/30">
              Real-Time CRI Radar
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Continuous threat stream tracking top 5 financial institutions under active regulatory oversight.
          </p>
        </div>

        {/* Live SSE Status Badge & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <Radio className={`w-3.5 h-3.5 ${connectionStatus === 'connected' ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
            <span className={connectionStatus === 'connected' ? 'text-emerald-400' : 'text-amber-400'}>
              SSE: {connectionStatus.toUpperCase()}
            </span>
          </div>

          <Link to="/simulator" className="clay-btn clay-btn-primary py-2 px-4 text-xs text-decoration-none">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scenario Lab</span>
          </Link>
        </div>
      </div>

      {/* ─── Ticker Tape of Latest Signals ─────────────────────────────── */}
      <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-center gap-3 overflow-hidden shadow-inner">
        <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-500/40 text-[11px] font-bold text-rose-300 font-mono">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>RADAR FEED:</span>
        </div>
        <div className="truncate text-xs text-slate-300 font-mono">
          {latestEvents.length > 0 ? (
            <span>
              <strong className="text-sky-400">[{latestEvents[0].company}]</strong> {latestEvents[0].summary || latestEvents[0].text}
            </span>
          ) : (
            <span>Continuous background NLP stream evaluating filings, complaints, and corporate PR...</span>
          )}
        </div>
      </div>

      {/* ─── Filter Pills ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 font-semibold mr-2">Filter View:</span>
        {['all', 'critical', 'elevated', 'low'].map((f) => (
          <button
            key={f}
            onClick={() => setFilterSeverity(f)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
              filterSeverity === f
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {f === 'all' ? 'All Institutions' : `${f} Threat`}
          </button>
        ))}
      </div>

      {/* ─── 5-Bank Scoreboard Grid ───────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((c) => {
          const sev = getSeverity(c.score);
          const historyData = (c.history || []).slice(-15);

          return (
            <div 
              key={c.ticker}
              className="clay-card p-6 flex flex-col justify-between relative overflow-hidden"
              style={{
                borderColor: c.score >= 65 ? 'rgba(244, 63, 94, 0.4)' : 'rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white m-0">{c.company}</h3>
                      <span className="font-mono text-xs font-bold text-sky-400 px-2 py-0.5 rounded bg-sky-950/60 border border-sky-500/30">
                        {c.ticker}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 block mt-0.5">{c.sector}</span>
                  </div>

                  {/* Status Badge */}
                  <span 
                    className="clay-badge text-[10px]"
                    style={{ color: sev.color, background: sev.bg, borderColor: sev.border }}
                  >
                    {sev.label}
                  </span>
                </div>

                {/* Main Score & Trend Indicator */}
                <div className="flex items-baseline justify-between my-4 pb-4 border-b border-slate-700/50">
                  <div>
                    <div className="text-4xl font-extrabold font-mono text-white tracking-tight">
                      {c.score?.toFixed(1)}
                      <span className="text-xs text-slate-400 font-normal ml-1">/ 100</span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                      Corporate Risk Index
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-xs font-bold font-mono">
                      {c.trend === 'rising' && (
                        <span className="text-rose-400 flex items-center gap-0.5">
                          <TrendingUp className="w-4 h-4" /> RISING
                        </span>
                      )}
                      {c.trend === 'falling' && (
                        <span className="text-emerald-400 flex items-center gap-0.5">
                          <TrendingDown className="w-4 h-4" /> FALLING
                        </span>
                      )}
                      {c.trend === 'stable' && (
                        <span className="text-slate-400 flex items-center gap-0.5">
                          <Minus className="w-4 h-4" /> STABLE
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Velocity</span>
                  </div>
                </div>

                {/* Mini Trajectory Sparkline */}
                <div className="h-20 w-full my-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historyData}>
                      <defs>
                        <linearGradient id={`grad-${c.ticker}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={sev.color} stopOpacity={0.4} />
                          <stop offset="95%" stopColor={sev.color} stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" hide />
                      <YAxis domain={['auto', 'auto']} hide />
                      <Tooltip 
                        contentStyle={{ background: '#090e1a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '11px' }}
                        labelStyle={{ color: '#94a3b8' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke={sev.color} 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill={`url(#grad-${c.ticker})`} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Latest Threat Headline */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed my-2 line-clamp-2">
                  {c.explanation || 'Normal operational status. No active regulatory sanctions.'}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <Link
                  to={`/company/${c.ticker}`}
                  className="clay-btn clay-btn-secondary w-full py-2.5 text-xs text-decoration-none flex items-center justify-between"
                >
                  <span>Inspect Deep-Dive Analysis</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

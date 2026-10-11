import React, { useState, useEffect } from 'react';
import { 
  Newspaper, ShieldAlert, Filter, Search, Zap, 
  AlertTriangle, CheckCircle2, Clock, Sparkles, RefreshCw 
} from 'lucide-react';

export const NewsHub = () => {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [injecting, setInjecting] = useState(false);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/v1/news');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Failed to load news:', err);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 4000);
    return () => clearInterval(interval);
  }, []);

  const injectQuickEvent = async (type) => {
    setInjecting(true);
    let company = 'Goldman Sachs';
    let text = '';

    if (type === 'doj') {
      text = 'Department of Justice (DOJ) issues formal criminal indictment against Goldman Sachs over $1.2B fraudulent bond syndicate scheme.';
    } else if (type === 'sanctions') {
      company = 'Wells Fargo';
      text = 'FinCEN slaps Wells Fargo with $520M penalty for massive AML compliance breach and failure to file SARs on sanctioned entities.';
    } else if (type === 'noise') {
      company = 'JPMorgan Chase';
      text = 'JPMorgan Chase declares regular quarterly dividend and sponsors nationwide community charity festival.';
    }

    try {
      await fetch('/ai-api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, text, source: 'Analyst Rapid Injection' }),
      });
      await fetchNews();
    } catch (err) {
      console.error('Injection failed:', err);
    } finally {
      setInjecting(false);
    }
  };

  const filteredEvents = events.filter((e) => {
    if (filterType === 'critical' && !e.highRisk) return false;
    if (filterType === 'routine' && e.highRisk) return false;
    if (selectedCompany !== 'ALL' && e.company !== selectedCompany) return false;
    if (searchQuery && !e.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="py-8 px-4 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white m-0">
              Regulatory Stream & Noise Filter
            </h1>
            <span className="clay-badge text-xs text-indigo-400 bg-indigo-950/60 border-indigo-500/30">
              Live Ingestion Feed
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Continuous NLP evaluation separating critical legal/operational alerts from routine corporate PR.
          </p>
        </div>

        {/* Rapid Test Injection Buttons for Judges */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => injectQuickEvent('doj')}
            disabled={injecting}
            className="clay-btn clay-btn-danger text-xs py-2 px-3"
            title="Inject DOJ Indictment"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>+ DOJ Threat</span>
          </button>
          <button
            onClick={() => injectQuickEvent('sanctions')}
            disabled={injecting}
            className="clay-btn clay-btn-primary text-xs py-2 px-3"
            title="Inject AML Sanctions Violation"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>+ AML Sanctions</span>
          </button>
          <button
            onClick={() => injectQuickEvent('noise')}
            disabled={injecting}
            className="clay-btn clay-btn-secondary text-xs py-2 px-3"
            title="Inject PR Noise"
          >
            <span>+ PR Noise</span>
          </button>
        </div>
      </div>

      {/* ─── Search & Filtering Controls ─────────────────────────────── */}
      <div className="clay-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search filings, keywords, subpoenas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="clay-input pl-10 text-xs py-2.5"
          />
        </div>

        {/* Company & Category Selectors */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="clay-input text-xs py-2 px-3 cursor-pointer"
            style={{ background: '#090e1a' }}
          >
            <option value="ALL">All Companies</option>
            <option value="JPMorgan Chase">JPMorgan Chase</option>
            <option value="Goldman Sachs">Goldman Sachs</option>
            <option value="Wells Fargo">Wells Fargo</option>
            <option value="Citigroup">Citigroup</option>
            <option value="Bank of America">Bank of America</option>
          </select>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {['all', 'critical', 'routine'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  filterType === t ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Events Stream List ───────────────────────────────────────── */}
      <div className="space-y-3">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={`clay-card p-5 transition-all ${
                evt.highRisk ? 'border-rose-500/40 bg-slate-900/90' : 'border-slate-800/80 bg-slate-950/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className={`clay-badge text-[10px] ${evt.highRisk ? 'text-rose-400 bg-rose-950/60 border-rose-500/50' : 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40'}`}>
                    {evt.highRisk ? 'HIGH RISK DETECTED' : 'FILTERED NOISE / ROUTINE'}
                  </span>
                  <span className="font-bold text-white text-sm">{evt.company}</span>
                  <span className="font-mono text-xs text-sky-400">({evt.ticker})</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{evt.timestamp}</span>
                  <span>· {evt.source}</span>
                </div>
              </div>

              {/* Event Text */}
              <p className="text-sm text-slate-200 leading-relaxed mb-3">
                {evt.text}
              </p>

              {/* Algorithmic Breakdown Pill */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="text-slate-400">
                  <span className="text-sky-400">Algorithmic Summary:</span> {evt.summary}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">Severity: {evt.severity}x</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${evt.riskDelta > 0 ? 'text-rose-400 bg-rose-950/60' : 'text-slate-400 bg-slate-900'}`}>
                    +{evt.riskDelta?.toFixed(1)} ΔRisk
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 clay-card">
            <Newspaper className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Matching Ingestion Events</h3>
            <p className="text-xs text-slate-400">Waiting for next continuous news packet or manual injection...</p>
          </div>
        )}
      </div>
    </div>
  );
};

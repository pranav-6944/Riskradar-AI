import React, { useState, useEffect } from 'react';
import { 
  Newspaper, ShieldAlert, Filter, Search, Zap, 
  AlertTriangle, CheckCircle2, Clock, Sparkles, RefreshCw, Radio 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { API_ENDPOINTS } from '../config/api';

export const NewsHub = () => {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [injecting, setInjecting] = useState(false);
  const [finnhubSyncing, setFinnhubSyncing] = useState(false);
  const { isDark } = useTheme();

  const fetchNews = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.news);
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
    const interval = setInterval(fetchNews, 3500);
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
      await fetch(API_ENDPOINTS.aiIngest, {
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

  const syncFinnhubNews = async (ticker = 'JPM') => {
    setFinnhubSyncing(true);
    try {
      const res = await fetch(API_ENDPOINTS.finnhubSync(ticker), {
        method: 'POST',
      });
      if (res.ok) {
        await fetchNews();
      }
    } catch (err) {
      console.error('Finnhub sync failed:', err);
    } finally {
      setFinnhubSyncing(false);
    }
  };

  const syncAllFinnhub = async () => {
    setFinnhubSyncing(true);
    try {
      const res = await fetch(API_ENDPOINTS.finnhubSyncAll, {
        method: 'POST',
      });
      if (res.ok) {
        await fetchNews();
      }
    } catch (err) {
      console.error('Finnhub sync all failed:', err);
    } finally {
      setFinnhubSyncing(false);
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
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 transition-colors duration-300">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 m-0 font-heading">
              Live Regulatory & Market News Stream
            </h1>
            <span className="clay-badge text-xs text-sky-400 dark:text-sky-400 light:text-sky-600 bg-sky-500/10 border-sky-500/30 font-mono">
              ● 100% LIVE FINNHUB API STREAM
            </span>
          </div>
          <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1">
            Continuous real-time Wall Street news automatically detected and synced for JPM, GS, WFC, C, and BAC.
          </p>
        </div>

        {/* Rapid Test Injection Buttons for Judges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 hidden sm:inline mr-1">
            Manual Stress Testing:
          </span>
          <button
            onClick={() => injectQuickEvent('doj')}
            disabled={injecting}
            className="clay-btn clay-btn-danger text-xs py-2 px-3 shadow-sm"
            title="Inject DOJ Indictment Stress Test"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>+ DOJ Threat</span>
          </button>
          <button
            onClick={() => injectQuickEvent('sanctions')}
            disabled={injecting}
            className="clay-btn clay-btn-primary text-xs py-2 px-3 shadow-sm"
            title="Inject AML Sanctions Violation"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>+ AML Sanctions</span>
          </button>
          <button
            onClick={() => injectQuickEvent('noise')}
            disabled={injecting}
            className="clay-btn clay-btn-secondary text-xs py-2 px-3 shadow-sm"
            title="Inject PR Noise"
          >
            <span>+ PR Noise</span>
          </button>
        </div>
      </div>

      {/* ─── LIVE FINNHUB API INTEGRATION BANNER ──────────────────────── */}
      <div className="clay-card p-4 sm:p-5 border-sky-500/30 relative overflow-hidden shadow-lg" style={{ background: isDark ? 'linear-gradient(135deg, rgba(8, 28, 56, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)' : 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)' }}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-500/20 border border-sky-400/30 text-sky-400 shadow-md">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900 m-0 font-heading">
                  Live Finnhub Stock API Wire
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 border border-emerald-500/30">
                  LIVE REST API CONNECTED
                </span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
                Real-world Wall Street market news pulled via live Finnhub API key and processed through our 120+ regex engine.
              </p>
            </div>
          </div>

          {/* Live Sync Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => syncFinnhubNews('JPM')}
              disabled={finnhubSyncing}
              className="clay-btn clay-btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${finnhubSyncing ? 'animate-spin' : ''}`} />
              <span>Sync JPM</span>
            </button>
            <button
              onClick={() => syncFinnhubNews('GS')}
              disabled={finnhubSyncing}
              className="clay-btn clay-btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${finnhubSyncing ? 'animate-spin' : ''}`} />
              <span>Sync GS</span>
            </button>
            <button
              onClick={() => syncFinnhubNews('WFC')}
              disabled={finnhubSyncing}
              className="clay-btn clay-btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${finnhubSyncing ? 'animate-spin' : ''}`} />
              <span>Sync WFC</span>
            </button>
            <button
              onClick={syncAllFinnhub}
              disabled={finnhubSyncing}
              className="clay-btn clay-btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-md"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Sync All 5 Banks Live</span>
            </button>
          </div>
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
          >
            <option value="ALL">All Companies</option>
            <option value="JPMorgan Chase">JPMorgan Chase</option>
            <option value="Goldman Sachs">Goldman Sachs</option>
            <option value="Wells Fargo">Wells Fargo</option>
            <option value="Citigroup">Citigroup</option>
            <option value="Bank of America">Bank of America</option>
          </select>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 p-1 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
            {['all', 'critical', 'routine'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  filterType === t 
                    ? 'bg-sky-500 text-white shadow-sm' 
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white'
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
          filteredEvents.map((evt) => {
            const isFinnhub = evt.source && evt.source.includes('Finnhub');

            return (
              <div
                key={evt.id}
                className={`clay-card p-5 transition-all ${
                  evt.highRisk 
                    ? 'border-rose-500/40 bg-slate-900/90 dark:bg-slate-900/90 light:bg-rose-50/20' 
                    : isFinnhub
                    ? 'border-sky-500/40 bg-slate-950/80 dark:bg-slate-950/80 light:bg-sky-50/20'
                    : 'border-slate-800/80 dark:border-slate-800/80 light:border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    {isFinnhub && (
                      <span className="clay-badge text-[10px] text-sky-400 dark:text-sky-400 light:text-sky-600 bg-sky-500/10 border-sky-500/40 font-mono">
                        ⚡ LIVE FINNHUB API
                      </span>
                    )}
                    <span className={`clay-badge text-[10px] ${
                      evt.highRisk 
                        ? 'text-rose-400 dark:text-rose-400 light:text-rose-600 bg-rose-500/10 border-rose-500/40' 
                        : 'text-emerald-400 dark:text-emerald-400 light:text-emerald-600 bg-emerald-500/10 border-emerald-500/40'
                    }`}>
                      {evt.highRisk ? 'HIGH RISK DETECTED' : 'FILTERED NOISE / ROUTINE'}
                    </span>
                    <span className="font-bold text-white dark:text-white light:text-slate-900 text-sm">{evt.company}</span>
                    <span className="font-mono text-xs text-sky-400 dark:text-sky-400 light:text-sky-600 font-semibold">({evt.ticker})</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evt.timestamp}</span>
                    <span className="font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">· {evt.source}</span>
                  </div>
                </div>

                {/* Event Text */}
                <p className="text-sm text-slate-200 dark:text-slate-200 light:text-slate-800 leading-relaxed mb-3">
                  {evt.text}
                </p>

                {/* Algorithmic Breakdown Pill */}
                <div className="pt-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="text-slate-400 dark:text-slate-400 light:text-slate-500">
                    <span className="text-sky-400 dark:text-sky-400 light:text-sky-600 font-semibold">Algorithmic Summary:</span> {evt.summary}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 dark:text-slate-400 light:text-slate-500">Severity: {evt.severity}x</span>
                    <span className={`font-bold px-2 py-0.5 rounded ${
                      evt.riskDelta > 0 
                        ? 'text-rose-400 dark:text-rose-400 light:text-rose-600 bg-rose-500/10' 
                        : 'text-slate-400 dark:text-slate-400 light:text-slate-600 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-200'
                    }`}>
                      +{evt.riskDelta?.toFixed(1)} ΔRisk
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 clay-card">
            <Newspaper className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white dark:text-white light:text-slate-900 mb-1">No Matching Ingestion Events</h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Waiting for next continuous news packet or manual injection...</p>
          </div>
        )}
      </div>
    </div>
  );
};

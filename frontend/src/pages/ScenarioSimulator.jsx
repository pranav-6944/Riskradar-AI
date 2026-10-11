import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, ShieldAlert, Zap, AlertTriangle, CheckCircle2, 
  ArrowRight, Play, RefreshCw, Scale, Sparkles 
} from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

export const ScenarioSimulator = () => {
  const [selectedCompany, setSelectedCompany] = useState('Goldman Sachs');
  const [scenarioText, setScenarioText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const presets = [
    {
      title: 'DOJ Criminal Indictment & Asset Freeze',
      category: 'Legal Exposure (Weight: 10)',
      text: 'Department of Justice (DOJ) issues formal criminal indictment against {company} over alleged $2.4B securities fraud, securities violation, and insider trading with immediate federal subpoenas.',
      severity: 'Critical Threat',
      type: 'danger',
    },
    {
      title: 'FinCEN Landmark AML Sanction Penalty',
      category: 'Compliance Breach (Weight: 8)',
      text: 'FinCEN and OCC announce joint $850M penalty against {company} following systemic AML compliance failure, failure to file SARs, and sanctions violations.',
      severity: 'High Threat',
      type: 'warning',
    },
    {
      title: 'Catastrophic Ransomware & Core Banking Disruption',
      category: 'Operational Outage (Weight: 7)',
      text: '{company} suffers critical cyber attack and ransomware intrusion, causing nationwide system outage, service disruption, and massive workforce reduction.',
      severity: 'Elevated Threat',
      type: 'warning',
    },
    {
      title: 'Federal Appellate Court Dismissal & Full Exoneration',
      category: 'Negation / Resolution Signal',
      text: 'Federal appellate judge dismissed all allegations in consumer class action against {company}, declaring full exoneration with all charges dropped and case closed.',
      severity: 'Threat Reduction',
      type: 'success',
    },
    {
      title: 'Quarterly Earnings & CSR Philanthropy PR',
      category: 'Corporate Noise Filter',
      text: '{company} reports quarterly earnings in line with consensus, declares quarterly dividend, and announces nationwide expansion plans and charity donation gala.',
      severity: 'Filtered Routine PR',
      type: 'neutral',
    },
  ];

  const handleSelectPreset = (preset) => {
    setScenarioText(preset.text.replace('{company}', selectedCompany));
    setResult(null);
  };

  const handleRunSimulation = async () => {
    if (!scenarioText.trim()) return;
    setAnalyzing(true);
    setResult(null);

    try {
      // 1. Direct NLP analysis
      const res = await fetch(API_ENDPOINTS.aiAnalyze, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: scenarioText,
          company: selectedCompany,
        }),
      });

      const data = await res.json();

      // 2. Commit ingestion into live cluster
      const ingestRes = await fetch(API_ENDPOINTS.aiIngest, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: scenarioText,
          company: selectedCompany,
          source: 'Scenario Lab Simulation',
        }),
      });

      const ingestData = await ingestRes.json();
      setResult({ ...data, newScore: ingestData.new_score });
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="py-8 px-4 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white m-0">
            What-If Scenario Stress Testing Lab
          </h1>
          <span className="clay-badge text-xs text-purple-400 bg-purple-950/60 border-purple-500/30">
            Algorithmic Sandbox
          </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Inject hypothetical regulatory sanctions, cyber failures, or PR noise to evaluate instantaneous NLP classification and rolling CRI delta response.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ─── Left Configuration Column ─────────────────────────────── */}
        <div className="lg:col-span-7 space-y-6">
          <div className="clay-card p-6 space-y-5">
            {/* Target Institution Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Target Institution
              </label>
              <select
                value={selectedCompany}
                onChange={(e) => {
                  setSelectedCompany(e.target.value);
                  setResult(null);
                }}
                className="clay-input text-sm font-semibold cursor-pointer"
              >
                <option value="JPMorgan Chase">JPMorgan Chase (JPM)</option>
                <option value="Goldman Sachs">Goldman Sachs (GS)</option>
                <option value="Wells Fargo">Wells Fargo (WFC)</option>
                <option value="Citigroup">Citigroup (C)</option>
                <option value="Bank of America">Bank of America (BAC)</option>
              </select>
            </div>

            {/* Presets List */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Rapid Scenario Templates (Click to Populate)
              </label>
              <div className="space-y-2">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(p)}
                    className="clay-card-flat p-3 w-full text-left transition-all hover:border-sky-500/40 cursor-pointer block"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                      <span>{p.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        p.type === 'danger' ? 'bg-rose-950/60 text-rose-400' :
                        (p.type === 'success' ? 'bg-emerald-950/60 text-emerald-400' : 'bg-slate-900 text-slate-400')
                      }`}>
                        {p.severity}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{p.category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario Textarea */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Simulated Narrative / Regulatory Text
              </label>
              <textarea
                rows={4}
                value={scenarioText}
                onChange={(e) => setScenarioText(e.target.value)}
                placeholder="Enter or customize breaking regulatory disclosure text..."
                className="clay-input text-xs font-mono leading-relaxed resize-none"
              />
            </div>

            {/* Execute Simulation Button */}
            <button
              onClick={handleRunSimulation}
              disabled={analyzing || !scenarioText.trim()}
              className="clay-btn clay-btn-primary w-full py-3.5 text-sm"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Regex Signatures...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Simulate Real-Time Shock Impact</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ─── Right Evaluation Output Column ─────────────────────────── */}
        <div className="lg:col-span-5 space-y-6">
          <div className="clay-card p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-5">
                <h3 className="text-base font-bold text-white m-0 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-sky-400" />
                  <span>Algorithmic Impact Telemetry</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">Port 8000</span>
              </div>

              {result ? (
                <div className="space-y-4">
                  {/* Status Banner */}
                  <div className={`p-4 rounded-xl border flex items-center justify-between ${
                    result.is_high_risk ? 'bg-rose-950/40 border-rose-500/40 text-rose-300' : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      {result.is_high_risk ? <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      <div>
                        <div className="font-bold text-xs uppercase tracking-wider">
                          {result.is_high_risk ? 'HIGH RISK SIGNAL DETECTED' : 'FILTERED NOISE / RESOLUTION'}
                        </div>
                        <div className="text-[11px] opacity-80">Severity Multiplier: {result.severity_multiplier}x</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-mono font-extrabold">
                        +{result.risk_score_delta}
                      </div>
                      <div className="text-[10px] font-mono opacity-80">ΔRisk Impact</div>
                    </div>
                  </div>

                  {/* Algorithmic Summary */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
                    <span className="text-sky-400 font-bold block mb-1">Algorithmic Summary:</span>
                    {result.summary}
                  </div>

                  {/* Matched Signals Breakdown */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono block mb-2">
                      Pattern Rule Matches:
                    </span>
                    <div className="space-y-2">
                      {Object.keys(result.matched_signals || {}).length > 0 ? (
                        Object.entries(result.matched_signals).map(([cat, d]) => (
                          <div key={cat} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                            <span className="font-semibold text-white uppercase font-mono">{cat}</span>
                            <span className="text-sky-400 font-mono">[{d.signals.join(', ')}] · Score: +{d.score}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-400 font-mono italic">
                          No high-risk pattern rules matched (Suppressed by noise filter).
                        </div>
                      )}
                    </div>
                  </div>

                  {/* New Resulting Score */}
                  {result.newScore && (
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400 font-mono">Resulting CRI Score:</div>
                        <div className="text-2xl font-bold font-mono text-white">{result.newScore} / 100</div>
                      </div>
                      <Link
                        to={`/company/${selectedCompany === 'Goldman Sachs' ? 'GS' : (selectedCompany === 'JPMorgan Chase' ? 'JPM' : (selectedCompany === 'Wells Fargo' ? 'WFC' : (selectedCompany === 'Citigroup' ? 'C' : 'BAC')))}`}
                        className="clay-btn clay-btn-secondary text-xs py-2 px-3 text-decoration-none"
                      >
                        <span>View in Radar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-400 text-xs font-mono">
                  Select a scenario preset and click 'Simulate Real-Time Shock Impact' to view telemetry.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 text-center">
              Formula: CRI(t) = CRI(t-1)·(1-0.05) + 25.0·0.05 + ΔRisk
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

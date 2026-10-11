import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, ArrowRight, Zap, Building2, Sparkles } from 'lucide-react';

export const Pricing = () => {
  const tiers = [
    {
      name: 'Analyst Workstation',
      badge: 'Hackathon Access',
      price: '$0',
      period: 'Evaluation Tier',
      description: 'Full real-time surveillance cockpit for financial analysts and academic judges.',
      highlight: false,
      features: [
        'Live 5-Bank Surveillance Stream',
        'Continuous Real-Time SSE Updates',
        '120+ Regex NLP Classification Engine',
        'Local Bionic LLM Explainer Integration',
        'Interactive What-If Scenario Lab',
        'Standard Exportable Audit Reports',
      ],
      buttonText: 'Launch Free Evaluation',
      link: '/dashboard',
    },
    {
      name: 'Quantitative Desk',
      badge: 'Most Popular',
      price: '$2,400',
      period: 'per desk / month',
      description: 'Engineered for hedge funds, equity research desks, and risk arbitrage teams.',
      highlight: true,
      features: [
        'Everything in Analyst Workstation',
        'Unlimited S&P 500 Corporate Ingestion',
        'High-Throughput Sub-5ms WebSocket Feed',
        'Custom Risk Vector Weight Tuning',
        'Intraday Anomaly Webhooks (Slack, Email)',
        'Dedicated Local LLM Inference Cluster',
      ],
      buttonText: 'Deploy Quant Terminal',
      link: '/signup',
    },
    {
      name: 'RegTech Enterprise',
      badge: 'Sovereign Grade',
      price: '$8,500',
      period: 'per institution / month',
      description: 'Turnkey on-premise deployment for central banks, regulatory watchdogs, and tier-1 lenders.',
      highlight: false,
      features: [
        'Everything in Quantitative Desk',
        'Complete Air-Gapped Airgap Deployment',
        'SOC2 & GDPR Compliance Data Vault',
        'Custom Fine-Tuned Domain LLM Models',
        'Multi-Tenant Role Based Access Control',
        '24/7 Dedicated Quantitative SLA Support',
      ],
      buttonText: 'Contact RegTech Team',
      link: '/signup',
    },
  ];

  return (
    <div className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 font-mono">
          Institutional Deployment
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">
          Transparent RegTech Pricing
        </h1>
        <p className="text-base text-slate-400 mt-4 leading-relaxed">
          From individual quantitative risk researchers to global investment banking compliance desks.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`clay-card p-8 flex flex-col justify-between relative ${
              tier.highlight ? 'border-sky-500/50 shadow-[0_0_40px_rgba(56,189,248,0.2)]' : ''
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                {tier.badge}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white m-0">{tier.name}</h3>
                {!tier.highlight && (
                  <span className="text-xs text-slate-400 font-mono">{tier.badge}</span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">{tier.description}</p>

              <div className="mb-8 pb-6 border-b border-slate-700/60">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white font-mono">{tier.price}</span>
                  <span className="text-xs text-slate-400 font-mono">{tier.period}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
                  Capabilities Included:
                </div>
                {tier.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Link
                to={tier.link}
                className={`clay-btn w-full py-3 text-sm text-decoration-none ${
                  tier.highlight ? 'clay-btn-primary' : 'clay-btn-secondary'
                }`}
              >
                <span>{tier.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

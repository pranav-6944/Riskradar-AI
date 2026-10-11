import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Lock, Mail, ArrowRight, Eye, EyeOff, CheckCircle2, Sparkles } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setLocalError(res.error || 'Invalid credentials');
    }
  };

  const handleQuickDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setLocalError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 20%, #172554 0%, #070b14 70%)' }}>
      {/* Ambient background glow */}
      <div className="ambient-glow glow-cyan" style={{ width: 500, height: 500, top: '10%', left: '15%' }} />
      <div className="ambient-glow glow-indigo" style={{ width: 450, height: 450, bottom: '10%', right: '15%' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 text-decoration-none group">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', boxShadow: '0 8px 20px -3px rgba(56, 189, 248, 0.45), inset 2px 2px 4px rgba(255, 255, 255, 0.3)' }}>
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold tracking-tight text-white block">RiskRadar<span className="text-sky-400">.AI</span></span>
              <span className="text-xs text-slate-400 tracking-wider uppercase font-semibold">RegTech Surveillance</span>
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-white mt-6">Analyst Gateway</h2>
          <p className="text-sm text-slate-400 mt-1">Authenticate to access live corporate risk intelligence</p>
        </div>

        {/* Claymorphic Login Card */}
        <div className="clay-card p-8 relative">
          {localError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-sm flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{localError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Institutional Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@riskradar.io"
                  className="clay-input pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Security Key / Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="clay-input pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="clay-btn clay-btn-primary w-full py-3.5 mt-2"
            >
              {loading ? (
                <span>Validating Signature...</span>
              ) : (
                <>
                  <span>Enter Risk Cockpit</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fill for Hackathon Judges */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Judge Quick-Access Credentials</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('analyst@riskradar.io', 'password123')}
                className="clay-btn clay-btn-secondary text-xs py-2 px-3 text-left justify-start"
              >
                <div>
                  <div className="font-semibold text-sky-300">Lead Analyst</div>
                  <div className="text-[10px] text-slate-400">analyst@riskradar.io</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin@riskradar.io', 'admin123')}
                className="clay-btn clay-btn-secondary text-xs py-2 px-3 text-left justify-start"
              >
                <div>
                  <div className="font-semibold text-indigo-300">Compliance Admin</div>
                  <div className="text-[10px] text-slate-400">admin@riskradar.io</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Don't have an analyst account?{' '}
          <Link to="/signup" className="text-sky-400 hover:text-sky-300 font-semibold text-decoration-none">
            Request Institutional Access
          </Link>
        </p>
      </div>
    </div>
  );
};

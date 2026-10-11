import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Lock, Mail, ArrowRight, Eye, EyeOff, CheckCircle2, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const { login, loading } = useAuth();
  const { isDark } = useTheme();
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
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden bg-[var(--bg-deep)] transition-colors duration-300">
      {/* Ambient background glow */}
      <div 
        className="ambient-glow glow-cyan" 
        style={{ width: 500, height: 500, top: '10%', left: '15%', opacity: isDark ? 0.35 : 0.12 }} 
      />
      <div 
        className="ambient-glow glow-indigo" 
        style={{ width: 450, height: 450, bottom: '10%', right: '15%', opacity: isDark ? 0.3 : 0.1 }} 
      />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 text-decoration-none group">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative shadow-lg" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' }}>
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 block font-heading">RiskRadar<span className="text-sky-400 dark:text-sky-400 light:text-sky-600">.AI</span></span>
              <span className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 tracking-wider uppercase font-semibold">RegTech Surveillance</span>
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-white dark:text-white light:text-slate-900 mt-6 font-heading">Analyst Gateway</h2>
          <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1">Authenticate to access live corporate risk intelligence</p>
        </div>

        {/* Claymorphic Login Card */}
        <div className="clay-card p-8 relative shadow-xl">
          {localError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{localError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2">Institutional Email</label>
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2">Security Key / Password</label>
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
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
          <div className="mt-8 pt-6 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 dark:text-sky-400 light:text-sky-600" />
              <span>Judge Quick-Access Credentials</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('analyst@riskradar.io', 'password123')}
                className="clay-btn clay-btn-secondary text-xs py-2 px-3 text-left justify-start"
              >
                <div>
                  <div className="font-semibold text-sky-400 dark:text-sky-400 light:text-sky-600">Lead Analyst</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">analyst@riskradar.io</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin@riskradar.io', 'admin123')}
                className="clay-btn clay-btn-secondary text-xs py-2 px-3 text-left justify-start"
              >
                <div>
                  <div className="font-semibold text-indigo-400 dark:text-indigo-400 light:text-indigo-600">Compliance Admin</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">admin@riskradar.io</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-6">
          Don't have an analyst account?{' '}
          <Link to="/signup" className="text-sky-400 dark:text-sky-400 light:text-sky-600 hover:underline font-semibold text-decoration-none">
            Request Institutional Access
          </Link>
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Lock, Mail, User, Building, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [role, setRole] = useState('ROLE_ANALYST');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const { isDark } = useTheme();
  
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!fullName || !email || !password) {
      setLocalError('Please complete all required fields.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    const res = await signup({
      fullName,
      email,
      password,
      role,
      institution: institution || 'Quantitative Risk Labs',
    });

    if (res.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setLocalError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden bg-[var(--bg-deep)] transition-colors duration-300">
      {/* Ambient background glow */}
      <div 
        className="ambient-glow glow-indigo" 
        style={{ width: 500, height: 500, top: '5%', right: '15%', opacity: isDark ? 0.3 : 0.1 }} 
      />
      <div 
        className="ambient-glow glow-cyan" 
        style={{ width: 450, height: 450, bottom: '10%', left: '15%', opacity: isDark ? 0.35 : 0.12 }} 
      />

      <div className="w-full max-w-lg relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 text-decoration-none">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative shadow-lg" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)' }}>
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 block font-heading">RiskRadar<span className="text-indigo-400 dark:text-indigo-400 light:text-indigo-600">.AI</span></span>
              <span className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 tracking-wider uppercase font-semibold">Institutional Onboarding</span>
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-white dark:text-white light:text-slate-900 mt-6 font-heading">Create Analyst Account</h2>
          <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1">Deploy real-time automated risk surveillance for your firm</p>
        </div>

        {/* Claymorphic Signup Card */}
        <div className="clay-card p-8 relative shadow-xl">
          {localError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{localError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Pranav Lamkhade"
                  className="clay-input pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">Work Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pranav@institution.com"
                  className="clay-input pl-12"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">Institution / Fund</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. MITAOE Labs"
                    className="clay-input pl-10 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">Analyst Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="clay-input text-sm cursor-pointer"
                >
                  <option value="ROLE_ANALYST">Risk Analyst</option>
                  <option value="ROLE_COMPLIANCE">Compliance Officer</option>
                  <option value="ROLE_ADMIN">Risk Director (Admin)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">Security Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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
              className="clay-btn clay-btn-primary w-full py-3.5 mt-3"
            >
              {loading ? (
                <span>Generating Digital Identity...</span>
              ) : (
                <>
                  <span>Initialize Analyst Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-6">
          Already have credentials?{' '}
          <Link to="/login" className="text-indigo-400 dark:text-indigo-400 light:text-indigo-600 hover:underline font-semibold text-decoration-none">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
};

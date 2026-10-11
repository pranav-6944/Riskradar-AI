import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Activity, LogOut, User, BarChart3, Newspaper, Cpu, Layers } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 px-4 lg:px-8 py-3.5 backdrop-blur-xl border-b border-slate-800/80 bg-slate-950/70">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 text-decoration-none group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)', boxShadow: '0 4px 15px -2px rgba(14, 165, 233, 0.45), inset 2px 2px 3px rgba(255, 255, 255, 0.3)' }}>
            <ShieldAlert className="w-5 h-5 text-white" />
            <div className="absolute inset-0 border border-white/20 rounded-xl" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              RiskRadar<span className="text-sky-400 font-extrabold">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block -mt-0.5">
              Automated RegTech
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all text-decoration-none ${
              isActive('/') ? 'text-white bg-slate-800/80 shadow-inner' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            Overview
          </Link>
          <Link
            to="/features"
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all text-decoration-none ${
              isActive('/features') ? 'text-white bg-slate-800/80 shadow-inner' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            Engine Features
          </Link>
          <Link
            to="/dashboard"
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all text-decoration-none flex items-center gap-1.5 ${
              isActive('/dashboard') ? 'text-sky-400 bg-sky-950/40 border border-sky-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-sky-400" />
            <span>Risk Cockpit</span>
          </Link>
          <Link
            to="/news-hub"
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all text-decoration-none flex items-center gap-1.5 ${
              isActive('/news-hub') ? 'text-indigo-400 bg-indigo-950/40 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Newspaper className="w-4 h-4 text-indigo-400" />
            <span>News Stream</span>
          </Link>
          <Link
            to="/simulator"
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all text-decoration-none flex items-center gap-1.5 ${
              isActive('/simulator') ? 'text-purple-400 bg-purple-950/40 border border-purple-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>Scenario Lab</span>
          </Link>
          <Link
            to="/pricing"
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all text-decoration-none ${
              isActive('/pricing') ? 'text-white bg-slate-800/80 shadow-inner' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            Pricing
          </Link>
        </nav>

        {/* Right Section: Status Pill & Auth Actions */}
        <div className="flex items-center gap-3">
          {/* Live Surveillance Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono font-medium text-emerald-400 tracking-wider uppercase">
              Surveillance Live
            </span>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-white">{user?.fullName}</span>
                <span className="text-[10px] text-slate-400 font-mono">{user?.institution || 'Risk Analyst'}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="clay-btn clay-btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="clay-btn clay-btn-secondary py-1.5 px-3.5 text-xs text-decoration-none"
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                className="clay-btn clay-btn-primary py-1.5 px-4 text-xs text-decoration-none flex items-center gap-1.5"
              >
                <span>Launch Radar</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  ShieldAlert, Sun, Moon, LogOut, Menu, X, 
  Activity, ArrowUpRight, User, Terminal
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Overview', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Cockpit', path: '/dashboard' },
    { name: 'News Stream', path: '/news-hub' },
    { name: 'Scenario Lab', path: '/simulator' },
    { name: 'Pricing', path: '/pricing' },
  ];

  // Helper to extract initials
  const getInitials = (name) => {
    if (!name) return 'RA';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300 backdrop-blur-xl border-b border-slate-800/70 dark:border-slate-800/70 light:border-slate-200/80 bg-[#050811]/85 dark:bg-[#050811]/85 light:bg-white/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* ─── 1. Brand Logo ────────────────────────────────────────────── */}
        <Link to="/" className="flex items-center gap-3 group text-decoration-none shrink-0">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center relative shadow-lg transition-transform duration-200 group-hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
              boxShadow: isDark 
                ? '0 0 20px -3px rgba(14, 165, 233, 0.5), inset 1px 1px 2px rgba(255, 255, 255, 0.4)' 
                : '0 4px 12px rgba(14, 165, 233, 0.35), inset 1px 1px 2px rgba(255, 255, 255, 0.6)'
            }}
          >
            <ShieldAlert className="w-5 h-5 text-white" />
            <div className="absolute inset-0 border border-white/25 rounded-xl pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white dark:text-white light:text-slate-900 font-heading">
                RiskRadar
              </span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-sky-500/20 text-sky-400 dark:text-sky-400 light:text-sky-600 border border-sky-500/30 font-mono tracking-wider">
                AI
              </span>
            </div>
            <span className="text-[9px] text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase tracking-widest font-semibold block -mt-0.5">
              RegTech Intelligence
            </span>
          </div>
        </Link>

        {/* ─── 2. Segmented Navigation Dock (Desktop) ───────────────────── */}
        <nav className="hidden lg:flex items-center p-1 rounded-2xl bg-slate-900/70 dark:bg-slate-900/70 light:bg-slate-100 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80 shadow-inner">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all text-decoration-none ${
                  active
                    ? isDark
                      ? 'text-sky-400 bg-slate-800/90 shadow-sm border border-slate-700/60 font-semibold'
                      : 'text-sky-600 bg-white shadow-sm border border-slate-200 font-semibold'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800/30 dark:hover:bg-slate-800/30 light:hover:bg-slate-200/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* ─── 3. Utility, Theme & Auth Controls (Right) ────────────────── */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Live Surveillance Indicator */}
          <div 
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 text-[11px] font-mono font-medium shadow-sm"
            title="Real-time Server-Sent Events SSE stream active"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wider uppercase text-[10px]">LIVE</span>
          </div>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark and Light Mode"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-sky-400 hover:border-sky-500/40 shadow-sm"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
            ) : (
              <Moon className="w-4 h-4 text-sky-600 transition-transform duration-300 rotate-0 hover:-rotate-12" />
            )}
          </button>

          {/* User Auth Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 sm:gap-2.5 pl-1 sm:pl-2 border-l border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
              {/* User Avatar Chip */}
              <div 
                className="flex items-center gap-2 py-1 px-2 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800/70 dark:border-slate-800/70 light:border-slate-200"
                title={`${user?.fullName || 'Analyst'} (${user?.institution || 'Institution'})`}
              >
                <div 
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-inner"
                  style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
                >
                  {getInitials(user?.fullName)}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-white dark:text-white light:text-slate-900 leading-tight">
                    {user?.fullName?.split(' ')[0] || 'Analyst'}
                  </span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-400 light:text-slate-500 leading-tight">
                    {user?.institution?.split(' ')[0] || 'RegTech'}
                  </span>
                </div>
              </div>

              {/* Sign Out Action Button */}
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-rose-400 hover:text-white hover:bg-rose-600 hover:border-rose-500 shadow-sm"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors text-decoration-none"
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                className="clay-btn clay-btn-primary py-1.5 px-3.5 text-xs text-decoration-none flex items-center gap-1 shadow-sm"
              >
                <span>Launch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ─── 4. Mobile Navigation Drawer ──────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-[#050811]/95 dark:bg-[#050811]/95 light:bg-white/95 backdrop-blur-2xl transition-all">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors text-decoration-none ${
                    active
                      ? isDark
                        ? 'text-sky-400 bg-slate-800/90 font-semibold'
                        : 'text-sky-600 bg-slate-100 font-semibold'
                      : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800/40'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

/**
 * RiskRadar API & AI Service Configuration
 * 
 * In local dev / Docker: Uses relative paths ('/api/v1', '/ai-api') proxied via Vite/Nginx.
 * In production (Vercel / Cloud): Can be pointed directly to the deployed cloud backend URLs
 * via VITE_API_URL and VITE_AI_URL environment variables with full CORS support.
 */

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const AI_BASE = (import.meta.env.VITE_AI_URL || '').replace(/\/+$/, '');

export const API_ENDPOINTS = {
  // Spring Boot API Service
  companies: `${API_BASE}/api/v1/companies`,
  company: (ticker) => `${API_BASE}/api/v1/companies/${ticker}`,
  explanation: (ticker) => `${API_BASE}/api/v1/companies/${ticker}/explanation`,
  news: `${API_BASE}/api/v1/news`,
  stream: `${API_BASE}/api/v1/stream`,
  login: `${API_BASE}/api/v1/auth/login`,
  signup: `${API_BASE}/api/v1/auth/signup`,

  // Python AI Service
  aiAnalyze: `${AI_BASE ? `${AI_BASE}/analyze` : '/ai-api/analyze'}`,
  aiIngest: `${AI_BASE ? `${AI_BASE}/ingest` : '/ai-api/ingest'}`,
  aiExplainJson: (ticker) => `${AI_BASE ? `${AI_BASE}/explain-json/${ticker}` : `/ai-api/explain-json/${ticker}`}`,
  finnhubSync: (ticker) => `${AI_BASE ? `${AI_BASE}/api/v1/finnhub/sync/${ticker}` : `/ai-api/api/v1/finnhub/sync/${ticker}`}`,
  finnhubSyncAll: `${AI_BASE ? `${AI_BASE}/api/v1/finnhub/sync-all` : '/ai-api/api/v1/finnhub/sync-all'}`,
};

export default API_ENDPOINTS;

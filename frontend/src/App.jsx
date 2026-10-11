import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { CompanyDetail } from './pages/CompanyDetail';
import { NewsHub } from './pages/NewsHub';
import { ScenarioSimulator } from './pages/ScenarioSimulator';
import { Reports } from './pages/Reports';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Marketing & Authentication */}
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Analyst Surveillance Cockpit & Tools */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/company/:ticker" element={<CompanyDetail />} />
              <Route path="/news-hub" element={<NewsHub />} />
              <Route path="/simulator" element={<ScenarioSimulator />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

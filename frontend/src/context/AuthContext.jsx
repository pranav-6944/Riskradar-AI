import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('riskradar_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('riskradar_token') || null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync token into localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('riskradar_token', token);
    } else {
      localStorage.removeItem('riskradar_token');
    }
  }, [token]);

  // Sync user into localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('riskradar_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('riskradar_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      setToken(data.token);
      setUser({
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        institution: data.institution,
      });
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ fullName, email, password, role, institution }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_ENDPOINTS.signup, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, role, institution }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setToken(data.token);
      setUser({
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        institution: data.institution,
      });
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('riskradar_token');
    localStorage.removeItem('riskradar_user');
  };

  const authFetch = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return fetch(url, { ...options, headers });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        error,
        login,
        signup,
        logout,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

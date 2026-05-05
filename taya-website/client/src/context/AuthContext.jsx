import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.get('/auth/check-auth');
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Failed to check user', error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    setUser(null);
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Failed to logout user', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

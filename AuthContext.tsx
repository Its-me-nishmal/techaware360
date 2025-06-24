
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { AuthenticatedUser, AuthContextType, GoogleUser } from './types';
import *  as api from './mockApi'; // Using namespaced import

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = 'techAwareAuthToken';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const clearAuthState = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    setToken(storedToken);

    if (storedToken) {
      const response = await api.validateSession(storedToken);
      if (response.isAuthenticated && response.user) {
        setIsAuthenticated(true);
        setUser(response.user);
        setToken(storedToken); // Ensure token state is aligned
      } else {
        clearAuthState();
      }
    } else {
      clearAuthState();
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (googleAuthData: GoogleUser, referralCode?: string | null): Promise<{ success: boolean; needsPayment?: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      const response = await api.loginOrRegisterUser(googleAuthData, referralCode);
      if (response.success) {
        if (response.token && response.user && response.user.paymentComplete) { // Full success, token issued, payment complete
          localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
          setToken(response.token);
          setUser(response.user);
          setIsAuthenticated(true);
          setIsLoading(false);
          return { success: true, message: response.message };
        } else if (response.needsPayment && response.user) { // User identified, but needs payment
          setUser(response.user);
          setIsAuthenticated(true); // User is known/identified
          setToken(null); // Explicitly no full-access token for this state
          localStorage.removeItem(TOKEN_STORAGE_KEY); // Remove any existing token
          setIsLoading(false);
          return { success: true, needsPayment: true, message: response.message };
        }
      }
      // If login fails or response is malformed
      clearAuthState();
      setIsLoading(false);
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      console.error("Login error:", error);
      clearAuthState();
      setIsLoading(false);
      return { success: false, message: 'An unexpected error occurred during login.' };
    }
  };

  const logout = useCallback(async () => {
    setIsLoading(true);
    await api.logoutUser(token); // Simulate backend logout if needed
    clearAuthState();
    // Redirect happens in Header or component using logout
    setIsLoading(false);
  }, [token]);

  const updateUserPaymentStatus = async (email: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      const response = await api.confirmPaymentAndUpdateSession(email);
      if (response.success && response.token && response.user) {
        localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
        setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true); // Now fully authenticated with payment
        setIsLoading(false);
        return { success: true, message: response.message };
      }
      setIsLoading(false);
      return { success: false, message: response.message || 'Failed to update payment status.' };
    } catch (error) {
      console.error("Payment status update error:", error);
      setIsLoading(false);
      return { success: false, message: 'An unexpected error occurred while updating payment status.' };
    }
  };
  

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, user, token, login, logout, checkAuthStatus, updateUserPaymentStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

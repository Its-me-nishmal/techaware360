import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { AuthenticatedUser, AuthContextType } from './types';
import *  as api from './api'; // Using namespaced import for the new api module

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = 'techAwareAuthToken';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const clearAuthState = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }, []);

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (storedToken) {
      try {
        const response = await api.validateSession(storedToken);
        if (response.user) {
          setIsAuthenticated(true);
          setUser(response.user);
          setToken(storedToken);
        } else {
          clearAuthState();
        }
      } catch (error) {
        console.error("Session validation failed:", error);
        clearAuthState();
      }
    } else {
      clearAuthState();
    }
    setIsLoading(false);
  }, [clearAuthState]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (idToken: string, referralCode?: string | null): Promise<{ success: boolean; needsPayment?: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      const response = await api.googleSignIn(idToken, referralCode);
      if (response.success && response.token && response.user) {
        // Backend provides a token regardless of payment status.
        // The token itself contains the 'paymentComplete' status.
        localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
        setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        setIsLoading(false);
        return { success: true, needsPayment: response.needsPayment, message: response.message };
      }
      
      clearAuthState();
      setIsLoading(false);
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      console.error("Login error:", error);
      clearAuthState();
      setIsLoading(false);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during login.';
      return { success: false, message: errorMessage };
    }
  };

  const logout = useCallback(async () => {
    setIsLoading(true);
    // For stateless JWT, we just need to clear the client-side token.
    // An optional backend call could be made here to blacklist the token if needed.
    clearAuthState();
    setIsLoading(false);
  }, [clearAuthState]);

  const updateUserPaymentStatus = async (): Promise<{ success: boolean; message?: string }> => {
    const currentToken = token || localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!currentToken) {
        return { success: false, message: 'Authentication token not found.' };
    }
    
    setIsLoading(true);
    try {
      // Backend uses the token to identify the user and check their payment status.
      const response = await api.checkPaymentStatus(currentToken);
      if (response.success && response.token && response.user) {
        // On success, backend returns an updated token with paymentComplete=true
        localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
        setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true); // User is fully authenticated
        setIsLoading(false);
        return { success: true, message: response.message };
      }
      setIsLoading(false);
      return { success: false, message: response.message || 'Failed to update payment status.' };
    } catch (error) {
      console.error("Payment status update error:", error);
      setIsLoading(false);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while updating payment status.';
      return { success: false, message: errorMessage };
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
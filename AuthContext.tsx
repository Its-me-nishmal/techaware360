import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback, useMemo } from 'react'; // Added useMemo
import { AuthenticatedUser, AuthContextType } from './types';
import *  as api from './api';

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

  const login = useCallback(async (idToken: string, referralCode?: string | null): Promise<{ success: boolean; needsPayment?: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      console.log(referralCode)
      const response = await api.googleSignIn(idToken, referralCode);
      console.log(response,'newww');
      if (response.success && response.token && response.user) {
        localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
        setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, needsPayment: response.needsPayment, message: response.message };
      }
      clearAuthState();
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      console.error("Login error:", error);
      clearAuthState();
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during login.';
      return { success: false, message: errorMessage };
    } finally { // Ensure isLoading is set to false regardless of success/failure
        setIsLoading(false);
    }
  }, [clearAuthState]);

  const logout = useCallback(async () => {
    setIsLoading(true); // Indicate loading while logging out
    clearAuthState();
    setIsLoading(false); // Finished logging out
    localStorage.removeItem('techAwareAuthToken')
  }, [clearAuthState]);

  const updateUserPaymentStatus = useCallback(async (): Promise<{ success: boolean; message?: string }> => {
    const currentToken = token || localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!currentToken) {
        return { success: false, message: 'Authentication token not found.' };
    }

    setIsLoading(true); // Indicate global loading (though PaymentApprovalPage has its own too)
    try {
      const response = await api.checkPaymentStatus(currentToken);
      if (response.success && response.token && response.user) {
        localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
        setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, message: response.message };
      }
      console.log(response.message);
      return { success: false, message: response.message || 'Failed to update payment status.' };
    } catch (error) {
      console.error("Payment status update error:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while updating payment status.';
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false); // Finished loading
    }
  }, [token, setUser, setIsAuthenticated]); // Added setUser, setIsAuthenticated to deps for useCallback stability

  // Use useMemo to prevent the context value object from changing on every render,
  // which can cause unnecessary re-renders in consuming components.
  const contextValue = useMemo(() => ({
    isLoading,
    isAuthenticated,
    user,
    token,
    login,
    logout,
    checkAuthStatus,
    updateUserPaymentStatus,
  }), [isLoading, isAuthenticated, user, token, login, logout, checkAuthStatus, updateUserPaymentStatus]);

  return (
    <AuthContext.Provider value={contextValue}>
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
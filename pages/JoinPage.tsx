import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { Language } from '../types';
import { useAuth } from '../AuthContext';
import { Gift, Loader2 } from 'lucide-react';

// This would ideally be in a .env file, but for this exercise, we place it here.
// The user should replace this with their actual Google Client ID.
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";


const JoinPage = () => {
  const { translate, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState('');
  const [effectiveReferralCode, setEffectiveReferralCode] = useState<string | null>(null);
  const signInButtonRef = useRef<HTMLDivElement>(null);
  
  // This effect handles page redirection based on authentication status.
  useEffect(() => {
    // If already logged in and paid, go to course
    if (auth.isAuthenticated && auth.user?.paymentComplete) {
      navigate('/course', { replace: true });
    } 
    // If logged in but payment pending, go to payment page
    else if (auth.isAuthenticated && auth.user && !auth.user.paymentComplete) {
      navigate('/payment-approval', { replace: true });
    }
  }, [auth.isAuthenticated, auth.user, navigate]);

  // This effect retrieves any referral code from URL or local storage.
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const refFromQuery = queryParams.get('ref');
    const refFromStorage = localStorage.getItem('referralCode');

    if (refFromQuery) {
      setEffectiveReferralCode(refFromQuery);
      localStorage.setItem('referralCode', refFromQuery);
    } else if (refFromStorage) {
      setEffectiveReferralCode(refFromStorage);
    }
  }, [location.search]);
  
  const handleGoogleSignInCallback = async (response: any) => {
    setIsSigningIn(true);
    setError('');
    
    const idToken = response.credential;
    if (!idToken) {
      setError(translate('unexpectedError', 'Google sign in failed to provide credentials.'));
      setIsSigningIn(false);
      return;
    }

    try {
      const result = await auth.login(idToken, effectiveReferralCode);

      if (result.success) {
        // The redirection is now handled by the useEffect hook that watches auth state.
        // This keeps the logic clean and centralized.
      } else {
        setError(result.message || translate('loginFailedError'));
      }
    } catch (err: any) {
      console.error("Login process error:", err);
      setError(err.message || translate('unexpectedError'));
    }
    // We don't set isSigningIn to false here because a successful login will trigger a re-render and navigation.
    // If login fails, we want the error message to be visible.
    setIsSigningIn(false);
  };
  
  // This effect initializes and renders the Google Sign-In button.
  useEffect(() => {
    if (window.google?.accounts?.id && signInButtonRef.current) {
        try {
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleSignInCallback,
            });
            window.google.accounts.id.renderButton(
                signInButtonRef.current,
                { theme: 'outline', size: 'large', type: 'standard', text: 'continue_with', width: '320' }
            );
        } catch (error) {
            console.error("Error initializing Google Sign-In", error);
            setError("Could not initialize Google Sign-In. Please try again later.");
        }
    }
  }, [handleGoogleSignInCallback]); // Dependency ensures callback has latest state

  // Show a global loader if the initial auth check is in progress.
  if (auth.isLoading && !auth.isAuthenticated) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-12 w-12 text-primary" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">{translate('joinTitle')}</h1>

      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6 text-center">{translate('signInToJoin')}</h2>
        
        {effectiveReferralCode && (
          <div className="mb-6 p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md text-center">
            <Gift size={20} className="inline mr-2 text-green-600 dark:text-green-400" />
            <span className="text-sm text-green-700 dark:text-green-200">
              {translate('referralCodeActive')}: <strong>{effectiveReferralCode}</strong>
            </span>
          </div>
        )}
        
        {isSigningIn ? (
            <div className="flex justify-center items-center h-[50px]">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        ) : (
             <div ref={signInButtonRef} className="flex justify-center"></div>
        )}

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

        <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{translate('priceInfo')}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">{translate('paymentAfterGoogleSignIn')}</p>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
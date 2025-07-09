import React, { useState, useEffect, useRef, useCallback } from 'react'; // Added useCallback, though not strictly necessary here, good practice
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';
// import { Language } from '../types'; // Not used in component logic
import { useAuth } from '../AuthContext';
import { Gift, Loader2 } from 'lucide-react';

const GOOGLE_CLIENT_ID = "931657617887-gl0lil2r8higdu88qj7hm4erq210e2al.apps.googleusercontent.com";

const JoinPage = () => {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState('');
  const [effectiveReferralCode, setEffectiveReferralCode] = useState<string | null>(null);

  // useRef to hold the Google Sign-In button container
  const signInButtonRef = useRef<HTMLDivElement>(null);

  // NEW: useRef to store the latest effectiveReferralCode
  const effectiveReferralCodeRef = useRef<string | null>(null);

  // Effect to keep the ref updated with the latest state value
  useEffect(() => {
    effectiveReferralCodeRef.current = effectiveReferralCode;
    console.log("👉 effectiveReferralCodeRef updated to:", effectiveReferralCodeRef.current);
  }, [effectiveReferralCode]); // This dependency is crucial

  // 🔍 Debug redirect logic (Existing, kept for context)
  useEffect(() => {
    console.log("🔁 Checking auth state...", auth.isAuthenticated, auth.user);
    if (auth.isLoading) {
      console.log("Auth is loading, waiting...");
      return;
    }
    if (auth.isAuthenticated && auth.user?.paymentComplete) {
      console.log("✅ User authenticated and payment complete. Redirecting to /course");
      navigate('/course', { replace: true });
    } else if (auth.isAuthenticated && auth.user && !auth.user.paymentComplete) {
      console.log("⚠️ User authenticated, payment pending. Redirecting to /payment-approval");
      navigate('/payment-approval', { replace: true });
    }
  }, [auth.isAuthenticated, auth.user, navigate, auth.isLoading]);

  // Effect to parse URL for referral code (Your existing logic with improved logs)
  useEffect(() => {
    console.log("🔍 Running referral code parsing effect...");
    const fullUrl = window.location.href;
    const queryParams = new URLSearchParams(fullUrl.split('?')[1]?.split('#')[0]);
    const refFromQuery = queryParams.get('ref');
    const refFromStorage = localStorage.getItem('referralCode');

    console.log(`  Full URL: ${fullUrl}`);
    console.log(`  'ref' from query parameters: ${refFromQuery}`);
    console.log(`  'referralCode' from localStorage: ${refFromStorage}`);

    if (refFromQuery) {
      console.log(`  Setting effective referral code from URL query: ${refFromQuery}`);
      setEffectiveReferralCode(refFromQuery);
      localStorage.setItem('referralCode', refFromQuery);
    } else if (refFromStorage) {
      console.log(`  Setting effective referral code from localStorage: ${refFromStorage}`);
      setEffectiveReferralCode(refFromStorage);
    } else {
      console.log("  No referral code found in URL or storage. Effective code remains null.");
      setEffectiveReferralCode(null); // Explicitly ensure null if nothing found
    }
  }, []); // Empty dependency array, runs once on mount

  // handleGoogleSignInCallback as a useCallback to avoid re-creation unless dependencies change
  // (though in this context, it's used once, so less critical, but good practice)
  const handleGoogleSignInCallback = useCallback(async (response: any) => {
    setIsSigningIn(true);
    setError('');

    const idToken = response.credential;
    if (!idToken) {
      setError(translate('unexpectedError', 'Google sign in failed to provide credentials.'));
      setIsSigningIn(false);
      return;
    }

    try {
      // Use the value from the ref, which is guaranteed to be the latest
      const currentReferralCode = effectiveReferralCodeRef.current;
      console.log('🚀 Attempting auth.login with ID Token and effective referral code:', currentReferralCode);

      const result = await auth.login(idToken, currentReferralCode);
      console.log('Auth login result:', result);

      if (result.success) {
        console.log("✅ Login success:", result.user);
        // The main redirect logic is in the first useEffect, but this is a good fallback
        if (result.user.paymentComplete) {
          navigate('/course', { replace: true });
        } else {
          navigate('/payment-approval', { replace: true });
        }
      } else {
        console.error("Login failed:", result.message);
        setError(result.message || translate('loginFailedError'));
      }
    } catch (err: any) {
      console.error("Login process error:", err);
      setError(err.message || translate('unexpectedError'));
    } finally {
      setIsSigningIn(false);
    }
  }, [auth, navigate, translate]); // Dependencies: auth context, navigate function, translate function

  // Effect to initialize Google Sign-In button (Your existing logic)
  useEffect(() => {
    console.log("🔧 Initializing Google Sign-In button...");
    if (window.google?.accounts?.id && signInButtonRef.current) {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleSignInCallback, // Pass the memoized callback
        });
        window.google.accounts.id.renderButton(
          signInButtonRef.current,
          {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            text: 'continue_with',
            width: '320',
          }
        );
        console.log("✨ Google Sign-In button rendered successfully.");
      } catch (error) {
        console.error("❌ Error initializing Google Sign-In:", error);
        setError("Could not initialize Google Sign-In. Please try again later.");
      }
    } else {
      console.log("⚠️ Google API not ready or signInButtonRef not available yet.");
    }
  }, [handleGoogleSignInCallback]); // Dependency on handleGoogleSignInCallback to re-initialize if it changes (due to useCallback)

  if (auth.isLoading && !auth.isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">{translate('joinTitle')}</h1>

      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6 text-center">{translate('signInToJoin')}</h2>

        {/* Displaying effectiveReferralCode from state in JSX */}
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
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { GoogleUser, Language } from '../types';
import { useAuth } from '../AuthContext'; // Import useAuth
import { Gift, LogIn, Loader2 } from 'lucide-react';

const JoinPage = () => {
  const { translate, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth(); // Use Auth context

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [effectiveReferralCode, setEffectiveReferralCode] = useState<string | null>(null);

  useEffect(() => {
    // If user is already authenticated and payment is complete, redirect to course
    if (auth.isAuthenticated && auth.user?.paymentComplete) {
      navigate('/course', { replace: true });
    }
    // If user is authenticated but payment not complete, redirect to payment approval
    else if (auth.isAuthenticated && auth.user && !auth.user.paymentComplete) {
      navigate('/payment-approval', { 
        replace: true, 
        state: { email: auth.user.email, name: auth.user.name, profilePicUrl: auth.user.profilePicUrl }
      });
    }
  }, [auth.isAuthenticated, auth.user, navigate]);


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

  const handleMockGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    const mockGoogleUser: GoogleUser = {
      googleId: `mockGoogleId_${Date.now()}`,
      email: 'user.mock@example.com',
      name: 'Mock User',
      profilePicUrl: `https://avatar.iran.liara.run/username?username=${'Mock User'.replace(' ', '+')}`,
    };

    try {
      const response = await auth.login(mockGoogleUser, effectiveReferralCode);
      setIsLoading(false);

      if (response.success) {
        if (response.needsPayment) {
          navigate('/payment-approval', { 
            state: { 
              email: mockGoogleUser.email, 
              name: mockGoogleUser.name,
              profilePicUrl: mockGoogleUser.profilePicUrl 
            } 
          });
        } else {
          // Successful login and payment complete (or not needed)
          const from = location.state?.from?.pathname || '/course';
          navigate(from, { replace: true });
        }
      } else {
        setError(response.message || (language === Language.EN ? 'Login failed. Please try again.' : 'ലോഗിൻ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.'));
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Login process error:", err);
      setError(language === Language.EN ? 'An unexpected error occurred.' : 'അപ്രതീക്ഷിതമായ ഒരു പിശക് സംഭവിച്ചു.');
    }
  };
  
  // If auth is loading, show a simple spinner
  if (auth.isLoading) {
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
        
        <button
          onClick={handleMockGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin mr-2" />
          ) : (
            <svg className="mr-2 -ml-1 w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
          )}
          {translate('signInWithGoogleButton')}
        </button>

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
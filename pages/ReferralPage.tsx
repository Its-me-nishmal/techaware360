
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { Gift } from 'lucide-react';

const ReferralPage = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { translate } = useLanguage();

  useEffect(() => {
    if (code) {
      localStorage.setItem('referralCode', code);
      // Redirect to join page after a short delay to show message
      const timer = setTimeout(() => {
        navigate('/join');
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // No code, redirect immediately
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, navigate]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Gift size={64} className="mx-auto text-primary dark:text-secondary mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {translate('referralCodeApplied', 'Referral Code Applied!')}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        {translate('referralCodeSaved', 'Your referral code')} <strong>{code}</strong> {translate('hasBeenSaved', 'has been saved.')}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        {translate('redirectingToJoin', 'You will be redirected to the join page shortly...')}
      </p>
    </div>
  );
};

export default ReferralPage;

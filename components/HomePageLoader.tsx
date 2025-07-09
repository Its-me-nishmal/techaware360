import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n';

const HomePageLoader = () => {
  const { translate } = useLanguage();
  return (
    <div className="homepage-loader-backdrop animate-fadeIn">
      <div className="text-center">
        <ShieldCheck size={80} className="mx-auto text-primary dark:text-secondary animate-pulseLogo" />
        <p className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
          {translate('loadingHomePage', 'Loading TechAware360...')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {translate('oneMomentPlease', 'One moment, getting things ready for you!')}
        </p>
      </div>
    </div>
  );
};

export default HomePageLoader;

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { Rocket, ShieldCheck } from 'lucide-react';

const HomePage = () => {
  const { translate } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 text-center">
      <div className="max-w-3xl mx-auto">
        <ShieldCheck size={80} className="mx-auto text-primary dark:text-secondary mb-6" />
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-6">
          {translate('homeWelcomeTitle')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {translate('homePitchLine1')}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {translate('homePitchLine2')}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {translate('homePitchLine3')}
        </p>
        <Link
          to="/join"
          className="inline-flex items-center justify-center bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
        >
          <Rocket size={20} className="mr-2" />
          {translate('joinNowButton')}
        </Link>
      </div>
      <div className="mt-16">
        <img 
          src="https://picsum.photos/800/400?random=1" 
          alt="Abstract technology visual" 
          className="rounded-lg shadow-xl mx-auto" 
        />
      </div>
    </div>
  );
};

export default HomePage;

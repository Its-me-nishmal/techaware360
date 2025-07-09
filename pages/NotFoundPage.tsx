
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  const { translate } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <AlertTriangle size={64} className="mx-auto text-red-500 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        404 - {translate('pageNotFound')}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        {translate('pageNotFoundMessage', "Sorry, the page you are looking for doesn't exist or has been moved.")}
      </p>
      <Link
        to="/"
        className="inline-block bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-md hover:shadow-lg transition-colors"
      >
        {translate('goToHome', 'Go to Homepage')}
      </Link>
    </div>
  );
};

export default NotFoundPage;

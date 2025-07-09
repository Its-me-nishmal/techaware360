
import React from 'react';
import { useLanguage } from '../i18n';

const Footer = () => {
  const { translate } = useLanguage();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center py-6 mt-auto">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {translate('footerCopyright')}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {translate('footerMadeWithLove')}
      </p>
    </footer>
  );
};

export default Footer;

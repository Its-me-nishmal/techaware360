
import React from 'react';
import { useLanguage } from '../i18n';
import { Language } from '../types';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.ML : Language.EN);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md flex items-center text-sm text-gray-700 dark:text-gray-200 transition-colors"
      aria-label="Toggle language"
    >
      <Languages size={18} className="mr-2" />
      {language === Language.EN ? 'മലയാളം' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;

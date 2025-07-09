
import React from 'react';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../i18n';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { translate } = useLanguage();

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-gray-200 transition-colors"
      aria-label={isDark ? translate('lightModeAriaLabel', 'Switch to light mode') : translate('darkModeAriaLabel', 'Switch to dark mode')}
      title={isDark ? translate('lightModeAriaLabel', 'Switch to light mode') : translate('darkModeAriaLabel', 'Switch to dark mode')}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default DarkModeToggle;

import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X, ShieldCheck } from 'lucide-react';

const Header = () => {
  const { translate } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const storedRefCode = localStorage.getItem('referralCode');
    if (storedRefCode) {
      setReferralCode(storedRefCode);
    }
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary text-white'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-primary dark:text-secondary font-bold text-xl">
              <ShieldCheck size={28} className="mr-2" />
              {translate('appName')}
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass}>
              {translate('navHome')}
            </NavLink>
            <NavLink to="/join" className={navLinkClass}>
              {translate('navJoin')}
            </NavLink>
            <NavLink to="/course" className={navLinkClass}>
              {translate('navCourse')}
            </NavLink>
            <LanguageSwitcher />
          </div>
          <div className="md:hidden flex items-center">
             <LanguageSwitcher /> {/* Keep lang switcher visible on mobile before menu icon */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {referralCode && (
          <div className="text-center text-xs text-green-600 bg-green-100 p-1">
            {translate('referralCodeApplied')} {referralCode}
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 p-2 transition transform origin-top-right z-40 bg-white dark:bg-gray-800 shadow-lg">
          <div className="rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <Link to="/" className="flex items-center text-primary dark:text-secondary font-bold text-lg" onClick={() => setMenuOpen(false)}>
                  <ShieldCheck size={24} className="mr-2" />
                  {translate('appName')}
                </Link>
              </div>
              <div className="-mr-2">
                <button
                  onClick={() => setMenuOpen(false)} // Corrected typo here
                  className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                >
                  <span className="sr-only">Close menu</span>
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => setMenuOpen(false)}
              >
                {translate('navHome')}
              </NavLink>
              <NavLink
                to="/join"
                className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => setMenuOpen(false)}
              >
                {translate('navJoin')}
              </NavLink>
              <NavLink
                to="/course"
                className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => setMenuOpen(false)}
              >
                {translate('navCourse')}
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

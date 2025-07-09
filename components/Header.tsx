
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { useAuth } from '../AuthContext'; // Import useAuth
import LanguageSwitcher from './LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';
import { Menu, X, ShieldCheck, LogOut, UserCircle, LogIn } from 'lucide-react';

const Header = () => {
  const { translate } = useLanguage();
  const auth = useAuth(); // Use Auth context
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const storedRefCode = localStorage.getItem('referralCode');
    if (storedRefCode) {
      setReferralCode(storedRefCode);
    }
  }, []);
  
  const handleLogout = async () => {
    await auth.logout();
    setMenuOpen(false);
    navigate('/'); // Redirect to home after logout
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary text-white'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;
  
  const mobileNavLinkClass = (isActive: boolean) => 
    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`;


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
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" className={navLinkClass}>
              {translate('navHome')}
            </NavLink>
            {auth.isAuthenticated && auth.user?.paymentComplete ? (
              <NavLink to="/course" className={navLinkClass}>
                {translate('navCourse')}
              </NavLink>
            ) : !auth.isAuthenticated ? (
              <NavLink to="/join" className={navLinkClass}>
                <LogIn size={16} className="inline mr-1" />{translate('navJoin')}
              </NavLink>
            ): null }
            {/* Link to My Referrals page */}
            {auth.isAuthenticated && (
              <NavLink to="/my-referrals" className={navLinkClass}>
                {translate('navReferrals', 'Referrals')}
              </NavLink>
            )}

            {auth.isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-600 dark:hover:text-red-200 transition-colors flex items-center"
              >
                <LogOut size={16} className="mr-1" /> {translate('navLogout')}
              </button>
            )}
            {auth.isAuthenticated && auth.user && (
               <div className="flex items-center ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                {auth.user.profilePicUrl ? (
                    <img src={auth.user.profilePicUrl} alt={auth.user.name} className="w-8 h-8 rounded-full"/>
                ) : (
                    <UserCircle size={24} className="text-gray-600 dark:text-gray-300"/>
                )}
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-200 hidden lg:block">{auth.user.name.split(' ')[0]}</span>
               </div>
            )}
            <LanguageSwitcher />
            <DarkModeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <LanguageSwitcher /> 
            <DarkModeToggle />
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
        {referralCode && !auth.isAuthenticated && ( // Show referral only if not logged in
          <div className="text-center text-xs text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200 p-1">
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
                  onClick={() => setMenuOpen(false)}
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
                className={({ isActive }) => mobileNavLinkClass(isActive)}
                onClick={() => setMenuOpen(false)}
              >
                {translate('navHome')}
              </NavLink>
              {auth.isAuthenticated && auth.user?.paymentComplete ? (
                <NavLink
                  to="/course"
                  className={({ isActive }) => mobileNavLinkClass(isActive)}
                  onClick={() => setMenuOpen(false)}
                >
                  {translate('navCourse')}
                </NavLink>
              ) : !auth.isAuthenticated ? (
                <NavLink
                  to="/join"
                  className={({ isActive }) => mobileNavLinkClass(isActive)}
                  onClick={() => setMenuOpen(false)}
                >
                  <LogIn size={18} className="inline mr-1.5" />{translate('navJoin')}
                </NavLink>
              ) : null}
              {/* Link to My Referrals page */}
              {auth.isAuthenticated && (
                <NavLink
                  to="/my-referrals"
                  className={({ isActive }) => mobileNavLinkClass(isActive)}
                  onClick={() => setMenuOpen(false)}
                >
                  {translate('navReferrals', 'Referrals')}
                </NavLink>
              )}
      
              {auth.isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-600 dark:hover:text-red-200"
                >
                 <LogOut size={18} className="inline mr-1.5" /> {translate('navLogout')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
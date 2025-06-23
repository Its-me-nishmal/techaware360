
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n';
import { Language } from '../types'; // Added import for Language enum
import { CreditCard, Gift, Send } from 'lucide-react';

const JoinPage = () => {
  const { translate } = useLanguage();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedRefCode = localStorage.getItem('referralCode');
    if (storedRefCode) {
      setReferralCode(storedRefCode);
    }
  }, []);

  const { language } = useLanguage(); // Moved useLanguage hook call higher for handleSubmit to use it

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !name) {
      setError(language === Language.EN ? 'Email and Name are required.' : 'ഇമെയിലും പേരും ആവശ്യമാണ്.'); // Corrected condition
      return;
    }
    // Simulate form submission
    console.log({ email, name, referralCode });
    setSubmitted(true);
    // Clear form
    setEmail('');
    setName('');
    // Optionally clear referral code from local storage after use, or keep it
    // localStorage.removeItem('referralCode'); 
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">{translate('joinTitle')}</h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            <CreditCard size={24} className="mr-2 text-primary dark:text-secondary" /> {translate('priceInfo')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {translate('paymentInstructionsTitle')}
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>{translate('paymentInstruction1')}</li>
            <li>{language === Language.EN ? 'After payment, please fill the form on the right with your details.' : 'പണമടച്ചതിന് ശേഷം, വലതുവശത്തുള്ള ഫോമിൽ നിങ്ങളുടെ വിശദാംശങ്ങൾ പൂരിപ്പിക്കുക.'}</li>
            <li>{language === Language.EN ? 'Access to the course will be provided after payment verification.' : 'പേയ്മെന്റ് പരിശോധിച്ചുറപ്പിച്ചതിന് ശേഷം കോഴ്സിലേക്കുള്ള പ്രവേശനം നൽകും.'}</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            <Gift size={24} className="mr-2 text-primary dark:text-secondary" /> {translate('referralRewardInfo')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {language === Language.EN ? 'If you have a referral code, enter it in the form to help your friend earn a reward!' : 'നിങ്ങളുടെ സുഹൃത്തിന് ഒരു റിവാർഡ് നേടാൻ സഹായിക്കുന്നതിന്, നിങ്ങൾക്ക് ഒരു റഫറൽ കോഡ് ഉണ്ടെങ്കിൽ അത് ഫോമിൽ നൽകുക!'}
          </p>
        </div>
      </div>

      <div className="mt-12 max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6 text-center">{translate('formDetailsTitle')}</h2>
        {submitted ? (
          <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-200 rounded-md text-center">
            {translate('formSuccessMessage')}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {translate('emailLabel')}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {translate('nameLabel')}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {translate('referralCodeLabel')}
              </label>
              <input
                type="text"
                id="referralCode"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-gray-100"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                <Send size={18} className="mr-2" />
                {translate('accessCourseButton')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default JoinPage;

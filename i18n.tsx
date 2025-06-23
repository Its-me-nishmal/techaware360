
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Language, Translations, LanguageContextType } from './types';

const AppTranslations: Translations = {
  // Header & Nav
  appName: { en: 'TechAware360', ml: 'ടെക്അവെയർ360' },
  navHome: { en: 'Home', ml: 'ഹോം' },
  navJoin: { en: 'Join', ml: 'ചേരുക' },
  navCourse: { en: 'Course', ml: 'കോഴ്‌സ്' },
  // Home Page
  homeWelcomeTitle: { en: 'Welcome to TechAware360!', ml: 'ടെക്അവെയർ360-ലേക്ക് സ്വാഗതം!' },
  homePitchLine1: { en: 'Learn to use technology smartly.', ml: 'സാങ്കേതികവിദ്യ വിവേകത്തോടെ ഉപയോഗിക്കാൻ പഠിക്കുക.' },
  homePitchLine2: { en: 'Stay aware, stay protected.', ml: 'അറിവോടെയിരിക്കുക, സുരക്ഷിതരായിരിക്കുക.' },
  homePitchLine3: { en: 'In Malayalam and English.', ml: 'മലയാളത്തിലും ഇംഗ്ലീഷിലും.' },
  joinNowButton: { en: 'Join Now', ml: 'ഇപ്പോൾ ചേരുക' },
  // Join Page
  joinTitle: { en: 'Join the Course', ml: 'കോഴ്‌സിൽ ചേരുക' },
  priceInfo: { en: 'Price: ₹300', ml: 'വില: ₹300' },
  referralRewardInfo: { en: 'Referral Reward: ₹100', ml: 'റഫറൽ റിവാർഡ്: ₹100' },
  paymentInstructionsTitle: { en: 'Payment Instructions', ml: 'പണമടയ്ക്കാനുള്ള നിർദ്ദേശങ്ങൾ' },
  paymentInstruction1: { en: 'Pay manually to UPI ID: your-upi-id@okhdfcbank (Placeholder)', ml: 'UPI ഐഡിയിലേക്ക് പണമടയ്ക്കുക: your-upi-id@okhdfcbank (Placeholder)' },
  formDetailsTitle: { en: 'Enter Your Details', ml: 'നിങ്ങളുടെ വിവരങ്ങൾ നൽകുക' },
  emailLabel: { en: 'Email Address', ml: 'ഇമെയിൽ വിലാസം' },
  nameLabel: { en: 'Full Name', ml: 'മുഴുവൻ പേര്' },
  referralCodeLabel: { en: 'Referral Code (Optional)', ml: 'റഫറൽ കോഡ് (ഓപ്ഷണൽ)' },
  accessCourseButton: { en: 'Access Course', ml: 'കോഴ്‌സ് ആക്‌സസ് ചെയ്യുക' },
  formSuccessMessage: { en: 'Thank you! Your details have been submitted. We will verify your payment and grant access soon.', ml: 'നന്ദി! നിങ്ങളുടെ വിവരങ്ങൾ സമർപ്പിച്ചു. ഞങ്ങൾ നിങ്ങളുടെ പേയ്‌മെൻ്റ് പരിശോധിച്ച് ഉടൻ തന്നെ പ്രവേശനം നൽകും.' },
  // Course Page
  courseTitle: { en: 'Course Categories', ml: 'കോഴ്‌സ് വിഭാഗങ്ങൾ' },
  selectCategoryPrompt: { en: 'Select a category to start learning:', ml: 'പഠനം ആരംഭിക്കാൻ ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുക:'},
  viewTopicsButton: { en: 'View Topics', ml: 'വിഷയങ്ങൾ കാണുക' },
  // Category Detail Page
  topicsIn: { en: 'Topics in', ml: 'വിഷയങ്ങൾ' },
  // Footer
  footerCopyright: { en: '© TechAware360 2025', ml: '© ടെക്അവെയർ360 2025' },
  footerMadeWithLove: { en: 'Made with ❤️ for awareness', ml: 'അവബോധത്തിനായി ❤️ ഉപയോഗിച്ച് നിർമ്മിച്ചത്' },
  // General
  pageNotFound: { en: 'Page Not Found', ml: 'പേജ് കണ്ടെത്താനായില്ല' },
  goBackButton: { en: 'Go Back', ml: 'തിരികെ പോകുക' },
  referralCodeApplied: { en: 'Referral Code Applied:', ml: 'റഫറൽ കോഡ് പ്രയോഗിച്ചു:'},
  expand: { en: 'Expand', ml: 'വികസിപ്പിക്കുക' },
  collapse: { en: 'ചുരുക്കുക', ml: 'ചുരുക്കുക' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem('appLanguage') as Language;
    return storedLang && Object.values(Language).includes(storedLang) ? storedLang : Language.EN;
  });

  function handleSetLanguage(lang: Language) {
    setLanguage(lang);
    localStorage.setItem('appLanguage', lang);
  }

  function translate(key: string, fallback?: string): string {
    return AppTranslations[key]?.[language] || fallback || key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

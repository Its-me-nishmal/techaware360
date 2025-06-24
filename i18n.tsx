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
  homeHeroSubtitle: { en: "Empowering you to navigate the digital world with confidence and skill. Your journey to digital literacy starts here.", ml: "ആത്മവിശ്വാസത്തോടും വൈദഗ്ധ്യത്തോടും കൂടി ഡിജിറ്റൽ ലോകത്ത് സഞ്ചരിക്കാൻ നിങ്ങളെ ശാക്തീകരിക്കുന്നു. ഡിജിറ്റൽ സാക്ഷരതയിലേക്കുള്ള നിങ്ങളുടെ യാത്ര ഇവിടെ ആരംഭിക്കുന്നു." },
  homePitchLine1: { en: 'Learn to use technology smartly.', ml: 'സാങ്കേതികവിദ്യ വിവേകത്തോടെ ഉപയോഗിക്കാൻ പഠിക്കുക.' },
  homePitchLine2: { en: 'Stay aware, stay protected.', ml: 'അറിവോടെയിരിക്കുക, സുരക്ഷിതരായിരിക്കുക.' },
  homePitchLine3: { en: 'In Malayalam and English.', ml: 'മലയാളത്തിലും ഇംഗ്ലീഷിലും.' },
  joinNowButton: { en: 'Join Now', ml: 'ഇപ്പോൾ ചേരുക' },
  whyTechAwareTitle: { en: "Why Choose TechAware360?", ml: "എന്തുകൊണ്ട് ടെക്അവെയർ360 തിരഞ്ഞെടുക്കണം?" },
  benefit1Title: { en: "Expert-Led Content", ml: "വിദഗ്ധർ നയിക്കുന്ന ഉള്ളടക്കം" },
  benefit1Desc: { en: "Comprehensive modules crafted by tech professionals, designed for real-world application.", ml: "സാങ്കേതിക വിദഗ്ധർ തയ്യാറാക്കിയ സമഗ്രമായ മൊഡ്യൂളുകൾ, യഥാർത്ഥ ലോക പ്രയോഗത്തിനായി രൂപകൽപ്പന ചെയ്തിരിക്കുന്നു." },
  benefit2Title: { en: "Bilingual Learning", ml: "ദ്വിഭാഷാ പഠനം" },
  benefit2Desc: { en: "Learn complex topics in your preferred language, English or Malayalam, for better understanding.", ml: "സങ്കീർണ്ണമായ വിഷയങ്ങൾ നിങ്ങൾക്ക് ഇഷ്ടപ്പെട്ട ഭാഷയിൽ, ഇംഗ്ലീഷിലോ മലയാളത്തിലോ, മികച്ച ധാരണയ്ക്കായി പഠിക്കുക." },
  benefit3Title: { en: "Practical Skills", ml: "പ്രായോഗിക വൈദഗ്ദ്ധ്യം" },
  benefit3Desc: { en: "Gain actionable knowledge to protect yourself, your family, and your digital identity effectively.", ml: "നിങ്ങളെയും നിങ്ങളുടെ കുടുംബത്തെയും നിങ്ങളുടെ ഡിജിറ്റൽ ഐഡൻ്റിറ്റിയെയും ഫലപ്രദമായി സംരക്ഷിക്കാൻ പ്രായോഗികമായ അറിവ് നേടുക." },
  keyLearningAreasTitle: { en: "Key Learning Areas", ml: "പ്രധാന പഠന മേഖലകൾ" },
  learningArea1Title: { en: "Digital Safety & Security", ml: "ഡിജിറ്റൽ സുരക്ഷയും സംരക്ഷണവും" },
  learningArea1Desc: { en: "Master online safety, identify scams, and secure your digital assets.", ml: "ഓൺലൈൻ സുരക്ഷയിൽ വൈദഗ്ദ്ധ്യം നേടുക, തട്ടിപ്പുകൾ തിരിച്ചറിയുക, നിങ്ങളുടെ ഡിജിറ്റൽ ആസ്തികൾ സുരക്ഷിതമാക്കുക." },
  learningArea2Title: { en: "Privacy Management", ml: "സ്വകാര്യതാ പരിപാലനം" },
  learningArea2Desc: { en: "Understand your digital footprint and learn to control your personal data online.", ml: "നിങ്ങളുടെ ഡിജിറ്റൽ കാൽപ്പാടുകൾ മനസ്സിലാക്കുകയും നിങ്ങളുടെ വ്യക്തിഗത ഡാറ്റ ഓൺലൈനിൽ നിയന്ത്രിക്കാൻ പഠിക്കുകയും ചെയ്യുക." },
  learningArea3Title: { en: "Critical Digital Thinking", ml: "വിമർശനാത്മക ഡിജിറ്റൽ ചിന്ത" },
  learningArea3Desc: { en: "Navigate information overload, spot misinformation, and use digital tools wisely.", ml: "വിവരങ്ങളുടെ അതിപ്രസരം നാവിഗേറ്റ് ചെയ്യുക, തെറ്റായ വിവരങ്ങൾ കണ്ടെത്തുക, ഡിജിറ്റൽ ഉപകരണങ്ങൾ വിവേകപൂർവ്വം ഉപയോഗിക്കുക." },
  exploreCourseButton: { en: "Explore Full Course", ml: "പൂർണ്ണമായ കോഴ്‌സ് കാണുക" },
  startJourneyTitle: { en: "Start Your Digital Empowerment Journey Today!", ml: "നിങ്ങളുടെ ഡിജിറ്റൽ ശാക്തീകരണ യാത്ര ഇന്ന് തന്നെ ആരംഭിക്കൂ!" },
  startJourneyDesc: { en: "Join a community of learners dedicated to mastering the digital world. Equip yourself with the knowledge and skills for a safer, smarter digital future.", ml: "ഡിജിറ്റൽ ലോകം കീഴടക്കാൻ പ്രതിജ്ഞാബദ്ധരായ പഠിതാക്കളുടെ ഒരു കമ്മ്യൂണിറ്റിയിൽ ചേരുക. സുരക്ഷിതവും മികച്ചതുമായ ഒരു ഡിജിറ്റൽ ഭാവിക്കായി അറിവും വൈദഗ്ധ്യവും നേടുക." },
  joinCourseTodayButton: { en: "Join the Course Today", ml: "ഇന്ന് തന്നെ കോഴ്‌സിൽ ചേരുക" },
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
  overallCourseProgress: { en: 'Overall Course Progress', ml: 'മൊത്തത്തിലുള്ള കോഴ്‌സ് പുരോഗതി' },
  categoriesCompleted: { en: '{completedCount}/{totalCount} Categories Completed', ml: '{completedCount}/{totalCount} വിഭാഗങ്ങൾ പൂർത്തിയായി' },
  // Category Detail Page
  topicsIn: { en: 'Topics in', ml: 'വിഷയങ്ങൾ' },
  categoryLockedMessage: { en: 'This category is locked. Please complete the previous category to unlock it.', ml: 'ഈ വിഭാഗം ലോക്ക് ചെയ്തിരിക്കുന്നു. ഇത് അൺലോക്ക് ചെയ്യുന്നതിന് ദയവായി മുൻ വിഭാഗം പൂർത്തിയാക്കുക.' },
  topicLockedMessage: { en: 'This topic is locked. Please complete the previous topic to unlock it.', ml: 'ഈ വിഷയം ലോക്ക് ചെയ്തിരിക്കുന്നു. ഇത് അൺലോക്ക് ചെയ്യുന്നതിന് ദയവായി മുൻ വിഷയം പൂർത്തിയാക്കുക.' },
  topicsCompleted: { en: '{completedCount}/{totalCount} Topics Completed', ml: '{completedCount}/{totalCount} വിഷയങ്ങൾ പൂർത്തിയായി' },
  // General UI elements for locking/completion
  locked: { en: 'Locked', ml: 'ലോക്ക് ചെയ്തു' },
  completed: { en: 'Completed', ml: 'പൂർത്തിയായി' },
  readingTopic: { en: 'Reading...', ml: 'വായിക്കുന്നു...' },
  // Footer
  footerCopyright: { en: '© TechAware360 2025', ml: '© ടെക്അവെയർ360 2025' },
  footerMadeWithLove: { en: 'Made with ❤️ for awareness', ml: 'അവബോധത്തിനായി ❤️ ഉപയോഗിച്ച് നിർമ്മിച്ചത്' },
  // General
  pageNotFound: { en: 'Page Not Found', ml: 'പേജ് കണ്ടെത്താനായില്ല' },
  goBackButton: { en: 'Go Back', ml: 'തിരികെ പോകുക' },
  referralCodeApplied: { en: 'Referral Code Applied:', ml: 'റഫറൽ കോഡ് പ്രയോഗിച്ചു:'},
  expand: { en: 'Expand', ml: 'വികസിപ്പിക്കുക' },
  collapse: { en: 'Collapse', ml: 'ചുരുക്കുക' } // Corrected Malayalam translation
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

  function translate(key: string, fallback?: string, replacements?: Record<string, string | number>): string {
    let translation = AppTranslations[key]?.[language] || fallback || key;
    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(`{${placeholder}}`, String(replacements[placeholder]));
      });
    }
    return translation;
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
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Language, Translations, LanguageContextType } from './types';

const AppTranslations: Translations = {
  // Header & Nav
  appName: { en: 'TechAware360', ml: 'ടെക്അവെയർ360' },
  navHome: { en: 'Home', ml: 'ഹോം' },
  navJoin: { en: 'Join / Sign In', ml: 'ചേരുക / സൈൻ ഇൻ' },
  navCourse: { en: 'Course', ml: 'കോഴ്‌സ്' },
  navLogout: { en: 'Logout', ml: 'ലോഗ് ഔട്ട്' },
  loadingApp: { en: 'Loading Application...', ml: 'അപ്ലിക്കേഷൻ ലോഡ് ചെയ്യുന്നു...' },

  // Home Page Loader
  loadingHomePage: { en: 'Loading TechAware360...', ml: 'ടെക്അവെയർ360 ലോഡ് ചെയ്യുന്നു...' },
  oneMomentPlease: { en: 'One moment, getting things ready for you!', ml: 'ഒരു നിമിഷം, നിങ്ങൾക്കായി കാര്യങ്ങൾ തയ്യാറാക്കുന്നു!' },

  // Home Page
  homeWelcomeTitle: { en: 'Welcome to TechAware360!', ml: 'ടെക്അവെയർ360-ലേക്ക് സ്വാഗതം!' },
  homeHeroSubtitle: { en: "Empowering you to navigate the digital world with confidence and skill. Your journey to digital literacy starts here.", ml: "ആത്മവിശ്വാസത്തോടും വൈദഗ്ധ്യത്തോടും കൂടി ഡിജിറ്റൽ ലോകത്ത് സഞ്ചരിക്കാൻ നിങ്ങളെ ശാക്തീകരിക്കുന്നു. ഡിജിറ്റൽ സാക്ഷരതയിലേക്കുള്ള നിങ്ങളുടെ യാത്ര ഇവിടെ ആരംഭിക്കുന്നു." },
  joinNowButton: { en: 'Get Started Now', ml: 'ഇപ്പോൾ ആരംഭിക്കുക' },
  goToCourseButtonHome: { en: 'Go to Your Course', ml: 'നിങ്ങളുടെ കോഴ്‌സിലേക്ക് പോകുക' },
  completeYourPaymentButtonHome: { en: 'Complete Your Payment', ml: 'നിങ്ങളുടെ പേയ്‌മെൻ്റ് പൂർത്തിയാക്കുക' },
  
  ourMissionTitle: { en: "Our Mission", ml: "ഞങ്ങളുടെ ദൗത്യം" },
  ourMissionText: { en: "To empower individuals with essential digital literacy skills for safe, smart, and confident navigation of the ever-evolving technological landscape. We believe in making tech awareness accessible to all.", ml: "നിരന്തരം വികസിച്ചുകൊണ്ടിരിക്കുന്ന സാങ്കേതിക ലോകത്ത് സുരക്ഷിതവും വിവേകപൂർണ്ണവും ആത്മവിശ്വാസമുള്ളതുമായ നാവിഗേഷനായി വ്യക്തികളെ അത്യാവശ്യ ഡിജിറ്റൽ സാക്ഷരതാ വൈദഗ്ധ്യം കൊണ്ട് ശാക്തീകരിക്കുക. സാങ്കേതിക അവബോധം എല്ലാവർക്കും ലഭ്യമാക്കുക എന്നതാണ് ഞങ്ങളുടെ ലക്ഷ്യം." },

  whyTechAwareTitle: { en: "Why Choose TechAware360?", ml: "എന്തുകൊണ്ട് ടെക്അവെയർ360 തിരഞ്ഞെടുക്കണം?" },
  benefit1Title: { en: "Expert-Led Content", ml: "വിദഗ്ധർ നയിക്കുന്ന ഉള്ളടക്കം" },
  benefit1Desc: { en: "Dynamic modules crafted by tech professionals, designed for real-world application and kept up-to-date.", ml: "സാങ്കേതിക വിദഗ്ധർ തയ്യാറാക്കിയ ചലനാത്മകമായ മൊഡ്യൂളുകൾ, യഥാർത്ഥ ലോക പ്രയോഗത്തിനായി രൂപകൽപ്പന ചെയ്തതും കാലികമായി നിലനിർത്തുന്നതും." },
  benefit2Title: { en: "Bilingual Learning", ml: "ദ്വിഭാഷാ പഠനം" },
  benefit2Desc: { en: 'Learn in both English and Malayalam, making complex topics easy to understand for everyone.', ml: 'ഇംഗ്ലീഷിലും മലയാളത്തിലും പഠിക്കുക, സങ്കീർണ്ണമായ വിഷയങ്ങൾ എല്ലാവർക്കും എളുപ്പത്തിൽ മനസ്സിലാക്കാൻ സഹായിക്കുന്നു.' },
  benefit3Title: { en: "Engaging & Practical", ml: "ആകർഷകവും പ്രായോഗികവും" },
  benefit3Desc: { en: "Interactive lessons and practical examples that you can apply immediately in your daily life.", ml: "നിങ്ങളുടെ ദൈനംദിന ജീവിതത്തിൽ ഉടനടി പ്രയോഗിക്കാൻ കഴിയുന്ന ഇൻ്ററാക്ടീവ് പാഠങ്ങളും പ്രായോഗിക ഉദാഹരണങ്ങളും." },
  
  howItWorksTitle: { en: "How It Works", ml: "ഇതെങ്ങനെ പ്രവർത്തിക്കുന്നു" },
  step1Title: { en: "Sign Up", ml: "സൈൻ അപ്പ് ചെയ്യുക" },
  step1Desc: { en: "Quickly create your account with Google Sign-In and get ready to start.", ml: "Google സൈൻ-ഇൻ ഉപയോഗിച്ച് വേഗത്തിൽ നിങ്ങളുടെ അക്കൗണ്ട് സൃഷ്ടിച്ച് പഠനം ആരംഭിക്കാൻ തയ്യാറാകുക." },
  step2Title: { en: "Learn at Your Pace", ml: "നിങ്ങളുടെ വേഗതയിൽ പഠിക്കുക" },
  step2Desc: { en: "Go through the structured modules one by one, unlocking new topics as you progress.", ml: "ക്രമീകൃതമായ മൊഡ്യൂളുകളിലൂടെ ഒന്നൊന്നായി കടന്നുപോകുക, നിങ്ങൾ പുരോഗമിക്കുമ്പോൾ പുതിയ വിഷയങ്ങൾ അൺലോക്ക് ചെയ്യുക." },
  step3Title: { en: "Become Empowered", ml: "ശാക്തീകരിക്കപ്പെടുക" },
  step3Desc: { en: "Gain the confidence and skills to tackle the digital world safely and effectively.", ml: "ഡിജിറ്റൽ ലോകത്തെ സുരക്ഷിതമായും ഫലപ്രദമായും നേരിടാനുള്ള ആത്മവിശ്വാസവും കഴിവുകളും നേടുക." },

  whatYouWillLearnTitle: { en: "What You'll Learn", ml: "നിങ്ങൾ എന്ത് പഠിക്കും" },
  learnTopic1Title: { en: 'Online Safety', ml: 'ഓൺലൈൻ സുരക്ഷ' },
  learnTopic1Desc: { en: 'Identify and avoid scams, phishing, and malware.', ml: 'തട്ടിപ്പുകൾ, ഫിഷിംഗ്, മാൽവെയർ എന്നിവ തിരിച്ചറിയുകയും ഒഴിവാക്കുകയും ചെയ്യുക.' },
  learnTopic2Title: { en: 'Privacy Management', ml: 'സ്വകാര്യതാ മാനേജ്മെൻ്റ്' },
  learnTopic2Desc: { en: 'Control your digital footprint and protect personal data.', ml: 'നിങ്ങളുടെ ഡിജിറ്റൽ കാൽപ്പാടുകൾ നിയന്ത്രിക്കുകയും വ്യക്തിഗത ഡാറ്റ പരിരക്ഷിക്കുകയും ചെയ്യുക.' },
  learnTopic3Title: { en: 'Critical Thinking', ml: 'വിമർശനാത്മക ചിന്ത' },
  learnTopic3Desc: { en: 'Spot fake news and misinformation online.', ml: 'വ്യാജ വാർത്തകളും തെറ്റായ വിവരങ്ങളും ഓൺലൈനിൽ കണ്ടെത്തുക.' },
  learnTopic4Title: { en: 'Effective Communication', ml: 'ഫലപ്രദമായ ആശയവിനിമയം' },
  learnTopic4Desc: { en: 'Master digital etiquette and collaboration tools.', ml: 'ഡിജിറ്റൽ മര്യാദകളും സഹകരണ ടൂളുകളും മാസ്റ്റർ ചെയ്യുക.' },
  learnTopic5Title: { en: 'Productivity Tools', ml: 'ഉത്പാദനക്ഷമത ടൂളുകൾ' },
  learnTopic5Desc: { en: 'Leverage apps and software for personal and professional growth.', ml: 'വ്യക്തിപരവും തൊഴിൽപരവുമായ വളർച്ചയ്ക്ക് ആപ്പുകളും സോഫ്റ്റ്‌വെയറുകളും പ്രയോജനപ്പെടുത്തുക.' },
  learnTopic6Title: { en: 'Digital Wellbeing', ml: 'ഡിജിറ്റൽ വെൽബീയിംഗ്' },
  learnTopic6Desc: { en: 'Manage screen time and build healthy tech habits.', ml: 'സ്ക്രീൻ സമയം നിയന്ത്രിക്കുകയും ആരോഗ്യകരമായ സാങ്കേതിക ശീലങ്ങൾ വളർത്തിയെടുക്കുകയും ചെയ്യുക.' },

  whoIsThisForTitle: { en: "Who Is This Course For?", ml: "ഈ കോഴ്സ് ആർക്കുള്ളതാണ്?" },
  audience1Title: { en: 'Students', ml: 'വിദ്യാർത്ഥികൾ' },
  audience1Desc: { en: 'Build a strong digital foundation for your academic and future career.', ml: 'നിങ്ങളുടെ അക്കാദമിക്, ഭാവി കരിയറിനായി ശക്തമായ ഒരു ഡിജിറ്റൽ അടിത്തറ നിർമ്മിക്കുക.' },
  audience2Title: { en: 'Parents', ml: 'രക്ഷിതാക്കൾ' },
  audience2Desc: { en: 'Guide your children safely in the online world and manage your family’s digital life.', ml: 'ഓൺലൈൻ ലോകത്ത് നിങ്ങളുടെ കുട്ടികളെ സുരക്ഷിതമായി നയിക്കുകയും നിങ്ങളുടെ കുടുംബത്തിൻ്റെ ഡിജിറ്റൽ ജീവിതം കൈകാര്യം ചെയ്യുകയും ചെയ്യുക.' },
  audience3Title: { en: 'Professionals', ml: 'പ്രൊഫഷണലുകൾ' },
  audience3Desc: { en: 'Enhance your skills, protect sensitive data, and improve your online professional presence.', ml: 'നിങ്ങളുടെ കഴിവുകൾ വർദ്ധിപ്പിക്കുക, സെൻസിറ്റീവ് ഡാറ്റ പരിരക്ഷിക്കുക, നിങ്ങളുടെ ഓൺലൈൻ പ്രൊഫഷണൽ സാന്നിധ്യം മെച്ചപ്പെടുത്തുക.' },
  audience4Title: { en: 'Everyone!', ml: 'എല്ലാവർക്കും!' },
  audience4Desc: { en: 'Anyone eager to learn and gain confidence in using technology in their daily lives.', ml: 'ദൈനംദിന ജീവിതത്തിൽ സാങ്കേതികവിദ്യ ഉപയോഗിക്കാൻ പഠിക്കാനും ആത്മവിശ്വാസം നേടാനും ആഗ്രഹിക്കുന്ന ആർക്കും.' },

  testimonialsTitle: { en: "What Our Learners Say", ml: "ഞങ്ങളുടെ പഠിതാക്കൾ പറയുന്നത്" },
  testimonial1Text: { en: "This course opened my eyes to the risks I was taking online without even realizing it. I feel so much more secure now. Highly recommended for everyone.", ml: "ഈ കോഴ്‌സ് ഞാൻ അറിയാതെ തന്നെ ഓൺലൈനിൽ എടുത്തിരുന്ന അപകടസാധ്യതകളിലേക്ക് എൻ്റെ കണ്ണുതുറപ്പിച്ചു. എനിക്കിപ്പോൾ കൂടുതൽ സുരക്ഷിതത്വം തോന്നുന്നു. എല്ലാവർക്കും വളരെ ശുപാർശ ചെയ്യുന്നു." },
  testimonial1Name: { en: "Priya Menon", ml: "പ്രിയ മേനോൻ" },
  testimonial1Role: { en: "Parent & Homemaker", ml: "രക്ഷിതാവും വീട്ടമ്മയും" },
  testimonial2Text: { en: "As a small business owner, understanding digital security is crucial. TechAware360 gave me practical steps to protect my business and my customers. The bilingual format was a huge plus!", ml: "ഒരു ചെറുകിട ബിസിനസ്സ് ഉടമ എന്ന നിലയിൽ, ഡിജിറ്റൽ സുരക്ഷ മനസ്സിലാക്കുന്നത് നിർണായകമാണ്. എൻ്റെ ബിസിനസ്സിനെയും ഉപഭോക്താക്കളെയും സംരക്ഷിക്കാൻ ടെക്അവെയർ360 എനിക്ക് പ്രായോഗികമായ വഴികൾ നൽകി. ദ്വിഭാഷാ ഫോർമാറ്റ് ഒരു വലിയ പ്ലസ് ആയിരുന്നു!" },
  testimonial2Name: { en: "Rajesh Kumar", ml: "രാജേഷ് കുമാർ" },
  testimonial2Role: { en: "Shop Owner", ml: "കടയുടമ" },

  startJourneyTitle: { en: "Ready to Start Your Digital Journey?", ml: "നിങ്ങളുടെ ഡിജിറ്റൽ യാത്ര ആരംഭിക്കാൻ തയ്യാറാണോ?" },
  startJourneyDesc: { en: "Join a community of learners dedicated to becoming smarter, safer, and more confident in the digital age. Your first step towards empowerment is just a click away.", ml: "ഡിജിറ്റൽ യുഗത്തിൽ കൂടുതൽ മിടുക്കരും സുരക്ഷിതരും ആത്മവിശ്വാസമുള്ളവരുമാകാൻ അർപ്പിതരായ പഠിതാക്കളുടെ ഒരു കമ്മ്യൂണിറ്റിയിൽ ചേരുക. ശാക്തീകരണത്തിലേക്കുള്ള നിങ്ങളുടെ ആദ്യപടി ഒരു ക്ലിക്ക് മാത്രം അകലെയാണ്." },
  referralCodeApplied: { en: 'Referral Code Applied:', ml: 'ശുപാർശ കോഡ് പ്രയോഗിച്ചു:' },

  // Footer
  footerCopyright: { en: `© ${new Date().getFullYear()} TechAware360. All Rights Reserved.`, ml: `© ${new Date().getFullYear()} ടെക്അവെയർ360. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.` },
  footerMadeWithLove: { en: "Made with ❤️ in Kerala", ml: "സ്നേഹത്തോടെ കേരളത്തിൽ നിർമ്മിച്ചത് ❤️" },

  // Course & Topic Pages
  locked: { en: 'Locked', ml: 'ലോക്ക് ചെയ്തു' },
  completed: { en: 'Completed', ml: 'പൂർത്തിയായി' },
  topicsCompleted: { en: '{completedCount} of {totalCount} topics completed', ml: '{totalCount}-ൽ {completedCount} വിഷയങ്ങൾ പൂർത്തിയായി' },
  categoriesCompleted: { en: '{completedCount} of {totalCount} modules completed', ml: '{totalCount}-ൽ {completedCount} മൊഡ്യൂളുകൾ പൂർത്തിയായി' },
  viewTopicsButton: { en: 'View Topics', ml: 'വിഷയങ്ങൾ കാണുക' },
  categoryLockedMessage: { en: 'Complete the previous module to unlock this one.', ml: 'ഇതൺലോക്ക് ചെയ്യുന്നതിന് മുൻപത്തെ മൊഡ്യൂൾ പൂർത്തിയാക്കുക.' },
  topicLockedMessage: { en: 'Complete the previous topic to unlock this one.', ml: 'ഇതൺലോക്ക് ചെയ്യുന്നതിന് മുൻപത്തെ വിഷയം പൂർത്തിയാക്കുക.' },
  courseTitle: { en: 'Course Modules', ml: 'കോഴ്‌സ് മൊഡ്യൂളുകൾ' },
  selectCategoryPrompt: { en: 'Select a module to begin your learning journey.', ml: 'നിങ്ങളുടെ പഠന യാത്ര ആരംഭിക്കാൻ ഒരു മൊഡ്യൂൾ തിരഞ്ഞെടുക്കുക.' },
  overallCourseProgress: { en: 'Overall Progress', ml: 'മൊത്തത്തിലുള്ള പുരോഗതി' },
  noCategoriesFound: { en: 'No course categories available at the moment.', ml: 'കോഴ്‌സ് വിഭാഗങ്ങളൊന്നും ഇപ്പോൾ ലഭ്യമല്ല.' },
  categoryNotFound: { en: 'Category not found.', ml: 'വിഭാഗം കണ്ടെത്താനായില്ല.' },
  goBackButton: { en: 'Go Back', ml: 'പുറകോട്ട് പോകുക' },
  topicsIn: { en: 'Topics in', ml: 'വിഷയങ്ങൾ' },
  noTopicsFound: { en: 'No topics available in this category yet.', ml: 'ഈ വിഭാഗത്തിൽ ഇതുവരെ വിഷയങ്ങളൊന്നും ലഭ്യമല്ല.' },
  
  // Join Page
  joinTitle: { en: 'Join TechAware360', ml: 'ടെക്അവെയർ360-ൽ ചേരുക' },
  signInToJoin: { en: 'Sign in to Get Started', ml: 'ആരംഭിക്കാൻ സൈൻ ഇൻ ചെയ്യുക' },
  referralCodeActive: { en: 'Active Referral Code', ml: 'സജീവമായ ശുപാർശ കോഡ്' },
  unexpectedError: { en: 'An unexpected error occurred. Please try again.', ml: 'അപ്രതീക്ഷിതമായ ഒരു പിശക് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.' },
  loginFailedError: { en: 'Login failed. Please check your credentials and try again.', ml: 'ലോഗിൻ പരാജയപ്പെട്ടു. ദയവായി നിങ്ങളുടെ ക്രെഡൻഷ്യലുകൾ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.' },
  priceInfo: { en: 'One-time payment of ₹199 for lifetime access.', ml: 'ആജീവനാന്ത പ്രവേശനത്തിനായി ₹199 ഒറ്റത്തവണ പേയ്മെൻ്റ്.' },
  paymentAfterGoogleSignIn: { en: 'You will be directed to payment options after signing in.', ml: 'സൈൻ ഇൻ ചെയ്ത ശേഷം നിങ്ങളെ പേയ്‌മെൻ്റ് ഓപ്ഷനുകളിലേക്ക് നയിക്കും.' },
  
  // Referral Page
  referralCodeSaved: { en: 'Your referral code', ml: 'നിങ്ങളുടെ ശുപാർശ കോഡ്' },
  hasBeenSaved: { en: 'has been saved.', ml: 'സേവ് ചെയ്തിരിക്കുന്നു.' },
  redirectingToJoin: { en: 'You will be redirected to the join page shortly...', ml: 'നിങ്ങളെ ഉടൻ തന്നെ ചേരുന്നതിനുള്ള പേജിലേക്ക് റീഡയറക്ട് ചെയ്യും...' },
  
  // Not Found Page
  pageNotFound: { en: 'Page Not Found', ml: 'പേജ് കണ്ടെത്താനായില്ല' },
  pageNotFoundMessage: { en: "Sorry, the page you are looking for doesn't exist or has been moved.", ml: 'ക്ഷമിക്കണം, നിങ്ങൾ തിരയുന്ന പേജ് നിലവിലില്ല അല്ലെങ്കിൽ നീക്കം ചെയ്യപ്പെട്ടു.' },
  goToHome: { en: 'Go to Homepage', ml: 'ഹോംപേജിലേക്ക് പോകുക' },

  // Dark/Light Mode
  lightModeAriaLabel: { en: 'Switch to light mode', ml: 'ലൈറ്റ് മോഡിലേക്ക് മാറുക' },
  darkModeAriaLabel: { en: 'Switch to dark mode', ml: 'ഡാർക്ക് മോഡിലേക്ക് മാറുക' },

  // Payment Page
  paymentApprovedMessage: { en: 'Payment approved! Redirecting to course...', ml: 'പേയ്‌മെൻ്റ് അംഗീകരിച്ചു! കോഴ്സിലേക്ക് റീഡയറക്ട് ചെയ്യുന്നു...' },
  paymentPendingApprovalMessage: { en: 'Payment is still pending approval. Please check again later.', ml: 'പേയ്‌മെൻ്റ് ഇപ്പോഴും അംഗീകാരത്തിനായി കാത്തിരിക്കുന്നു. ദയവായി പിന്നീട് വീണ്ടും പരിശോധിക്കുക.' },
  paymentStatusError: { en: 'Error checking payment status.', ml: 'പേയ്‌മെൻ്റ് നില പരിശോധിക്കുന്നതിൽ പിശക്.' },
  welcomeUser: { en: 'Welcome, {userName}!', ml: 'സ്വാഗതം, {userName}!' },
  paymentInstructionsTitle: { en: 'Payment Instructions', ml: 'പേയ്‌മെൻ്റ് നിർദ്ദേശങ്ങൾ' },
  completeYourPaymentPrompt: { en: 'To access the course, please complete your payment:', ml: 'കോഴ്സ് ആക്സസ് ചെയ്യുന്നതിന്, ദയവായി നിങ്ങളുടെ പേയ്‌മെൻ്റ് പൂർത്തിയാക്കുക:' },
  paymentInstruction1: { en: 'Scan the QR code or use the UPI ID provided by the admin.', ml: 'അഡ്മിൻ നൽകിയ QR കോഡ് സ്കാൻ ചെയ്യുക അല്ലെങ്കിൽ UPI ഐഡി ഉപയോഗിക്കുക.' },
  paymentNoteMentionEmail: { en: 'Important: Please mention your email ({userEmail}) or name in the payment reference/notes if possible.', ml: 'പ്രധാനപ്പെട്ടത്: സാധ്യമെങ്കിൽ പേയ്‌മെൻ്റ് റഫറൻസിൽ/കുറിപ്പുകളിൽ നിങ്ങളുടെ ഇമെയിൽ ({userEmail}) അല്ലെങ്കിൽ പേര് ദയവായി പരാമർശിക്കുക.' },
  approvalProcessTitle: { en: 'Approval Process', ml: 'അംഗീകാര പ്രക്രിയ' },
  approvalTimeInfo: { en: 'After payment, account activation is manual and typically takes up to 3 hours. We appreciate your patience.', ml: 'പേയ്‌മെൻ്റിന് ശേഷം, അക്കൗണ്ട് ആക്റ്റിവേഷൻ നേരിട്ടുള്ളതാണ്, സാധാരണയായി 3 മണിക്കൂർ വരെ എടുത്തേക്കാം. നിങ്ങളുടെ ക്ഷമയെ ഞങ്ങൾ അഭിനന്ദിക്കുന്നു.' },
  checkPaymentStatusButton: { en: 'Confirm My Payment', ml: 'എൻ്റെ പേയ്‌മെൻ്റ് സ്ഥിരീകരിക്കുക' },
  paymentAlreadyApprovedTitle: { en: 'Payment Approved!', ml: 'പേയ്‌മെൻ്റ് അംഗീകരിച്ചു!' },
  paymentAlreadyApprovedDesc: { en: 'Your access to the course is active. Enjoy learning!', ml: 'കോഴ്സിലേക്കുള്ള നിങ്ങളുടെ പ്രവേശനം സജീവമാണ്. പഠനം ആസ്വദിക്കൂ!' },
  goToCourseButton: { en: 'Go to Course', ml: 'കോഴ്സിലേക്ക് പോകുക' },

};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const storedLang = localStorage.getItem('languagePreference') as Language;
        if (Object.values(Language).includes(storedLang)) {
            return storedLang;
        }
        return Language.EN;
    });

    useEffect(() => {
        localStorage.setItem('languagePreference', language);
        document.documentElement.lang = language;
    }, [language]);
    
    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const fontClassName = language === Language.ML ? 'font-malayalam' : 'font-sans';

    const translate = useCallback((key: string, fallback?: string, replacements?: Record<string, string | number>): string => {
        const translationSet = AppTranslations[key];
        let translatedString = fallback || key;

        if (translationSet && translationSet[language]) {
            translatedString = translationSet[language];
        }

        if (replacements) {
            Object.keys(replacements).forEach(placeholder => {
                translatedString = translatedString.replace(`{${placeholder}}`, String(replacements[placeholder]));
            });
        }
        
        return translatedString;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translate, fontClassName }}>
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

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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

  // Home Page (Existing & New)
  homeWelcomeTitle: { en: 'Welcome to TechAware360!', ml: 'ടെക്അവെയർ360-ലേക്ക് സ്വാഗതം!' },
  homeHeroSubtitle: { en: "Empowering you to navigate the digital world with confidence and skill. Your journey to digital literacy starts here.", ml: "ആത്മവിശ്വാസത്തോടും വൈദഗ്ധ്യത്തോടും കൂടി ഡിജിറ്റൽ ലോകത്ത് സഞ്ചരിക്കാൻ നിങ്ങളെ ശാക്തീകരിക്കുന്നു. ഡിജിറ്റൽ സാക്ഷരതയിലേക്കുള്ള നിങ്ങളുടെ യാത്ര ഇവിടെ ആരംഭിക്കുന്നു." },
  joinNowButton: { en: 'Get Started Now', ml: 'ഇപ്പോൾ ആരംഭിക്കുക' },
  goToCourseButtonHome: { en: 'Go to Your Course', ml: 'നിങ്ങളുടെ കോഴ്‌സിലേക്ക് പോകുക' },
  completeYourPaymentButtonHome: { en: 'Complete Your Payment', ml: 'നിങ്ങളുടെ പേയ്‌മെൻ്റ് പൂർത്തിയാക്കുക' },
  
  ourMissionTitle: { en: "Our Mission", ml: "ഞങ്ങളുടെ ദൗത്യം" },
  ourMissionText: { en: "To empower individuals with essential digital literacy skills for safe, smart, and confident navigation of the ever-evolving technological landscape. We believe in making tech awareness accessible to all.", ml: "നിരന്തരം വികസിച്ചുകൊണ്ടിരിക്കുന്ന സാങ്കേതിക ലോകത്ത് സുരക്ഷിതവും വിവേകപൂർണ്ണവും ആത്മവിശ്വാസമുള്ളതുമായ നാവിഗേഷനായി വ്യക്തികളെ അത്യാവശ്യ ഡിജിറ്റൽ സാക്ഷരതാ വൈദഗ്ധ്യം കൊണ്ട് ശാക്തീകരിക്കുക. സാങ്കേതിക അവബോധം എല്ലാവർക്കും ലഭ്യമാക്കുക എന്നതാണ് ഞങ്ങളുടെ ലക്ഷ്യം." },

  whyTechAwareTitle: { en: "Why Choose TechAware360?", ml: "എന്തുകൊണ്ട് ടെക്അവെയർ360 തിരഞ്ഞെടുക്കണം?" },
  benefit1Title: { en: "Expert-Led Content", ml: "വിദഗ്ധർ നയിക്കുന്ന ഉള്ളടക്കം" }, // Reused 'Zap' icon meaning changed slightly to 'Dynamic' or 'Up-to-date'
  benefit1Desc: { en: "Dynamic modules crafted by tech professionals, designed for real-world application and kept up-to-date.", ml: "സാങ്കേതിക വിദഗ്ധർ തയ്യാറാക്കിയ ചലനാത്മകമായ മൊഡ്യൂളുകൾ, യഥാർത്ഥ ലോക പ്രയോഗത്തിനായി രൂപകൽപ്പന ചെയ്തതും കാലികമായി നിലനിർത്തുന്നതും." },
  benefit2Title: { en: "Bilingual Learning", ml: "ദ്വിഭാഷാ പഠനം" },
  benefit2Desc: { en: "Learn complex topics in your preferred language, English or Malayalam, for better understanding.", ml: "സങ്കീർണ്ണമായ വിഷയങ്ങൾ നിങ്ങൾക്ക് ഇഷ്ടപ്പെട്ട ഭാഷയിൽ, ഇംഗ്ലീഷിലോ മലയാളത്തിലോ, മികച്ച ധാരണയ്ക്കായി പഠിക്കുക." },
  benefit3Title: { en: "Practical & Actionable Skills", ml: "പ്രായോഗികവും പ്രവർത്തനക്ഷമവുമായ വൈദഗ്ദ്ധ്യം" },
  benefit3Desc: { en: "Gain immediately applicable knowledge to protect yourself, your family, and your digital identity effectively.", ml: "നിങ്ങളെയും നിങ്ങളുടെ കുടുംബത്തെയും നിങ്ങളുടെ ഡിജിറ്റൽ ഐഡൻ്റിറ്റിയെയും ഫലപ്രദമായി സംരക്ഷിക്കാൻ ഉടനടി പ്രയോഗിക്കാൻ കഴിയുന്ന അറിവ് നേടുക." },

  howItWorksTitle: { en: "How It Works", ml: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു" },
  step1Title: { en: "1. Sign Up Easily", ml: "1. എളുപ്പത്തിൽ സൈൻ അപ്പ് ചെയ്യുക" },
  step1Desc: { en: "Quickly join using your Google account and get ready to start your learning journey.", ml: "നിങ്ങളുടെ Google അക്കൗണ്ട് ഉപയോഗിച്ച് വേഗത്തിൽ ചേരുക, നിങ്ങളുടെ പഠന യാത്ര ആരംഭിക്കാൻ തയ്യാറാകുക." },
  step2Title: { en: "2. Learn at Your Pace", ml: "2. നിങ്ങളുടെ വേഗതയിൽ പഠിക്കുക" },
  step2Desc: { en: "Access well-structured modules and topics sequentially, tracking your progress as you go.", ml: "നന്നായി ചിട്ടപ്പെടുത്തിയ മൊഡ്യൂളുകളും വിഷയങ്ങളും ക്രമമായി ആക്‌സസ് ചെയ്യുക, നിങ്ങളുടെ പുരോഗതി ട്രാക്ക് ചെയ്യുക." },
  step3Title: { en: "3. Get Empowered", ml: "3. ശാക്തീകരിക്കപ്പെടുക" },
  step3Desc: { en: "Apply your new knowledge to stay safe, make informed decisions, and use technology effectively.", ml: "സുരക്ഷിതമായിരിക്കാനും അറിവോടെയുള്ള തീരുമാനങ്ങൾ എടുക്കാനും സാങ്കേതികവിദ്യ ഫലപ്രദമായി ഉപയോഗിക്കാനും നിങ്ങളുടെ പുതിയ അറിവ് പ്രയോഗിക്കുക." },

  whatYouWillLearnTitle: { en: "What You'll Learn", ml: "നിങ്ങൾ എന്താണ് പഠിക്കാൻ പോകുന്നത്" },
  learnTopic1Title: { en: "Master Online Safety", ml: "ഓൺലൈൻ സുരക്ഷയിൽ വൈദഗ്ദ്ധ്യം" },
  learnTopic1Desc: { en: "Identify threats, avoid scams, and protect your accounts.", ml: "ഭീഷണികൾ തിരിച്ചറിയുക, തട്ടിപ്പുകൾ ഒഴിവാക്കുക, നിങ്ങളുടെ അക്കൗണ്ടുകൾ സംരക്ഷിക്കുക." },
  learnTopic2Title: { en: "Manage Digital Privacy", ml: "ഡിജിറ്റൽ സ്വകാര്യത കൈകാര്യം ചെയ്യുക" },
  learnTopic2Desc: { en: "Control your data, manage your digital footprint, and use privacy settings.", ml: "നിങ്ങളുടെ ഡാറ്റ നിയന്ത്രിക്കുക, ഡിജിറ്റൽ കാൽപ്പാടുകൾ കൈകാര്യം ചെയ്യുക, സ്വകാര്യതാ ക്രമീകരണങ്ങൾ ഉപയോഗിക്കുക." },
  learnTopic3Title: { en: "Think Critically Online", ml: "ഓൺലൈനിൽ വിമർശനാത്മകമായി ചിന്തിക്കുക" },
  learnTopic3Desc: { en: "Spot misinformation, evaluate sources, and navigate the web wisely.", ml: "തെറ്റായ വിവരങ്ങൾ കണ്ടെത്തുക, ഉറവിടങ്ങൾ വിലയിരുത്തുക, വെബിൽ വിവേകത്തോടെ സഞ്ചരിക്കുക." },
  learnTopic4Title: { en: "Effective Digital Communication", ml: "ഫലപ്രദമായ ഡിജിറ്റൽ ആശയവിനിമയം" },
  learnTopic4Desc: { en: "Communicate respectfully and securely across various platforms.", ml: "വിവിധ പ്ലാറ്റ്‌ഫോമുകളിൽ ബഹുമാനത്തോടെയും സുരക്ഷിതമായും ആശയവിനിമയം നടത്തുക." },
  learnTopic5Title: { en: "Boost Productivity with Tech", ml: "സാങ്കേതികവിദ്യ ഉപയോഗിച്ച് ഉത്പാദനക്ഷമത വർദ്ധിപ്പിക്കുക" },
  learnTopic5Desc: { en: "Utilize digital tools for learning, work, and daily tasks efficiently.", ml: "പഠനത്തിനും ജോലിക്കും ദൈനംദിന ജോലികൾക്കും ഡിജിറ്റൽ ടൂളുകൾ കാര്യക്ഷമമായി ഉപയോഗിക്കുക." },
  learnTopic6Title: { en: "Understand Digital Wellbeing", ml: "ഡിജിറ്റൽ സൗഖ്യം മനസ്സിലാക്കുക" },
  learnTopic6Desc: { en: "Maintain a healthy balance with technology and manage screen time.", ml: "സാങ്കേതികവിദ്യയുമായി ആരോഗ്യകരമായ ബാലൻസ് നിലനിർത്തുക, സ്ക്രീൻ സമയം നിയന്ത്രിക്കുക." },
  
  whoIsThisForTitle: { en: "Who Is This Course For?", ml: "ഈ കോഴ്‌സ് ആർക്കൊക്കെയാണ്?" },
  audience1Title: { en: "Students", ml: "വിദ്യാർത്ഥികൾ" },
  audience1Desc: { en: "Build a strong foundation for your academic and future career success in a digital world.", ml: "ഡിജിറ്റൽ ലോകത്ത് നിങ്ങളുടെ അക്കാദമികവും ഭാവിയിലുള്ളതുമായ തൊഴിൽ വിജയത്തിന് ശക്തമായ അടിത്തറയിടുക." },
  audience2Title: { en: "Parents & Guardians", ml: "രക്ഷിതാക്കളും രക്ഷിതാക്കളും" },
  audience2Desc: { en: "Guide your children safely online and foster responsible digital citizenship.", ml: "നിങ്ങളുടെ കുട്ടികളെ സുരക്ഷിതമായി ഓൺലൈനിൽ നയിക്കുകയും ഉത്തരവാദിത്തമുള്ള ഡിജിറ്റൽ പൗരത്വം വളർത്തുകയും ചെയ്യുക." },
  audience3Title: { en: "Professionals", ml: "പ്രൊഫഷണലുകൾ" },
  audience3Desc: { en: "Enhance your digital skills for better productivity, security, and career growth.", ml: "മികച്ച ഉത്പാദനക്ഷമത, സുരക്ഷ, കരിയർ വളർച്ച എന്നിവയ്ക്കായി നിങ്ങളുടെ ഡിജിറ്റൽ കഴിവുകൾ വർദ്ധിപ്പിക്കുക." },
  audience4Title: { en: "Lifelong Learners", ml: "ആജീവനാന്ത പഠിതാക്കൾ" },
  audience4Desc: { en: "Stay updated with evolving technology and navigate the digital age with confidence.", ml: "വികസിച്ചുകൊണ്ടിരിക്കുന്ന സാങ്കേതികവിദ്യയുമായി അപ്‌ഡേറ്റ് ചെയ്യുകയും ഡിജിറ്റൽ യുഗത്തിൽ ആത്മവിശ്വാസത്തോടെ സഞ്ചരിക്കുകയും ചെയ്യുക." },

  testimonialsTitle: { en: "What Our Learners Say", ml: "ഞങ്ങളുടെ പഠിതാക്കൾ പറയുന്നത്" },
  testimonial1Text: { en: "This course was incredibly insightful! I feel much more confident using technology now. The Malayalam explanations were a huge help.", ml: "ഈ കോഴ്‌സ് അവിശ്വസനീയമാംവിധം ഉൾക്കാഴ്ച നൽകുന്നതായിരുന്നു! സാങ്കേതികവിദ്യ ഉപയോഗിക്കുന്നതിൽ എനിക്കിപ്പോൾ കൂടുതൽ ആത്മവിശ്വാസമുണ്ട്. മലയാളത്തിലെ വിശദീകരണങ്ങൾ വലിയ സഹായമായിരുന്നു." },
  testimonial1Name: { en: "Anjali M.", ml: "അഞ്ജലി എം." },
  testimonial1Role: { en: "Parent & Homepreneur", ml: "രക്ഷിതാവും ഹോംപ്രണറും" },
  testimonial2Text: { en: "As a teacher, understanding digital safety is crucial. TechAware360 provided practical tips I can use and share. Highly recommended!", ml: "ഒരു അദ്ധ്യാപകൻ എന്ന നിലയിൽ, ഡിജിറ്റൽ സുരക്ഷ മനസ്സിലാക്കുന്നത് നിർണായകമാണ്. എനിക്ക് ഉപയോഗിക്കാനും പങ്കിടാനും കഴിയുന്ന പ്രായോഗിക നുറുങ്ങുകൾ ടെക്അവെയർ360 നൽകി. വളരെ ശുപാർശ ചെയ്യുന്നു!" },
  testimonial2Name: { en: "David K.", ml: "ഡേവിഡ് കെ." },
  testimonial2Role: { en: "High School Teacher", ml: "ഹൈസ്കൂൾ അദ്ധ്യാപകൻ" },

  exploreCourseButton: { en: "Explore Full Course", ml: "പൂർണ്ണമായ കോഴ്‌സ് കാണുക" },
  startJourneyTitle: { en: "Start Your Digital Empowerment Journey Today!", ml: "നിങ്ങളുടെ ഡിജിറ്റൽ ശാക്തീകരണ യാത്ര ഇന്ന് തന്നെ ആരംഭിക്കൂ!" },
  startJourneyDesc: { en: "Join a community of learners dedicated to mastering the digital world. Equip yourself with the knowledge and skills for a safer, smarter digital future.", ml: "ഡിജിറ്റൽ ലോകം കീഴടക്കാൻ പ്രതിജ്ഞാബദ്ധരായ പഠിതാക്കളുടെ ഒരു കമ്മ്യൂണിറ്റിയിൽ ചേരുക. സുരക്ഷിതവും മികച്ചതുമായ ഒരു ഡിജിറ്റൽ ഭാവിക്കായി അറിവും വൈദഗ്ധ്യവും നേടുക." },
  joinCourseTodayButton: { en: "Join the Course Today", ml: "ഇന്ന് തന്നെ കോഴ്‌സിൽ ചേരുക" },
  
  // Join Page (Updated and New)
  joinTitle: { en: 'Join or Sign In', ml: 'ചേരുക അല്ലെങ്കിൽ സൈൻ ഇൻ ചെയ്യുക' },
  signInToJoin: { en: 'Begin Your Journey - Sign In', ml: 'നിങ്ങളുടെ യാത്ര ആരംഭിക്കുക - സൈൻ ഇൻ ചെയ്യുക' },
  signInWithGoogleButton: { en: 'Continue with Google (Mock)', ml: 'Google ഉപയോഗിച്ച് തുടരുക (മോക്ക്)' },
  referralCodeActive: { en: 'Referral Code Active', ml: 'റഫറൽ കോഡ് സജീവമാണ്' },
  paymentAfterGoogleSignIn: {en: 'Payment details will be shown after sign-in if required.', ml: 'ആവശ്യമെങ്കിൽ സൈൻ ഇൻ ചെയ്ത ശേഷം പേയ്‌മെൻ്റ് വിശദാംശങ്ങൾ കാണിക്കും.'},
  loginFailedError: { en: 'Login failed. Please try again.', ml: 'ലോഗിൻ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.' },
  unexpectedError: { en: 'An unexpected error occurred.', ml: 'അപ്രതീക്ഷിതമായ ഒരു പിശക് സംഭവിച്ചു.' },
  
  // Payment Approval Page
  welcomeUser: { en: 'Welcome, {userName}!', ml: 'സ്വാഗതം, {userName}!' },
  completeYourPaymentPrompt: { en: 'To activate your course access, please complete your payment:', ml: 'നിങ്ങളുടെ കോഴ്‌സ് ആക്‌സസ് സജീവമാക്കുന്നതിന്, ദയവായി നിങ്ങളുടെ പേയ്‌മെൻ്റ് പൂർത്തിയാക്കുക:'},
  paymentNoteMentionEmail: { en: 'Important: Please mention your email ({userEmail}) or name in the payment reference/notes if possible.', ml: 'പ്രധാനം: സാധ്യമെങ്കിൽ പേയ്‌മെൻ്റ് റഫറൻസിലോ നോട്ടുകളിലോ നിങ്ങളുടെ ഇമെയിൽ ({userEmail}) അല്ലെങ്കിൽ പേര് പരാമർശിക്കുക.'},
  approvalProcessTitle: { en: 'Approval Process', ml: 'അംഗീകാര പ്രക്രിയ'},
  approvalTimeInfo: { en: 'After payment, account activation is manual and typically takes up to 3 hours. We appreciate your patience.', ml: 'പേയ്‌മെൻ്റിന് ശേഷം, അക്കൗണ്ട് ആക്റ്റിവേഷൻ മാനുവൽ ആണ്, സാധാരണയായി 3 മണിക്കൂർ വരെ എടുത്തേക്കാം. നിങ്ങളുടെ ക്ഷമയെ ഞങ്ങൾ അഭിനന്ദിക്കുന്നു.'},
  checkPaymentStatusButton: { en: 'Confirm My Payment', ml: 'എൻ്റെ പേയ്‌മെൻ്റ് സ്ഥിരീകരിക്കുക'},
  paymentApprovedMessage: { en: 'Payment approved! Redirecting to course...', ml: 'പേയ്‌മെൻ്റ് അംഗീകരിച്ചു! കോഴ്‌സിലേക്ക് റീഡയറക്‌ടുചെയ്യുന്നു...'},
  paymentPendingApprovalMessage: { en: 'Payment is still pending approval. Please check again in some time or contact support if it takes longer than 3 hours.', ml: 'പേയ്‌മെൻ്റ് ഇപ്പോഴും അംഗീകാരത്തിനായി കാത്തിരിക്കുന്നു. ദയവായി കുറച്ച് സമയത്തിന് ശേഷം വീണ്ടും പരിശോധിക്കുക അല്ലെങ്കിൽ 3 മണിക്കൂറിൽ കൂടുതൽ സമയമെടുക്കുകയാണെങ്കിൽ പിന്തുണയുമായി ബന്ധപ്പെടുക.'},
  paymentStatusCheckFailed: { en: 'Could not retrieve payment status. Please try again.', ml: 'പേയ്‌മെൻ്റ് നില വീണ്ടെടുക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.'},
  paymentStatusError: { en: 'Error checking payment status.', ml: 'പേയ്‌മെൻ്റ് നില പരിശോധിക്കുന്നതിൽ പിശക്.'},
  paymentAlreadyApprovedTitle: { en: 'Payment Approved!', ml: 'പേയ്‌മെൻ്റ് അംഗീകരിച്ചു!' },
  paymentAlreadyApprovedDesc: { en: 'Your access to the course is active. Enjoy learning!', ml: 'കോഴ്‌സിലേക്കുള്ള നിങ്ങളുടെ പ്രവേശനം സജീവമാണ്. പഠനം ആസ്വദിക്കൂ!' },
  goToCourseButton: { en: 'Go to Course', ml: 'കോഴ്‌സിലേക്ക് പോകുക' },


  // Old Join Page translations (some might be reused or adapted)
  priceInfo: { en: 'One-time Course Fee: ₹300', ml: 'ഒറ്റത്തവണ കോഴ്‌സ് ഫീസ്: ₹300' },
  referralRewardInfo: { en: 'Referral Reward: ₹100', ml: 'റഫറൽ റിവാർഡ്: ₹100' },
  paymentInstructionsTitle: { en: 'Payment Instructions', ml: 'പണമടയ്ക്കാനുള്ള നിർദ്ദേശങ്ങൾ' },
  paymentInstruction1: { en: 'Pay manually to UPI ID: your-upi-id@okhdfcbank (Placeholder)', ml: 'UPI ഐഡിയിലേക്ക് പണമടയ്ക്കുക: your-upi-id@okhdfcbank (Placeholder)' },
  
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
  footerMadeWithLove: { en: 'Made with ❤️ for digital empowerment', ml: 'ഡിജിറ്റൽ ശാക്തീകരണത്തിനായി ❤️ ഉപയോഗിച്ച് നിർമ്മിച്ചത്' },
  // General
  pageNotFound: { en: 'Page Not Found', ml: 'പേജ് കണ്ടെത്താനായില്ല' },
  goBackButton: { en: 'Go Back', ml: 'തിരികെ പോകുക' },
  referralCodeApplied: { en: 'Referral Code Applied:', ml: 'റഫറൽ കോഡ് പ്രയോഗിച്ചു:'},
  expand: { en: 'Expand', ml: 'വികസിപ്പിക്കുക' },
  collapse: { en: 'Collapse', ml: 'ചുരുക്കുക' },
  // Theme Toggle
  toggleTheme: { en: 'Toggle theme', ml: 'തീം മാറ്റുക' },
  lightModeAriaLabel: { en: 'Switch to light mode', ml: 'ലൈറ്റ് മോഡിലേക്ക് മാറുക' },
  darkModeAriaLabel: { en: 'Switch to dark mode', ml: 'ഡാർക്ക് മോഡിലേക്ക് മാറുക' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem('appLanguage') as Language;
    return storedLang && Object.values(Language).includes(storedLang) ? storedLang : Language.EN;
  });
  const [fontClassName, setFontClassName] = useState<string>('font-sans');

  useEffect(() => {
    setFontClassName(language === Language.ML ? 'font-malayalam' : 'font-sans');
    document.documentElement.lang = language;
  }, [language]);

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
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, translate, fontClassName }}>
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
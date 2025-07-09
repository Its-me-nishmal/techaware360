import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { useAuth } from '../AuthContext'; // Import useAuth
import HomePageLoader from '../components/HomePageLoader'; // Import the loader
import * as LucideIcons from 'lucide-react'; // Import all icons for dynamic use
import { 
  Rocket, ShieldCheck, Users, Globe, Sparkles, ShieldAlert, Fingerprint, Brain, GraduationCap,
  Zap, BookOpen, Lightbulb, UsersRound, MessagesSquare, Target, CheckCircle, Quote, CreditCard, PlayCircle
} from 'lucide-react';

const HomePage = () => {
  const { translate } = useLanguage();
  const auth = useAuth(); // Use Auth context
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 2500); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const benefitItemClass = "flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1";
  const benefitIconClass = "w-12 h-12 mb-4 text-primary dark:text-secondary";
  const stepIconClass = "w-16 h-16 mb-4 text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/20 p-3 rounded-full";
  const testimonialCardClass = "bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md";

  let heroButtonLink = "/join";
  let heroButtonText = translate('joinNowButton');
  let HeroButtonIcon = Rocket;

  if (auth.isAuthenticated) {
    if (auth.user?.paymentComplete) {
      heroButtonLink = "/course";
      heroButtonText = translate('goToCourseButtonHome');
      HeroButtonIcon = PlayCircle;
    } else {
      heroButtonLink = "/payment-approval";
      heroButtonText = translate('completeYourPaymentButtonHome');
      HeroButtonIcon = CreditCard;
    }
  }

  const learningAreas = [
    { iconName: 'ShieldAlert' as keyof typeof LucideIcons, titleKey: 'learnTopic1Title', descKey: 'learnTopic1Desc' },
    { iconName: 'Fingerprint' as keyof typeof LucideIcons, titleKey: 'learnTopic2Title', descKey: 'learnTopic2Desc' },
    { iconName: 'Brain' as keyof typeof LucideIcons, titleKey: 'learnTopic3Title', descKey: 'learnTopic3Desc' },
    { iconName: 'MessagesSquare' as keyof typeof LucideIcons, titleKey: 'learnTopic4Title', descKey: 'learnTopic4Desc' },
    { iconName: 'Lightbulb' as keyof typeof LucideIcons, titleKey: 'learnTopic5Title', descKey: 'learnTopic5Desc' },
    { iconName: 'CheckCircle' as keyof typeof LucideIcons, titleKey: 'learnTopic6Title', descKey: 'learnTopic6Desc' },
  ];

  if (isPageLoading) {
    return <HomePageLoader />;
  }

  return (
    <div className="animate-fadeIn"> {/* Apply fade-in to content after loader */}
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <ShieldCheck size={72} className="mx-auto text-primary dark:text-secondary mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6">
            {translate('homeWelcomeTitle')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            {translate('homeHeroSubtitle')}
          </p>
          <Link
            to={heroButtonLink}
            className="inline-flex items-center justify-center bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-10 rounded-lg text-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            <HeroButtonIcon size={22} className="mr-2.5" />
            {heroButtonText}
          </Link>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
            <Target size={48} className="mx-auto text-primary dark:text-secondary mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{translate('ourMissionTitle')}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
                {translate('ourMissionText')}
            </p>
        </div>
      </section>
      
      {/* Why Choose TechAware360 Section */}
      <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white text-center mb-12">
            {translate('whyTechAwareTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className={benefitItemClass}>
              <Zap className={benefitIconClass} />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">{translate('benefit1Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{translate('benefit1Desc')}</p>
            </div>
            <div className={benefitItemClass}>
              <Globe className={benefitIconClass} />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">{translate('benefit2Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{translate('benefit2Desc')}</p>
            </div>
            <div className={benefitItemClass}>
              <Sparkles className={benefitIconClass} />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">{translate('benefit3Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{translate('benefit3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white text-center mb-12">
            {translate('howItWorksTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-4">
              <UsersRound className={stepIconClass} />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">{translate('step1Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{translate('step1Desc')}</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <BookOpen className={stepIconClass} />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">{translate('step2Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{translate('step2Desc')}</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <GraduationCap className={stepIconClass} />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">{translate('step3Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{translate('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn (Expanded) Section */}
      <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white text-center mb-12">{translate('whatYouWillLearnTitle')}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {learningAreas.map((item, index) => {
                      const IconComponent = LucideIcons[item.iconName] as LucideIcons.LucideIcon;
                      return (
                          <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-start space-x-4">
                            {IconComponent ? (
                              <IconComponent className="w-8 h-8 text-primary dark:text-secondary flex-shrink-0 mt-1" />
                            ) : (
                              <LucideIcons.HelpCircle className="w-8 h-8 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-1" />
                            )}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-1">{translate(item.titleKey)}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{translate(item.descKey)}</p>
                            </div>
                          </div>
                      );
                  })}
              </div>
          </div>
      </section>

      {/* Who Is This Course For? Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white text-center mb-12">{translate('whoIsThisForTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {[
                    { title: 'audience1Title', desc: 'audience1Desc' },
                    { title: 'audience2Title', desc: 'audience2Desc' },
                    { title: 'audience3Title', desc: 'audience3Desc' },
                    { title: 'audience4Title', desc: 'audience4Desc' },
                ].map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h4 className="text-xl font-semibold text-primary dark:text-secondary mb-2">{translate(item.title)}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{translate(item.desc)}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* Testimonials Section (Mock) */}
      <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white text-center mb-12">
            {translate('testimonialsTitle')}
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className={testimonialCardClass}>
              <Quote className="text-primary dark:text-secondary opacity-50 mb-2" size={32} />
              <p className="text-gray-700 dark:text-gray-200 italic mb-3">"{translate('testimonial1Text')}"</p>
              <p className="font-semibold text-gray-800 dark:text-white">{translate('testimonial1Name')}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{translate('testimonial1Role')}</p>
            </div>
            <div className={testimonialCardClass}>
              <Quote className="text-primary dark:text-secondary opacity-50 mb-2" size={32} />
              <p className="text-gray-700 dark:text-gray-200 italic mb-3">"{translate('testimonial2Text')}"</p>
              <p className="font-semibold text-gray-800 dark:text-white">{translate('testimonial2Name')}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{translate('testimonial2Role')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-16 md:py-20 bg-primary dark:bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {translate('startJourneyTitle')}
          </h2>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            {translate('startJourneyDesc')}
          </p>
          <Link
            to={heroButtonLink} // Use dynamic link
            className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-primary dark:text-blue-700 font-semibold py-3 px-10 rounded-lg text-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <HeroButtonIcon size={22} className="mr-2.5" /> {/* Use dynamic icon */}
            {heroButtonText} {/* Use dynamic text */}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
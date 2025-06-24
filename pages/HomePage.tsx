import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { Rocket, ShieldCheck, Users, Globe, Sparkles, ShieldAlert, Fingerprint, Brain, GraduationCap } from 'lucide-react';

const HomePage = () => {
  const { translate } = useLanguage();

  const benefitItemClass = "flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow";
  const benefitIconClass = "w-12 h-12 mb-4 text-primary dark:text-secondary";
  const learningAreaIconClass = "w-10 h-10 mb-3 text-primary dark:text-secondary";

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <ShieldCheck size={72} className="mx-auto text-primary dark:text-secondary mb-6" />
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          {translate('homeWelcomeTitle')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {translate('homeHeroSubtitle')}
        </p>
        <Link
          to="/join"
          className="inline-flex items-center justify-center bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
        >
          <Rocket size={20} className="mr-2" />
          {translate('joinNowButton')}
        </Link>
      </section>

      {/* Why Choose TechAware360 Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800 rounded-lg my-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-10">
          {translate('whyTechAwareTitle')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 px-4">
          <div className={benefitItemClass}>
            <Users className={benefitIconClass} />
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
      </section>

      {/* Key Learning Areas Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-10">
          {translate('keyLearningAreasTitle')}
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <ShieldAlert className={learningAreaIconClass} />
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-2">{translate('learningArea1Title')}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{translate('learningArea1Desc')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <Fingerprint className={learningAreaIconClass} />
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-2">{translate('learningArea2Title')}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{translate('learningArea2Desc')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
            <Brain className={learningAreaIconClass} />
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-2">{translate('learningArea3Title')}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{translate('learningArea3Desc')}</p>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            to="/course"
            className="inline-flex items-center justify-center bg-secondary hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg text-md shadow-md hover:shadow-lg transition-all"
          >
            <GraduationCap size={18} className="mr-2" />
            {translate('exploreCourseButton')}
          </Link>
        </div>
      </section>

      {/* Start Your Journey Section */}
      <section className="py-12 bg-primary dark:bg-blue-700 text-white rounded-lg my-12">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            {translate('startJourneyTitle')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {translate('startJourneyDesc')}
          </p>
          <Link
            to="/join"
            className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-primary dark:text-blue-700 font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <Rocket size={20} className="mr-2" />
            {translate('joinCourseTodayButton')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courseData } from '../courses';
import { CourseCategory, Language, Topic } from '../types';
import TopicItem from '../components/TopicItem';
import { useLanguage } from '../i18n';
import { useCourseProgress } from '../CourseProgressContext';
import { ArrowLeftCircle, ListChecks, Lock, Loader2, Info } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const CategoryDetailPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { language, translate } = useLanguage();
  const navigate = useNavigate();
  const { 
    isLoading, 
    isCategoryUnlocked,
    isTopicUnlocked,
    isTopicCompleted,
    getCategoryProgress,
    markTopicAsComplete // Mark as complete is handled by TopicItem itself
  } = useCourseProgress();
  
  const categories: CourseCategory[] = courseData as CourseCategory[];
  const category = categories.find(cat => cat.slug === categorySlug);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-red-500">{translate('categoryNotFound', 'Category not found.')}</p>
        <Link to="/course" className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded hover:bg-blue-600">
          {translate('goBackButton')}
        </Link>
      </div>
    );
  }

  if (!isCategoryUnlocked(category.slug)) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Lock size={48} className="mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
          {translate('locked')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {translate('categoryLockedMessage')}
        </p>
        <button
          onClick={() => navigate('/course')}
          className="inline-flex items-center bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-md shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeftCircle size={18} className="mr-2" />
          {translate('goBackButton')} ({translate('navCourse')})
        </button>
      </div>
    );
  }

  const categoryName = language === Language.EN ? category.category_en : category.category_ml;
  const IconComponent = category.icon ? (LucideIcons as any)[category.icon] as LucideIcons.LucideIcon : ListChecks;
  const progress = getCategoryProgress(category.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/course" className="inline-flex items-center text-primary dark:text-secondary hover:underline mb-6">
        <ArrowLeftCircle size={20} className="mr-2" />
        {translate('goBackButton')} ({translate('navCourse')})
      </Link>
      
      <div className="mb-8">
        <div className="flex items-center mb-2">
          {IconComponent && <IconComponent size={40} className="mr-4 text-primary dark:text-secondary" />}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
            {translate('topicsIn')} {categoryName}
          </h1>
        </div>
        {progress && progress.total > 0 && (
           <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded-md shadow flex items-center">
            <Info size={18} className="mr-2 text-blue-500" />
            <span>{translate('topicsCompleted', undefined, { completedCount: progress.completed, totalCount: progress.total })}</span>
          </div>
        )}
      </div>

      {category.topics.length > 0 ? (
        <div className="space-y-4">
          {category.topics.map((topic: Topic, index: number) => (
            <TopicItem 
              key={index} 
              topic={topic} 
              topicIndex={index}
              categorySlug={category.slug}
              isUnlocked={isTopicUnlocked(category.slug, index)}
              isCompleted={isTopicCompleted(category.slug, index)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          {translate('noTopicsFound', 'No topics available in this category yet.')}
        </p>
      )}
    </div>
  );
};

export default CategoryDetailPage;
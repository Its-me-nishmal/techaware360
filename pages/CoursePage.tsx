import React from 'react';
import CategoryCard from '../components/CategoryCard';
import { courseData } from '../courses';
import { CourseCategory } from '../types';
import { useLanguage } from '../i18n';
import { useCourseProgress } from '../CourseProgressContext';
import { LayoutGrid, Loader2, BarChart3 } from 'lucide-react';

const CoursePage = () => {
  const { translate } = useLanguage();
  const { 
    isLoading, 
    getOverallCourseProgress,
    isCategoryUnlocked,
    isCategoryCompleted,
    getCategoryProgress
  } = useCourseProgress();
  
  const categories: CourseCategory[] = courseData as CourseCategory[];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  const overallProgress = getOverallCourseProgress();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <LayoutGrid size={48} className="mx-auto text-primary dark:text-secondary mb-4" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          {translate('courseTitle')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {translate('selectCategoryPrompt')}
        </p>
        {overallProgress.totalCategories > 0 && (
          <div className="flex items-center justify-center text-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow max-w-md mx-auto">
            <BarChart3 size={20} className="mr-2 text-primary dark:text-secondary" />
            <span>{translate('overallCourseProgress')}: </span>
            <span className="font-semibold ml-1">
              {translate('categoriesCompleted', undefined, { completedCount: overallProgress.completedCategories, totalCount: overallProgress.totalCategories })}
            </span>
          </div>
        )}
      </div>
      
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard 
              key={category.slug} 
              category={category}
              isUnlocked={isCategoryUnlocked(category.slug)}
              isCompleted={isCategoryCompleted(category.slug)}
              progress={getCategoryProgress(category.slug)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          {translate('noCategoriesFound', 'No course categories available at the moment.')}
        </p>
      )}
    </div>
  );
};

export default CoursePage;
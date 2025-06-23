
import React from 'react';
import CategoryCard from '../components/CategoryCard';
import {courseData} from '../courses';
import { CourseCategory } from '../types';
import { useLanguage } from '../i18n';
import { LayoutGrid } from 'lucide-react';

const CoursePage = () => {
  const { translate } = useLanguage();
  const categories: CourseCategory[] = courseData as CourseCategory[];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <LayoutGrid size={48} className="mx-auto text-primary dark:text-secondary mb-4" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          {translate('courseTitle')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {translate('selectCategoryPrompt')}
        </p>
      </div>
      
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
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

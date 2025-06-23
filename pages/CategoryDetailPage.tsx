
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {courseData} from '../courses';
import { CourseCategory, Language, Topic } from '../types';
import TopicItem from '../components/TopicItem';
import { useLanguage } from '../i18n';
import { ArrowLeftCircle, ListChecks } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const CategoryDetailPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { language, translate } = useLanguage();
  
  const categories: CourseCategory[] = courseData as CourseCategory[];
  const category = categories.find(cat => cat.slug === categorySlug);

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

  const categoryName = language === Language.EN ? category.category_en : category.category_ml;
  const IconComponent = category.icon ? (LucideIcons as any)[category.icon] as LucideIcons.LucideIcon : ListChecks;


  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/course" className="inline-flex items-center text-primary dark:text-secondary hover:underline mb-6">
        <ArrowLeftCircle size={20} className="mr-2" />
        {translate('goBackButton')} ({translate('navCourse')})
      </Link>
      
      <div className="flex items-center mb-8">
        {IconComponent && <IconComponent size={40} className="mr-4 text-primary dark:text-secondary" />}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
          {translate('topicsIn')} {categoryName}
        </h1>
      </div>

      {category.topics.length > 0 ? (
        <div className="space-y-4">
          {category.topics.map((topic: Topic, index: number) => (
            <TopicItem key={index} topic={topic} />
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

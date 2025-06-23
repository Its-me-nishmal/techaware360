
import React from 'react';
import { Link } from 'react-router-dom';
import { CourseCategory, Language } from '../types';
import { useLanguage } from '../i18n';
import * as LucideIcons from 'lucide-react'; // Import all icons

interface CategoryCardProps {
  category: CourseCategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { language, translate } = useLanguage();

  // Dynamically get the Icon component
  const IconComponent = category.icon ? (LucideIcons as any)[category.icon] as LucideIcons.LucideIcon : LucideIcons.BookOpen;


  return (
    <Link
      to={`/course/${category.slug}`}
      className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1"
    >
      <div className="flex items-center mb-3">
        {IconComponent && <IconComponent size={32} className="mr-3 text-primary dark:text-secondary" />}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {language === Language.EN ? category.category_en : category.category_ml}
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {language === Language.EN ? `Explore topics related to ${category.category_en}.` : `${category.category_ml} സംബന്ധിച്ച വിഷയങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക.`}
      </p>
      <span className="inline-block bg-primary hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors">
        {translate('viewTopicsButton')}
      </span>
    </Link>
  );
};

export default CategoryCard;

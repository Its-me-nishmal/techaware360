import React from 'react';
import { Link } from 'react-router-dom';
import { CourseCategory, Language } from '../types';
import { useLanguage } from '../i18n';
import * as LucideIcons from 'lucide-react';

interface CategoryCardProps {
  category: CourseCategory;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: { completed: number; total: number } | null;
}

const CategoryCard = ({ category, isUnlocked, isCompleted, progress }: CategoryCardProps) => {
  const { language, translate } = useLanguage();

  const IconComponent = category.icon ? (LucideIcons as any)[category.icon] as LucideIcons.LucideIcon : LucideIcons.BookOpen;
  const cardTitle = language === Language.EN ? category.category_en : category.category_ml;

  let cardClasses = "block p-6 rounded-lg shadow-lg transition-all transform ";
  let statusIcon = null;
  let statusText = "";

  if (!isUnlocked) {
    cardClasses += "bg-gray-200 dark:bg-gray-700 opacity-60 cursor-not-allowed";
    statusIcon = <LucideIcons.Lock size={18} className="mr-2 text-gray-500 dark:text-gray-400" />;
    statusText = `(${translate('locked')})`;
  } else if (isCompleted) {
    cardClasses += "bg-green-50 dark:bg-green-900 border-2 border-green-500 hover:shadow-xl hover:-translate-y-1";
    statusIcon = <LucideIcons.CheckCircle2 size={18} className="mr-2 text-green-600 dark:text-green-400" />;
    statusText = `(${translate('completed')})`;
  } else {
    cardClasses += "bg-white dark:bg-gray-800 hover:shadow-xl hover:-translate-y-1";
  }
  
  const content = (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
         {IconComponent && <IconComponent size={32} className={`mr-3 ${!isUnlocked ? 'text-gray-400' : 'text-primary dark:text-secondary'}`} />}
          <h3 className={`text-xl font-semibold ${!isUnlocked ? 'text-gray-600 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}>
            {cardTitle}
          </h3>
        </div>
        {statusIcon && <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">{statusIcon} {statusText}</div>}
      </div>

      <p className={`text-sm mb-4 ${!isUnlocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}>
        {language === Language.EN ? `Explore topics related to ${category.category_en}.` : `${category.category_ml} സംബന്ധിച്ച വിഷയങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക.`}
      </p>

      {isUnlocked && progress && progress.total > 0 && !isCompleted && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>{translate('topicsCompleted', undefined, { completedCount: progress.completed, totalCount: progress.total })}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${(progress.completed / progress.total) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <span className={`inline-block text-sm font-medium py-2 px-4 rounded-md transition-colors ${
        !isUnlocked 
          ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400' 
          : isCompleted 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-primary hover:bg-blue-600 text-white'
      }`}>
        {isCompleted ? translate('completed') : translate('viewTopicsButton')}
      </span>
    </>
  );

  if (!isUnlocked) {
    return (
      <div className={cardClasses} aria-disabled="true" title={translate('categoryLockedMessage')}>
        {content}
      </div>
    );
  }

  return (
    <Link to={`/course/${category.slug}`} className={cardClasses}>
      {content}
    </Link>
  );
};

export default CategoryCard;
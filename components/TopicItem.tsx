import React, { useState, useEffect, useRef } from 'react';
import { Topic, Language } from '../types';
import { useLanguage } from '../i18n';
import { useCourseProgress, MIN_READ_TIME_MS } from '../CourseProgressContext';
import { ChevronDown, ChevronUp, Lock, CheckCircle, Clock } from 'lucide-react';

interface TopicItemProps {
  topic: Topic;
  topicIndex: number;
  categorySlug: string;
  isUnlocked: boolean;
  isCompleted: boolean;
}

const TopicItem = ({ topic, topicIndex, categorySlug, isUnlocked, isCompleted }: TopicItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const { language, translate } = useLanguage();
  const { markTopicAsComplete } = useCourseProgress();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const title = language === Language.EN ? topic.title_en : topic.title_ml;
  const content = language === Language.EN ? topic.content_en : topic.content_ml;

  useEffect(() => {
    // Cleanup timer if component unmounts or dependencies change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleToggleOpen = () => {
    if (!isUnlocked) return;

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen && !isCompleted && isUnlocked) {
      setIsReading(true);
      timerRef.current = setTimeout(() => {
        markTopicAsComplete(categorySlug, topicIndex);
        setIsReading(false);
        // No need to close, user can read as long as they want
      }, MIN_READ_TIME_MS);
    } else if (!newIsOpen && timerRef.current) {
      // If closed before timer finishes
      clearTimeout(timerRef.current);
      timerRef.current = null;
      setIsReading(false);
    }
  };
  
  let buttonClasses = "w-full flex justify-between items-center p-4 focus:outline-none transition-colors ";
  let titleClasses = "text-lg font-medium text-left ";
  let iconJsx;

  if (!isUnlocked) {
    buttonClasses += "bg-gray-200 dark:bg-gray-700 opacity-70 cursor-not-allowed";
    titleClasses += "text-gray-500 dark:text-gray-400";
    iconJsx = <Lock size={20} className="text-gray-500 dark:text-gray-400" />;
  } else if (isCompleted) {
    buttonClasses += "bg-green-50 dark:bg-green-800 hover:bg-green-100 dark:hover:bg-green-700";
    titleClasses += "text-green-700 dark:text-green-200";
    iconJsx = <CheckCircle size={20} className="text-green-600 dark:text-green-400" />;
  } else {
    buttonClasses += "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600";
    titleClasses += "text-gray-800 dark:text-gray-100";
    iconJsx = isOpen 
      ? <ChevronUp size={20} className="text-primary dark:text-secondary" /> 
      : <ChevronDown size={20} className="text-primary dark:text-secondary" />;
  }


  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden ${!isUnlocked ? 'opacity-60' : ''}`}>
      <button
        onClick={handleToggleOpen}
        className={buttonClasses}
        disabled={!isUnlocked}
        aria-expanded={isOpen}
        aria-controls={`topic-content-${categorySlug}-${topicIndex}`}
        title={!isUnlocked ? translate('topicLockedMessage') : (isCompleted ? translate('completed') : title)}
      >
        <h4 className={titleClasses}>{title}</h4>
        <div className="flex items-center space-x-2">
          {isReading && !isCompleted && <Clock size={18} className="animate-spin text-blue-500" title={translate('readingTopic')} />}
          {iconJsx}
        </div>
      </button>
      {isOpen && isUnlocked && (
        <div 
          id={`topic-content-${categorySlug}-${topicIndex}`}
          className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600"
        >
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{content}</p>
        </div>
      )}
      {isOpen && !isUnlocked && (
         <div 
          id={`topic-content-${categorySlug}-${topicIndex}`}
          className="p-4 bg-gray-100 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-600 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center">
            <Lock size={18} className="mr-2"/> {translate('topicLockedMessage')}
          </p>
        </div>
      )}
    </div>
  );
};

export default TopicItem;
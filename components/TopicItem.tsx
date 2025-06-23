
import React, { useState } from 'react';
import { Topic, Language } from '../types';
import { useLanguage } from '../i18n';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TopicItemProps {
  topic: Topic;
}

const TopicItem = ({ topic }: TopicItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, translate } = useLanguage();

  const title = language === Language.EN ? topic.title_en : topic.title_ml;
  const content = language === Language.EN ? topic.content_en : topic.content_ml;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none"
      >
        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 text-left">{title}</h4>
        <div className="text-primary dark:text-secondary">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{content}</p>
        </div>
      )}
    </div>
  );
};

export default TopicItem;

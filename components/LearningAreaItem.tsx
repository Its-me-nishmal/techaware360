import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import * as LucideIcons from 'lucide-react';
import { useLanguage } from '../i18n';

interface LearningAreaItemProps {
  iconName: keyof typeof LucideIcons;
  titleKey: string;
  descKey: string;
  animationClass: string;
}

const LearningAreaItem: React.FC<LearningAreaItemProps> = ({ iconName, titleKey, descKey, animationClass }) => {
  const { translate } = useLanguage();
  const itemRef = useScrollAnimation<HTMLDivElement>({ animationClass, threshold: 0.2, triggerOnce: true });
  const IconComponent = LucideIcons[iconName] as LucideIcons.LucideIcon; // Type assertion

  return (
    <div ref={itemRef} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-start space-x-4 animate-on-scroll">
      {IconComponent ? (
        <IconComponent className="w-8 h-8 text-primary dark:text-secondary flex-shrink-0 mt-1" />
      ) : (
        <LucideIcons.HelpCircle className="w-8 h-8 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-1" /> // Fallback icon
      )}
      <div>
        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-1">{translate(titleKey)}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{translate(descKey)}</p>
      </div>
    </div>
  );
};

export default LearningAreaItem;
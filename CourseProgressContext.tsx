import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import axios from 'axios';
import { courseData } from './courses';
import { CourseCategory, Topic } from './types';

export const MIN_READ_TIME_MS = 15000;
const LOCAL_STORAGE_KEY = 'techAwareCourseProgress';
const API_BASE_URL = 'https://techawre-backend.vercel.app/api';

interface CourseProgressData {
  completedTopics: Record<string, number[]>;
}

interface CourseProgressContextType {
  completedTopics: Record<string, number[]>;
  markTopicAsComplete: (categorySlug: string, topicIndex: number) => Promise<void>;
  isTopicCompleted: (categorySlug: string, topicIndex: number) => boolean;
  isTopicUnlocked: (categorySlug: string, topicIndex: number) => boolean;
  isCategoryCompleted: (categorySlug: string) => boolean;
  isCategoryUnlocked: (categorySlug: string) => boolean;
  getCategoryProgress: (categorySlug: string) => { completed: number; total: number } | null;
  getOverallCourseProgress: () => { completedCategories: number; totalCategories: number };
  isLoading: boolean;
}

const CourseProgressContext = createContext<CourseProgressContextType | undefined>(undefined);

export const CourseProgressProvider = ({ children }: { children: ReactNode }) => {
  const [completedTopics, setCompletedTopics] = useState<Record<string, number[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const allCategories: CourseCategory[] = courseData;

  // Load progress from backend
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const token = localStorage.getItem('techAwareAuthToken');
        if (!token) throw new Error('No token found');

        const res = await axios.get(`${API_BASE_URL}/course/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCompletedTopics(res.data.courseProgress || {});
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ completedTopics: res.data.courseProgress }));
      } catch (error) {
        console.warn('Could not fetch course progress from server:', error);
        // Fallback to localStorage
        try {
          const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (stored) {
            const parsed: CourseProgressData = JSON.parse(stored);
            setCompletedTopics(parsed.completedTopics || {});
          }
        } catch (err) {
          console.error('Failed to load from localStorage:', err);
          setCompletedTopics({});
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, []);

  const getCategoryBySlug = useCallback(
    (slug: string): CourseCategory | undefined => allCategories.find(cat => cat.slug === slug),
    [allCategories]
  );

  const getCategoryIndex = useCallback(
    (slug: string): number => allCategories.findIndex(cat => cat.slug === slug),
    [allCategories]
  );

  const isCategoryCompleted = useCallback(
    (categorySlug: string): boolean => {
      const category = getCategoryBySlug(categorySlug);
      if (!category) return false;
      const numTopics = category.topics.length;
      const completed = (completedTopics[categorySlug] || []).length;
      return numTopics === completed;
    },
    [completedTopics, getCategoryBySlug]
  );

  const isCategoryUnlocked = useCallback(
    (categorySlug: string): boolean => {
      const index = getCategoryIndex(categorySlug);
      if (index === -1) return false;
      if (index === 0) return true;

      const prevSlug = allCategories[index - 1]?.slug;
      return prevSlug ? isCategoryCompleted(prevSlug) : false;
    },
    [allCategories, getCategoryIndex, isCategoryCompleted]
  );

  const isTopicCompleted = useCallback(
    (categorySlug: string, topicIndex: number): boolean =>
      (completedTopics[categorySlug] || []).includes(topicIndex),
    [completedTopics]
  );

  const isTopicUnlocked = useCallback(
    (categorySlug: string, topicIndex: number): boolean => {
      if (!isCategoryUnlocked(categorySlug)) return false;

      const category = getCategoryBySlug(categorySlug);
      if (!category || topicIndex < 0 || topicIndex >= category.topics.length) return false;

      if (topicIndex === 0) return true;
      return isTopicCompleted(categorySlug, topicIndex - 1);
    },
    [isCategoryUnlocked, isTopicCompleted, getCategoryBySlug]
  );

  const markTopicAsComplete = async (categorySlug: string, topicIndex: number) => {
    if (!isTopicUnlocked(categorySlug, topicIndex)) {
      console.warn('Topic is not unlocked yet');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found, cannot sync with backend');
    }

    try {
      await axios.post(
        `${API_BASE_URL}/course/progress`,
        { categorySlug, topicIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Error sending progress to backend:', err);
    }

    // Update local state
    setCompletedTopics(prev => {
      const current = prev[categorySlug] || [];
      if (!current.includes(topicIndex)) {
        return {
          ...prev,
          [categorySlug]: [...current, topicIndex].sort((a, b) => a - b),
        };
      }
      return prev;
    });
  };

  const getCategoryProgress = useCallback(
    (categorySlug: string): { completed: number; total: number } | null => {
      const category = getCategoryBySlug(categorySlug);
      if (!category) return null;
      return {
        completed: (completedTopics[categorySlug] || []).length,
        total: category.topics.length,
      };
    },
    [completedTopics, getCategoryBySlug]
  );

  const getOverallCourseProgress = useCallback(() => {
    const total = allCategories.length;
    const completed = allCategories.filter(cat => isCategoryCompleted(cat.slug)).length;
    return { completedCategories: completed, totalCategories: total };
  }, [allCategories, isCategoryCompleted]);

  return (
    <CourseProgressContext.Provider
      value={{
        completedTopics,
        markTopicAsComplete,
        isTopicCompleted,
        isTopicUnlocked,
        isCategoryCompleted,
        isCategoryUnlocked,
        getCategoryProgress,
        getOverallCourseProgress,
        isLoading,
      }}
    >
      {children}
    </CourseProgressContext.Provider>
  );
};

export const useCourseProgress = () => {
  const context = useContext(CourseProgressContext);
  if (!context) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
};

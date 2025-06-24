import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { courseData } from './courses';
import { CourseCategory, Topic } from './types';

export const MIN_READ_TIME_MS = 15000; // 15 seconds
const LOCAL_STORAGE_KEY = 'techAwareCourseProgress';

interface CourseProgressData {
  completedTopics: Record<string, number[]>; // categorySlug: [topicIndex, ...]
}

interface CourseProgressContextType {
  completedTopics: Record<string, number[]>;
  markTopicAsComplete: (categorySlug: string, topicIndex: number) => void;
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
  const allCategories: CourseCategory[] = courseData as CourseCategory[];

  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedProgress) {
        const parsedProgress: CourseProgressData = JSON.parse(storedProgress);
        setCompletedTopics(parsedProgress.completedTopics || {});
      }
    } catch (error) {
      console.error("Failed to load course progress from localStorage:", error);
      // Initialize with empty if parsing fails or no data
      setCompletedTopics({});
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        const progressToStore: CourseProgressData = { completedTopics };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progressToStore));
      } catch (error) {
        console.error("Failed to save course progress to localStorage:", error);
      }
    }
  }, [completedTopics, isLoading]);

  const getCategoryBySlug = useCallback((slug: string): CourseCategory | undefined => {
    return allCategories.find(cat => cat.slug === slug);
  }, [allCategories]);
  
  const getCategoryIndex = useCallback((slug: string): number => {
    return allCategories.findIndex(cat => cat.slug === slug);
  }, [allCategories]);

  const isCategoryCompleted = useCallback((categorySlug: string): boolean => {
    const category = getCategoryBySlug(categorySlug);
    if (!category) return false;
    const numTopics = category.topics.length;
    if (numTopics === 0) return true; // Empty category is considered complete
    const numCompletedInCat = (completedTopics[categorySlug] || []).length;
    return numCompletedInCat === numTopics;
  }, [completedTopics, getCategoryBySlug]);

  const isCategoryUnlocked = useCallback((categorySlug: string): boolean => {
    const catIndex = getCategoryIndex(categorySlug);
    if (catIndex === -1) return false; // Category not found
    if (catIndex === 0) return true; // First category is always unlocked

    const prevCategorySlug = allCategories[catIndex - 1]?.slug;
    if (!prevCategorySlug) return false; // Should not happen if catIndex > 0

    return isCategoryCompleted(prevCategorySlug);
  }, [allCategories, getCategoryIndex, isCategoryCompleted]);

  const isTopicCompleted = useCallback((categorySlug: string, topicIndex: number): boolean => {
    return (completedTopics[categorySlug] || []).includes(topicIndex);
  }, [completedTopics]);

  const isTopicUnlocked = useCallback((categorySlug: string, topicIndex: number): boolean => {
    if (!isCategoryUnlocked(categorySlug)) return false;

    const category = getCategoryBySlug(categorySlug);
    if (!category || topicIndex < 0 || topicIndex >= category.topics.length) return false;
    
    if (topicIndex === 0) return true; // First topic in an unlocked category is always unlocked
    
    return isTopicCompleted(categorySlug, topicIndex - 1);
  }, [isCategoryUnlocked, isTopicCompleted, getCategoryBySlug]);

  const markTopicAsComplete = (categorySlug: string, topicIndex: number) => {
    setCompletedTopics(prev => {
      const currentCategoryCompletions = prev[categorySlug] || [];
      if (!currentCategoryCompletions.includes(topicIndex)) {
        return {
          ...prev,
          [categorySlug]: [...currentCategoryCompletions, topicIndex].sort((a,b) => a-b),
        };
      }
      return prev;
    });
  };

  const getCategoryProgress = useCallback((categorySlug: string): { completed: number; total: number } | null => {
    const category = getCategoryBySlug(categorySlug);
    if (!category) return null;
    const total = category.topics.length;
    const completed = (completedTopics[categorySlug] || []).length;
    return { completed, total };
  }, [completedTopics, getCategoryBySlug]);

  const getOverallCourseProgress = useCallback((): { completedCategories: number; totalCategories: number } => {
    const totalCategories = allCategories.length;
    let completedCategoriesCount = 0;
    allCategories.forEach(cat => {
      if (isCategoryCompleted(cat.slug)) {
        completedCategoriesCount++;
      }
    });
    return { completedCategories: completedCategoriesCount, totalCategories };
  }, [allCategories, isCategoryCompleted]);

  return (
    <CourseProgressContext.Provider value={{
      completedTopics,
      markTopicAsComplete,
      isTopicCompleted,
      isTopicUnlocked,
      isCategoryCompleted,
      isCategoryUnlocked,
      getCategoryProgress,
      getOverallCourseProgress,
      isLoading
    }}>
      {children}
    </CourseProgressContext.Provider>
  );
};

export const useCourseProgress = () => {
  const context = useContext(CourseProgressContext);
  if (context === undefined) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
};
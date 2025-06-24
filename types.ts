

export enum Language {
  EN = 'en',
  ML = 'ml',
}

export interface Topic {
  title_en: string;
  title_ml: string;
  content_en: string;
  content_ml: string;
}

export interface CourseCategory {
  slug: string;
  category_en: string;
  category_ml: string;
  icon?: string; // Optional: for icon name from lucide-react
  topics: Topic[];
}

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, fallback?: string, replacements?: Record<string, string | number>) => string;
}
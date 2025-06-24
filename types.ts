
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
  icon?: string; 
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
  fontClassName: string; // Added for dynamic font switching
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// User data obtained from Google (mocked)
export interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  profilePicUrl?: string;
}

// Authenticated user details stored in AuthContext
export interface AuthenticatedUser extends GoogleUser {
  paymentComplete: boolean;
  // Any other app-specific user details can be added here
}

export interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthenticatedUser | null;
  token: string | null;
  login: (googleAuthData: GoogleUser, referralCode?: string | null) => Promise<{ success: boolean; needsPayment?: boolean; message?: string }>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
  updateUserPaymentStatus: (email: string) => Promise<{ success: boolean; message?: string }>;
}
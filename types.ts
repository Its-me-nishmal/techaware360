

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

// Data from Google that isn't part of our main user model yet
export interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  profilePicUrl?: string;
}

// Authenticated user details stored in AuthContext, now received from backend
export interface AuthenticatedUser {
  googleId: string;
  email: string;
  name: string;
  profilePicUrl?: string;
  paymentComplete: boolean;
  referralCode: string | null; // Added referralCode
  // Any other app-specific user details can be added here
}

export interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthenticatedUser | null;
  token: string | null;
  login: (idToken: string, referralCode?: string | null) => Promise<{ success: boolean; needsPayment?: boolean; message?: string }>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
  updateUserPaymentStatus: () => Promise<{ success: boolean; message?: string }>;
}

// Extend the window object for Google Sign-In
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: any) => void; }) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
        };
      };
    };
  }
}

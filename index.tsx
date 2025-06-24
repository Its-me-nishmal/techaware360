
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Using HashRouter
import App from './App';
import { LanguageProvider } from './i18n';
import { CourseProgressProvider } from './CourseProgressContext';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext'; // Import AuthProvider

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider> {/* Add AuthProvider here, wrapping CourseProgressProvider */}
            <CourseProgressProvider>
              <App />
            </CourseProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </HashRouter>
  </React.StrictMode>
);
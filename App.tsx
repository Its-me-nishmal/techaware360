
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import CoursePage from './pages/CoursePage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import ReferralPage from './pages/ReferralPage';
import NotFoundPage from './pages/NotFoundPage';
import PaymentApprovalPage from './pages/PaymentApprovalPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { useLanguage } from './i18n';
import { useAuth } from './AuthContext'; // Import useAuth
import { Loader2 } from 'lucide-react';

const App = () => {
  const { fontClassName } = useLanguage();
  const auth = useAuth(); // Get auth context

  // Global loader while auth status is being checked on initial load
  if (auth.isLoading && !auth.user && !auth.isAuthenticated) {
    return (
      <div className={`flex flex-col min-h-screen justify-center items-center bg-gray-50 dark:bg-gray-900 ${fontClassName}`}>
        <Loader2 className="animate-spin h-16 w-16 text-primary" />
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">{useLanguage().translate('loadingApp', 'Loading Application...')}</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${fontClassName}`}>
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/ref/:code" element={<ReferralPage />} />
          
          <Route 
            path="/payment-approval" 
            element={
              <ProtectedRoute>
                <PaymentApprovalPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course" 
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course/:categorySlug" 
            element={
              <ProtectedRoute>
                <CategoryDetailPage />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
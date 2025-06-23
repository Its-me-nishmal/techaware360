
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Loader2 } from 'lucide-react';
import HomePage from './pages/HomePage.tsx';
import JoinPage from './pages/JoinPage.tsx';
import CoursePage from './pages/CoursePage.tsx';
import CategoryDetailPage from './pages/CategoryDetailPage.tsx';
import ReferralPage from './pages/ReferralPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

// Lazy load pages for better initial load time

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader2 className="animate-spin h-12 w-12 text-primary" />
  </div>
);

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/course/:categorySlug" element={<CategoryDetailPage />} />
            <Route path="/ref/:code" element={<ReferralPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
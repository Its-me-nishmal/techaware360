import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-16 w-16 text-primary" />
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    // Redirect them to the /join page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/join" state={{ from: location }} replace />;
  }

  // If authenticated but payment is not complete, redirect to payment approval
  // Allow access to payment-approval page itself if that's where they are heading
  if (auth.user && !auth.user.paymentComplete && location.pathname !== '/payment-approval') {
     return <Navigate to="/payment-approval" state={{ from: location, email: auth.user.email, name: auth.user.name, profilePicUrl: auth.user.profilePicUrl }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;
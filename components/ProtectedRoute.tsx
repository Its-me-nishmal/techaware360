import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoading, isAuthenticated, user } = useAuth(); // Destructure for clarity
  const location = useLocation();

  // 1. Initial Authentication Check Loader:
  // This loader displays ONLY when the app is in the process of determining
  // the user's *initial* authentication status (e.g., checking local storage token).
  // If `isAuthenticated` is already true, it means the initial check is complete,
  // and we should not block rendering children even if `isLoading` becomes true
  // due to a subsequent action like `updateUserPaymentStatus`.
  if (!isAuthenticated && isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-16 w-16 text-primary" />
      </div>
    );
  }

  // 2. Unauthenticated User Redirect:
  // If, after the initial load, the user is found not to be authenticated,
  // redirect them to the join page.
  if (!isAuthenticated) {
    return <Navigate to="/join" state={{ from: location }} replace />;
  }

  // 3. Payment Status Check and Redirect:
  // If the user IS authenticated but their payment is not complete,
  // and they are trying to access a page other than '/payment-approval',
  // redirect them to the payment approval page.
  // Note: `user` will always be defined here if `isAuthenticated` is true.
  if (!user?.paymentComplete && location.pathname !== '/payment-approval') {
     return <Navigate to="/payment-approval" state={{ from: location, email: user.email, name: user.name, profilePicUrl: user.profilePicUrl }} replace />;
  }

  // 4. Render Children:
  // If all above conditions are false (i.e., user is authenticated,
  // and either payment is complete, or they are correctly on the payment-approval page),
  // then render the protected content.
  // At this point, `auth.isLoading` might still be `true` (e.g., if `updateUserPaymentStatus`
  // is in progress), but `ProtectedRoute` will no longer prevent `children` from rendering,
  // allowing `PaymentApprovalPage` to retain its state and display its own internal loader.
  return children;
};

export default ProtectedRoute;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { useAuth } from '../AuthContext'; // Import useAuth
import { CreditCard, Clock, CheckCircle, Loader2, UserCircle, Mail } from 'lucide-react';

const PaymentApprovalPage = () => {
  const { translate } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth(); // Use Auth context

  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  
  // Prioritize user data from AuthContext, fallback to location state
  const currentUser = auth.user || (location.state as { email: string; name: string; profilePicUrl?: string });

  useEffect(() => {
    // If user is authenticated and payment is complete, redirect to course
    if (auth.isAuthenticated && auth.user?.paymentComplete) {
      navigate('/course', { replace: true });
    }
    // If no user data at all (neither in auth nor state), redirect to join
    if (!currentUser?.email || !currentUser?.name) {
      navigate('/join', { replace: true });
    }
  }, [auth.isAuthenticated, auth.user, currentUser, navigate]);


  const handleCheckStatus = async () => {
    if (!currentUser?.email) return;

    setIsCheckingStatus(true);
    setStatusMessage('');
    try {
      // Call AuthContext function to update payment status
      const response = await auth.updateUserPaymentStatus(currentUser.email);
      if (response.success) {
        setStatusMessage(translate('paymentApprovedMessage', 'Payment approved! Redirecting to course...'));
        // AuthContext will update isAuthenticated and user, ProtectedRoute logic will handle redirection
        // or a manual redirect after a delay if preferred.
        setTimeout(() => {
          if (auth.isAuthenticated && auth.user?.paymentComplete) {
             navigate('/course', { replace: true });
          } else {
            // This case should ideally not happen if updateUserPaymentStatus worked
             setStatusMessage(translate('paymentStatusCheckFailed', 'Could not verify approval. Please try again or contact support.'));
          }
        }, 2000);
      } else {
        setStatusMessage(response.message || translate('paymentPendingApprovalMessage', 'Payment is still pending approval. Please check again later.'));
      }
    } catch (err) {
      setStatusMessage(translate('paymentStatusError', 'Error checking payment status.'));
    }
    setIsCheckingStatus(false);
  };

  if (auth.isLoading || (!currentUser?.email || !currentUser?.name)) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-12 w-12 text-primary" /></div>;
  }
  
  // If payment is already complete (e.g., user re-navigates here), show success message
  if (auth.user?.paymentComplete) {
     return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    {translate('paymentAlreadyApprovedTitle', 'Payment Approved!')}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {translate('paymentAlreadyApprovedDesc', 'Your access to the course is active. Enjoy learning!')}
                </p>
                <button
                    onClick={() => navigate('/course')}
                    className="inline-flex items-center bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-md shadow-md hover:shadow-lg transition-all"
                >
                    {translate('goToCourseButton', 'Go to Course')}
                </button>
            </div>
        </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
        <div className="text-center mb-6">
          {currentUser.profilePicUrl ? (
            <img src={currentUser.profilePicUrl} alt={currentUser.name} className="w-24 h-24 rounded-full mx-auto mb-3 border-2 border-primary dark:border-secondary" />
          ) : (
            <UserCircle size={80} className="mx-auto text-gray-400 dark:text-gray-500 mb-3" />
          )}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{translate('welcomeUser', 'Welcome, {userName}!', { userName: currentUser.name })}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center mt-1">
            <Mail size={14} className="mr-1.5" /> {currentUser.email}
          </p>
        </div>

        <>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
              <CreditCard size={22} className="mr-2 text-primary dark:text-secondary" /> {translate('paymentInstructionsTitle')}
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-6">
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {translate('completeYourPaymentPrompt', 'To access the course, please complete your payment:')}
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                <li>{translate('priceInfo')}</li>
                <li>{translate('paymentInstruction1')}</li>
                <li>
                  {translate('paymentNoteMentionEmail', 'Important: Please mention your email ({userEmail}) or name in the payment reference/notes if possible.', { userEmail: currentUser.email})}
                </li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-md text-blue-700 dark:text-blue-200">
              <div className="flex items-start">
                <Clock size={20} className="mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">{translate('approvalProcessTitle', 'Approval Process')}</h3>
                  <p className="text-sm">
                    {translate('approvalTimeInfo', 'After payment, account activation is manual and typically takes up to 3 hours. We appreciate your patience.')}
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCheckStatus}
              disabled={isCheckingStatus || auth.isLoading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70"
            >
              {isCheckingStatus || auth.isLoading ? (
                <Loader2 size={20} className="animate-spin mr-2" />
              ) : (
                <CheckCircle size={20} className="mr-2" />
              )}
              {translate('checkPaymentStatusButton', 'Check Payment Status')}
            </button>
          </>
        

        {statusMessage && (
          <p className={`mt-4 text-sm text-center ${
            statusMessage.includes('approved') ? 'text-green-600 dark:text-green-400' 
            : statusMessage.includes('pending') ? 'text-yellow-600 dark:text-yellow-400' 
            : 'text-red-500 dark:text-red-400'
          }`}>
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentApprovalPage;
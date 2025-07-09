import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { getMyReferrals } from '../api';
import { useAuth } from '../AuthContext';
import { UserCircle, Mail, Copy } from 'lucide-react'; // Import Copy icon

interface ReferredUser {
  _id: string;
  email: string;
  name: string;
  paymentComplete: boolean; // Added paymentComplete status
}

// Assuming AuthenticatedUser interface is correctly defined in types.ts with referralCode
// If not, it would need to be updated there. (This is already done in the previous step)

const ReferralPage: React.FC = () => {
  const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth(); // Get token and user object
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const referralLinkRef = useRef<HTMLInputElement>(null); // Ref for the input element

  // Construct the sharable link using the user's referral code
  const sharableReferralLink = user?.referralCode
    ? `${window.location.origin}/join?ref=${user.referralCode}`
    : null;

  useEffect(() => {
    const fetchReferrals = async () => {
      if (!token) {
        setError('Authentication token not found.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getMyReferrals(token);
        if (response.success) {
          setReferredUsers(response.referredUsers);
        } else {
          setError('Failed to fetch referrals.');
        }
      } catch (err) {
        console.error('Error fetching referrals:', err);
        setError('An error occurred while fetching referrals.');
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [token]);

  const handleCopyLink = async () => {
    if (referralLinkRef.current && sharableReferralLink) {
      try {
        await navigator.clipboard.writeText(sharableReferralLink);
        setCopySuccess('Link copied!');
        setTimeout(() => setCopySuccess(null), 2000); // Clear message after 2 seconds
      } catch (err) {
        console.error('Failed to copy link: ', err);
        setCopySuccess('Failed to copy link.');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading referrals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-lg text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">My Referrals</h1>
      
      {/* Sharable Referral Link Section */}
      {user?.referralCode && (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Share Your Referral Link</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center w-full sm:w-auto">
              <input
                ref={referralLinkRef}
                type="text"
                value={sharableReferralLink || ''}
                readOnly
                className="w-full sm:w-64 lg:w-80 p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={handleCopyLink}
                className="p-3 bg-primary text-white rounded-r-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 flex items-center"
              >
                <Copy className="h-5 w-5 mr-1" /> Copy
              </button>
            </div>
            {copySuccess && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2 sm:mt-0">{copySuccess}</p>
            )}
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <p className="text-xl text-gray-700 dark:text-gray-200">
          Total Referrals: <span className="font-bold text-primary dark:text-secondary">{referredUsers.length}</span>
        </p>
      </div>

      {referredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {referredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700"
            >
              <div>
                <div className="flex items-center mb-3">
                  <UserCircle className="h-8 w-8 text-primary dark:text-secondary mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{user.name}</h3>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Mail className="h-5 w-5 mr-2" />
                  <p className="text-sm truncate">{user.email}</p>
                </div>
                {/* Display payment complete status */}
                <div className="flex items-center text-sm">
                  {user.paymentComplete ? (
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Payment Complete
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600 dark:text-red-400">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      Payment Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500 dark:text-gray-400">You haven't referred anyone yet. Start sharing your referral link!</p>
        </div>
      )}
    </div>
  );
};

export default ReferralPage;

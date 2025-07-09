import { AuthenticatedUser } from './types';

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * A helper function to handle fetch responses.
 * It throws an error for non-successful HTTP statuses and parses JSON from the response body.
 * @param response The fetch Response object.
 * @returns A promise that resolves with the parsed JSON data.
 */
const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    if (contentType && contentType.includes('application/json')) {
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Ignore if parsing JSON fails
      }
    }
    throw new Error(errorMessage);
  }

  // Handle successful responses that might not have content (e.g., 204)
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return {};
};

/**
 * Sends a Google ID token to the backend for sign-in or registration.
 * @param idToken The Google ID token.
 * @param referralCode Optional referral code.
 * @returns A promise resolving to the backend's response, including a session token and user data.
 */
export const googleSignIn = (
  idToken: string,
  referralCode?: string | null
): Promise<{ success: boolean; message: string; token?: string; user?: AuthenticatedUser; needsPayment?: boolean }> => {
  console.log(referralCode)
  return fetch(`${API_BASE_URL}/auth/google/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken, referralCode }),
  }).then(handleResponse);
};

/**
 * Validates a session token with the backend.
 * @param token The session token.
 * @returns A promise resolving to an object containing the authenticated user's data. Throws if invalid.
 */
export const validateSession = (
  token: string
): Promise<{ user: AuthenticatedUser }> => {
  return fetch(`${API_BASE_URL}/auth/validate`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  }).then(handleResponse);
};

/**
 * Checks the payment status for the authenticated user.
 * @param token The session token.
 * @returns A promise resolving to the backend's response, which may include an updated token.
 */
export const checkPaymentStatus = (
  token: string
): Promise<{ success: boolean; message: string; token?: string; user?: AuthenticatedUser }> => {
  return fetch(`${API_BASE_URL}/payment/status`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  }).then(handleResponse);
};

/**
 * Fetches the list of referred users for the authenticated user.
 * @param token The authentication token.
 */
export const getMyReferrals = (token: string): Promise<{ success: boolean; referredUsers: { _id: string; email: string; name: string; paymentComplete: boolean }[] }> => {
  return fetch(`${API_BASE_URL}/auth/my-referrals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then(handleResponse);
};

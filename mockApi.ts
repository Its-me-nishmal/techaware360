import { AuthenticatedUser, GoogleUser } from './types';

// Simulate a database of users
interface MockUserRecord extends AuthenticatedUser {
  referralCodeApplied?: string | null;
}
const mockUserDb: Record<string, MockUserRecord> = {}; // email is the key

// Simulate JWT generation (simple base64 encoding of JSON)
const generateMockJWT = (user: AuthenticatedUser): string => {
  const payload = {
    googleId: user.googleId,
    email: user.email,
    name: user.name,
    paymentComplete: user.paymentComplete,
    // Add expiry if needed for more complex mock: exp: Date.now() / 1000 + (60 * 60) // 1 hour
  };
  try {
    return btoa(JSON.stringify(payload));
  } catch (e) {
    console.error("Failed to btoa payload", e);
    return "errorGeneratingToken";
  }
};

const decodeMockJWT = (token: string): AuthenticatedUser | null => {
  try {
    const decodedPayload = JSON.parse(atob(token));
    // Here you could check for expiry if 'exp' was added
    return {
        googleId: decodedPayload.googleId,
        email: decodedPayload.email,
        name: decodedPayload.name,
        profilePicUrl: decodedPayload.profilePicUrl || '', // Ensure it exists
        paymentComplete: decodedPayload.paymentComplete,
    };
  } catch (error) {
    console.error('Invalid mock JWT:', error);
    return null;
  }
};

export const loginOrRegisterUser = (
  authData: GoogleUser,
  referralCode?: string | null
): Promise<{ success: boolean; message: string; token?: string | null; user?: AuthenticatedUser; needsPayment?: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock API: loginOrRegisterUser with:', authData, 'Referral:', referralCode);
      let userRecord = mockUserDb[authData.email];

      if (!userRecord) {
        // New user registration
        userRecord = {
          ...authData,
          paymentComplete: false, // New users always need payment
          referralCodeApplied: referralCode,
        };
        mockUserDb[authData.email] = userRecord;
        console.log('Mock API: New user registered:', userRecord);
        resolve({
          success: true,
          message: 'User registered. Please complete payment.',
          user: userRecord,
          needsPayment: true,
        });
      } else {
        // Existing user
        console.log('Mock API: Existing user found:', userRecord);
        if (userRecord.paymentComplete) {
          const token = generateMockJWT(userRecord);
          resolve({
            success: true,
            message: 'Login successful.',
            token: token,
            user: userRecord,
          });
        } else {
          resolve({
            success: true,
            message: 'Payment pending. Please complete payment.',
            user: userRecord,
            needsPayment: true,
          });
        }
      }
    }, 1000);
  });
};

export const validateSession = (
  token: string | null
): Promise<{ isAuthenticated: boolean; user?: AuthenticatedUser | null }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock API: validateSession with token:', token);
      if (!token) {
        resolve({ isAuthenticated: false });
        return;
      }
      const decodedUser = decodeMockJWT(token);
      if (decodedUser && mockUserDb[decodedUser.email]) {
         // Ensure the user from token matches DB record, especially payment status
        const dbUser = mockUserDb[decodedUser.email];
        if (dbUser.paymentComplete === decodedUser.paymentComplete) {
            resolve({ isAuthenticated: true, user: dbUser });
        } else {
             // Token might be stale regarding payment status, prioritize DB
            console.warn("Mock API: Token payment status mismatch with DB. Invalidating session.");
            resolve({ isAuthenticated: false });
        }
      } else {
        resolve({ isAuthenticated: false });
      }
    }, 500);
  });
};

export const confirmPaymentAndUpdateSession = (
  email: string
): Promise<{ success: boolean; message: string; token?: string; user?: AuthenticatedUser }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock API: confirmPaymentAndUpdateSession for email:', email);
      const userRecord = mockUserDb[email];
      if (userRecord) {
        userRecord.paymentComplete = true;
        mockUserDb[email] = userRecord; // Update DB
        const token = generateMockJWT(userRecord);
        resolve({
          success: true,
          message: 'Payment confirmed. Session updated.',
          token: token,
          user: userRecord,
        });
      } else {
        resolve({ success: false, message: 'User not found for payment confirmation.' });
      }
    }, 1200);
  });
};

export const logoutUser = (token: string | null): Promise<void> => {
    console.log('Mock API: logoutUser called with token:', token);
    // In a real scenario, you might invalidate the token on the backend.
    // For mock, this is just a placeholder.
    return Promise.resolve();
};


// Helper to reset for testing purposes
export const resetMockDb = () => {
  for (const key in mockUserDb) {
    delete mockUserDb[key];
  }
  console.log('Mock API: Database reset.');
};
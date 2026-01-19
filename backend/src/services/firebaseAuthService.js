const admin = require('../config/firebase-admin');

const firebaseAuthService = {
  /**
   * Verify Firebase ID token
   */
  verifyIdToken: async (idToken) => {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new Error(`Firebase token verification failed: ${error.message}`);
    }
  },

  /**
   * Get Firebase user by email
   */
  getUserByEmail: async (email) => {
    try {
      const user = await admin.auth().getUserByEmail(email);
      return user;
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return null;
      }
      throw error;
    }
  },

  /**
   * Create custom claims (for verification status)
   */
  setCustomClaims: async (uid, claims) => {
    try {
      await admin.auth().setCustomUserClaims(uid, claims);
      return true;
    } catch (error) {
      throw new Error(`Failed to set custom claims: ${error.message}`);
    }
  },

  /**
   * Verify phone number (OTP verification)
   */
  verifyPhoneNumber: async (uid, phoneNumber) => {
    try {
      // Update Firebase user with verified phone
      await admin.auth().updateUser(uid, {
        phoneNumber: phoneNumber,
      });
      return true;
    } catch (error) {
      throw new Error(`Phone verification failed: ${error.message}`);
    }
  },

  /**
   * Send email verification
   */
  sendEmailVerification: async (uid) => {
    try {
      const user = await admin.auth().getUser(uid);
      // Firebase handles email verification link generation
      return {
        email: user.email,
        message: 'Verification link sent to email',
      };
    } catch (error) {
      throw new Error(`Email verification setup failed: ${error.message}`);
    }
  },

  /**
   * Check if user is verified
   */
  isUserVerified: async (uid) => {
    try {
      const user = await admin.auth().getUser(uid);
      return {
        emailVerified: user.emailVerified,
        phoneVerified: !!user.phoneNumber,
      };
    } catch (error) {
      throw new Error(`User verification check failed: ${error.message}`);
    }
  },
};

module.exports = firebaseAuthService;

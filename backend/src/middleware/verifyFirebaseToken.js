const admin = require('../config/firebase-admin');

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ No Firebase token provided');
      return res.status(401).json({
        error: { message: 'No Firebase token provided', status: 401 },
      });
    }

    const firebaseToken = authHeader.split('Bearer ')[1];
    console.log('🔍 Verifying Firebase token...');

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    console.log('✅ Firebase token verified for user:', decodedToken.uid);

    // Store Firebase user info in request
    req.firebaseUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      phoneNumber: decodedToken.phone_number,
    };

    req.user = {
      firebaseId: decodedToken.uid,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    console.error('❌ Firebase token verification failed:', error.message);
    res.status(401).json({
      error: { message: 'Invalid Firebase token: ' + error.message, status: 401 },
    });
  }
};

module.exports = verifyFirebaseToken;

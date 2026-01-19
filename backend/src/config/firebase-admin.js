const admin = require('firebase-admin');

// Initialize Firebase Admin - with better error handling
let firebaseInitialized = false;

try {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  
  if (privateKey && privateKey.length > 50) {
    const serviceAccount = {
      type: 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || 'key-id',
      private_key: privateKey.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID || 'client-id',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.FIREBASE_CERT_URL || '',
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    firebaseInitialized = true;
    console.log('✅ Firebase Admin initialized with project:', process.env.FIREBASE_PROJECT_ID);
  } else {
    console.warn('⚠️ FIREBASE_PRIVATE_KEY is missing or incomplete');
    console.warn('⚠️ Firebase Admin will not work - register/login will fail');
    console.warn('⚠️ Get full private key from Firebase Console → Project Settings → Service Accounts');
  }
} catch (error) {
  console.error('❌ Firebase Admin initialization error:', error.message);
  console.warn('⚠️ Firebase Admin will not work');
  console.warn('📝 Fix: Get complete private key JSON from Firebase Console');
}

module.exports = admin;

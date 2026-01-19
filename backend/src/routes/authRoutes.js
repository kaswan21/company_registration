const express = require('express');
const router = express.Router();
const { register, login, verifyMobile, verifyEmail } = require('../controllers/authController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const verifyToken = require('../middleware/verifyToken');

// Firebase-protected endpoints (Firebase token in Authorization header)
router.post('/register', verifyFirebaseToken, register);
router.post('/login', verifyFirebaseToken, login);

// JWT-protected endpoints (App JWT token in Authorization header)
router.post('/verify-mobile', verifyToken, verifyMobile);
router.get('/verify-email', verifyToken, verifyEmail);

module.exports = router;

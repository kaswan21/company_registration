const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
  try {
    const firebaseEmail = req.user.email;
    const firebaseId = req.user.firebaseId;

    console.log('=== FIREBASE LOGIN REQUEST ===');
    console.log('Firebase Email:', firebaseEmail);
    console.log('Firebase ID:', firebaseId);

    // Find user by email (Firebase authenticated already)
    const result = await pool.query(
      'SELECT id, email, full_name, mobile_no, gender, is_mobile_verified, is_email_verified FROM users WHERE email = $1',
      [firebaseEmail]
    );

    if (result.rows.length === 0) {
      console.log('❌ User not found in database - please register first');
      return res.status(404).json({
        error: { message: 'User not found. Please register first.', status: 404 },
      });
    }

    const user = result.rows[0];

    // Generate 90-day app JWT
    const appToken = jwt.sign(
      { userId: user.id, email: firebaseEmail, firebaseId },
      process.env.JWT_SECRET,
      { expiresIn: '90d' }
    );

    console.log('✅ Login successful for:', firebaseEmail);
    res.json({
      message: 'Login successful',
      appToken,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        mobile_no: user.mobile_no,
        gender: user.gender,
        is_mobile_verified: user.is_mobile_verified,
        is_email_verified: user.is_email_verified,
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { full_name, gender, mobile_no, signup_type } = req.body;
    const firebaseEmail = req.user.email;
    const firebaseId = req.user.firebaseId;

    console.log('=== FIREBASE REGISTER REQUEST ===');
    console.log('Firebase Email:', firebaseEmail);
    console.log('Firebase ID:', firebaseId);

    if (!full_name || !gender || !mobile_no) {
      return res.status(400).json({
        error: { message: 'Missing required fields: full_name, gender, mobile_no', status: 400 },
      });
    }

    // Check if mobile already exists
    const mobileCheck = await pool.query('SELECT id FROM users WHERE mobile_no = $1', [mobile_no]);
    if (mobileCheck.rows.length > 0) {
      return res.status(400).json({
        error: { message: 'Mobile number already registered', status: 400 },
      });
    }

    // Create a dummy password hash for Firebase users (they authenticate via Firebase, not password)
    const dummyPasswordHash = await bcrypt.hash(firebaseId, 10);

    // Insert user in database (without firebase_id column - use password hash to track Firebase ID)
    const result = await pool.query(
      `INSERT INTO users (email, password, full_name, gender, mobile_no, signup_type)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, full_name, mobile_no, gender, signup_type, is_mobile_verified, is_email_verified`,
      [firebaseEmail, dummyPasswordHash, full_name, gender, mobile_no, signup_type || 'e']
    );

    // Generate 90-day app JWT
    const appToken = jwt.sign(
      { userId: result.rows[0].id, email: firebaseEmail, firebaseId },
      process.env.JWT_SECRET,
      { expiresIn: '90d' }
    );

    console.log('✅ Firebase user registered and app JWT generated');
    res.status(201).json({
      message: 'User registered successfully',
      appToken,
      user: result.rows[0],
    });
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    if (error.code === '23505') {
      return res.status(400).json({
        error: { message: 'Email or mobile number already exists', status: 400 },
      });
    }
    next(error);
  }
};

const verifyMobile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { otp } = req.body;

    console.log('=== VERIFY MOBILE (OTP) ===');
    console.log('User ID:', userId);
    console.log('OTP:', otp ? 'provided' : 'missing');

    if (!otp) {
      return res.status(400).json({
        error: { message: 'OTP required', status: 400 },
      });
    }

    // In production: Verify OTP with Firebase
    // For now: Accept any 6-digit OTP
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        error: { message: 'Invalid OTP format (must be 6 digits)', status: 400 },
      });
    }

    // Mark mobile as verified
    const result = await pool.query(
      'UPDATE users SET is_mobile_verified = true, updated_at = NOW() WHERE id = $1 RETURNING *',
      [userId]
    );

    console.log('✅ Mobile verified for user:', userId);
    res.json({
      message: 'Mobile verified successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('❌ Mobile verification error:', error.message);
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    console.log('=== VERIFY EMAIL ===');
    console.log('User ID:', userId);

    // Mark email as verified
    const result = await pool.query(
      'UPDATE users SET is_email_verified = true, updated_at = NOW() WHERE id = $1 RETURNING *',
      [userId]
    );

    console.log('✅ Email verified for user:', userId);
    res.json({
      message: 'Email verified successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('❌ Email verification error:', error.message);
    next(error);
  }
};

module.exports = { login, register, verifyMobile, verifyEmail };

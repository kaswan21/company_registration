import client from './client';

// Register user
export const registerUser = async (firebaseToken, userData) => {
  const response = await client.post('/api/auth/register', userData, {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
    },
  });
  return response.data;
};

// Login user
export const loginUser = async (firebaseToken) => {
  const response = await client.post('/api/auth/login', {}, {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
    },
  });
  return response.data;
};

// Verify email
export const verifyEmail = async () => {
  const response = await client.get('/api/auth/verify-email');
  return response.data;
};

// Verify mobile OTP
export const verifyMobileOTP = async (otp) => {
  const response = await client.post('/api/auth/verify-mobile', { otp });
  return response.data;
};

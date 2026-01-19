import { useMutation } from '@tanstack/react-query';
import { registerUser, loginUser, verifyEmail, verifyMobileOTP } from '../api/auth';
import { toast } from 'react-toastify';

// Register mutation
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: ({ firebaseToken, userData }) => registerUser(firebaseToken, userData),
    onSuccess: (data) => {
      console.log('✅ Registration successful');
      localStorage.setItem('token', data.appToken);
      toast.success('Registration successful!');
    },
    onError: (error) => {
      console.error('❌ Registration failed:', error.message);
      toast.error('Registration failed: ' + error.message);
    },
  });
};

// Login mutation
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (firebaseToken) => loginUser(firebaseToken),
    onSuccess: (data) => {
      console.log('✅ Login successful');
      localStorage.setItem('token', data.appToken);
      toast.success('Login successful!');
    },
    onError: (error) => {
      console.error('❌ Login failed:', error.message);
      toast.error('Login failed: ' + error.message);
    },
  });
};

// Verify email mutation
export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      console.log('✅ Email verified');
      toast.success('Email verified successfully!');
    },
    onError: (error) => {
      console.error('❌ Email verification failed:', error.message);
      toast.error('Email verification failed');
    },
  });
};

// Verify mobile OTP mutation
export const useVerifyMobileMutation = () => {
  return useMutation({
    mutationFn: verifyMobileOTP,
    onSuccess: () => {
      console.log('✅ Mobile verified');
      toast.success('Mobile verified successfully!');
    },
    onError: (error) => {
      console.error('❌ Mobile verification failed:', error.message);
      toast.error('Mobile verification failed');
    },
  });
};

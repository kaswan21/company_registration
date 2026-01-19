import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, Paper, Typography, CircularProgress } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { toast } from 'react-toastify';

const FirebaseRegisterForm = ({ onSuccess, loading }) => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (formData) => {
    try {
      console.log('📝 Form submitted:', formData);
      
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }

      toast.info('Creating Firebase user...');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log('✅ Firebase user created:', userCredential.user.uid);

      const idToken = await userCredential.user.getIdToken();
      console.log('✅ Got ID token:', idToken.substring(0, 20) + '...');

      // Store Firebase user info and token in localStorage for next steps
      localStorage.setItem('firebaseUser', JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        idToken: idToken,
      }));
      console.log('✅ Stored Firebase user in localStorage');

      toast.success('Firebase account created! Complete your profile.');
      onSuccess({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        idToken: idToken,
      });
    } catch (error) {
      console.error('❌ Registration error:', error);
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        🔥 Register
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password required', minLength: { value: 6, message: 'Min 6 chars' } }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: 'Confirm password',
            validate: (value) => value === password || 'Passwords must match',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              disabled={loading}
            />
          )}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Continue'}
        </Button>
      </form>
    </Paper>
  );
};

export default FirebaseRegisterForm;

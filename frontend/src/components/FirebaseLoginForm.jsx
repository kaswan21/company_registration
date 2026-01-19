import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, Paper, Typography, CircularProgress } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { toast } from 'react-toastify';

const FirebaseLoginForm = ({ onSuccess, loading, onToggleRegister }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData) => {
    try {
      console.log('📝 Login form submitted');

      toast.info('Authenticating with Firebase...');
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log('✅ Firebase auth successful');

      const idToken = await userCredential.user.getIdToken();
      console.log('✅ Got ID token');

      toast.info('Logging in...');
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
      });

      const data = await response.json();
      console.log('Backend response:', data);

      if (!response.ok) {
        throw new Error(data.error?.message || 'Backend login failed');
      }

      toast.success('Login successful!');
      onSuccess(data);
    } catch (error) {
      console.error('❌ Login error:', error);
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        🔥 Login
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
          rules={{ required: 'Password required' }}
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

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have account?{' '}
            <Button size="small" onClick={onToggleRegister} disabled={loading}>
              Register
            </Button>
          </Typography>
        </Box>
      </form>
    </Paper>
  );
};

export default FirebaseLoginForm;

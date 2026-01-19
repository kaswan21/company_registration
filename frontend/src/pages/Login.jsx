import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { authAPI } from '../api';
import { setToken, setUser, setLoading, setError } from '../store/authSlice';
import { toast } from 'react-toastify';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

const Login = ({ onBack }) => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('Test@12345');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setLoading(true));

    try {
      // Step 1: Firebase auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseToken = await userCredential.user.getIdToken();

      // Step 2: Backend login
      const response = await authAPI.login(firebaseToken);
      const { token, user } = response.data;

      // Step 3: Store token & user
      dispatch(setToken(token));
      dispatch(setUser(user));

      toast.success('Login successful!');
    } catch (error) {
      const errorMsg = error.response?.data?.error?.message || error.message;
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
    } finally {
      setLoading(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            {onBack && (
              <Button fullWidth variant="text" onClick={onBack}>
                Back
              </Button>
            )}
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;

import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, MenuItem, Paper, Typography, Container, CircularProgress } from '@mui/material';

const RegisterForm = ({ onSubmit, loading, onToggleLogin }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      full_name: '',
      gender: '',
      mobile_no: '',
      signup_type: 'e',
    },
  });

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
          Register Account
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
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
            rules={{
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            }}
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
            name="full_name"
            control={control}
            rules={{ required: 'Full name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Full Name"
                margin="normal"
                error={!!errors.full_name}
                helperText={errors.full_name?.message}
                disabled={loading}
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            rules={{ required: 'Gender is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Gender"
                select
                margin="normal"
                error={!!errors.gender}
                helperText={errors.gender?.message}
                disabled={loading}
              >
                <MenuItem value="m">Male</MenuItem>
                <MenuItem value="f">Female</MenuItem>
                <MenuItem value="o">Other</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="mobile_no"
            control={control}
            rules={{
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: 'Mobile number must be 10-15 digits'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Mobile Number (e.g., 9876543210)"
                margin="normal"
                placeholder="9876543210"
                error={!!errors.mobile_no}
                helperText={errors.mobile_no?.message}
                disabled={loading}
                inputProps={{ maxLength: 15 }}
              />
            )}
          />

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Button
                variant="text"
                size="small"
                onClick={onToggleLogin}
                disabled={loading}
                sx={{ textTransform: 'none' }}
              >
                Login here
              </Button>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterForm;

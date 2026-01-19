import { Controller } from 'react-hook-form';
import { TextField, Box, Typography, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const RegistrationStep1 = ({ control, errors, password }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        📧 Create Your Login Credentials
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        You'll use this email and password to login to your Bluestock account
      </Alert>

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="outlined"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message: 'Password must have uppercase, lowercase, and number',
          },
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
            variant="outlined"
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match',
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
            variant="outlined"
          />
        )}
      />
    </Box>
  );
};

RegistrationStep1.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  password: PropTypes.string,
};

export default RegistrationStep1;

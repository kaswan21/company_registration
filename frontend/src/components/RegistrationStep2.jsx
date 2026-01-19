import { Controller } from 'react-hook-form';
import { TextField, Box, Typography, Alert, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const RegistrationStep2 = ({ control, errors }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        👤 Personal Information
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Tell us about yourself so we can personalize your experience
      </Alert>

      <Controller
        name="full_name"
        control={control}
        rules={{
          required: 'Full name is required',
          minLength: {
            value: 2,
            message: 'Full name must be at least 2 characters',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Full Name"
            margin="normal"
            error={!!errors.full_name}
            helperText={errors.full_name?.message}
            variant="outlined"
            placeholder="e.g. John Doe"
          />
        )}
      />

      <Controller
        name="gender"
        control={control}
        rules={{
          required: 'Gender is required',
        }}
        render={({ field }) => (
          <TextField
            {...field}
            select
            fullWidth
            label="Gender"
            margin="normal"
            error={!!errors.gender}
            helperText={errors.gender?.message}
            variant="outlined"
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
            value: /^[0-9+\-\s()]{10,}$/,
            message: 'Please enter a valid mobile number',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Mobile Number"
            margin="normal"
            error={!!errors.mobile_no}
            helperText={errors.mobile_no?.message}
            variant="outlined"
            placeholder="e.g. +91 9876543210"
          />
        )}
      />
    </Box>
  );
};

RegistrationStep2.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default RegistrationStep2;

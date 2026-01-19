import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, Paper, Typography, CircularProgress, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

const CompanyRegistrationForm = ({ onSubmit, loading }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      company_name: '',
      industry: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      website: '',
      description: '',
    },
  });

  const handleFormSubmit = (formData) => {
    console.log('📝 Company form submitted:', formData);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        🏢 Register Company
      </Typography>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="company_name"
          control={control}
          rules={{ required: 'Company name required' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Company Name"
              margin="normal"
              error={!!errors.company_name}
              helperText={errors.company_name?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="industry"
          control={control}
          rules={{ required: 'Industry required' }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Industry"
              margin="normal"
              error={!!errors.industry}
              helperText={errors.industry?.message}
              disabled={loading}
            >
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Retail">Retail</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="address"
          control={control}
          rules={{ required: 'Address required' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Address"
              margin="normal"
              error={!!errors.address}
              helperText={errors.address?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          rules={{ required: 'City required' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="City"
              margin="normal"
              error={!!errors.city}
              helperText={errors.city?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="state"
          control={control}
          rules={{ required: 'State required' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="State"
              margin="normal"
              error={!!errors.state}
              helperText={errors.state?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="country"
          control={control}
          rules={{ required: 'Country required' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Country"
              margin="normal"
              error={!!errors.country}
              helperText={errors.country?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="postal_code"
          control={control}
          rules={{ required: 'Postal code required' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Postal Code"
              margin="normal"
              error={!!errors.postal_code}
              helperText={errors.postal_code?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="website"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Website (Optional)"
              margin="normal"
              error={!!errors.website}
              helperText={errors.website?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Description (Optional)"
              margin="normal"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
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
          {loading ? <CircularProgress size={24} /> : 'Register Company'}
        </Button>
      </form>
    </Paper>
  );
};

export default CompanyRegistrationForm;

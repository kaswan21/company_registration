import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, Paper, Typography, CircularProgress, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

const EditCompanyForm = ({ initialData, onSubmit, loading, onCancel }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      company_name: initialData?.company_name || '',
      industry: initialData?.industry || '',
      address: initialData?.address || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      country: initialData?.country || '',
      postal_code: initialData?.postal_code || '',
      website: initialData?.website || '',
      description: initialData?.description || '',
    },
  });

  const handleFormSubmit = (formData) => {
    console.log('📝 Edit company form submitted:', formData);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        ✏️ Edit Company
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

        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EditCompanyForm;

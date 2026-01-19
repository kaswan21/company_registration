import { Box, Typography, Paper, Grid, Divider, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const RegistrationStep3 = ({ formData }) => {
  const genderDisplay = {
    m: 'Male',
    f: 'Female',
    o: 'Other',
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        ✅ Review Your Information
      </Typography>

      <Alert severity="success" sx={{ mb: 3 }}>
        Please review your information before completing registration
      </Alert>

      <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
        <Grid container spacing={3}>
          {/* Email Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              📧 Email Address
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, fontWeight: 500 }}>
              {formData.email}
            </Typography>
            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* Personal Info Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              👤 Personal Information
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="textSecondary">
                  Full Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {formData.full_name}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="textSecondary">
                  Gender
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {genderDisplay[formData.gender] || formData.gender}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="textSecondary">
                  Mobile Number
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {formData.mobile_no}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* Security Note */}
          <Grid item xs={12}>
            <Alert severity="info">
              <Typography variant="caption">
                🔒 Your password is securely stored and encrypted. You can use your email and
                password to login anytime.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
        <Typography variant="body2">
          By clicking "Complete Registration", you agree to our Terms of Service and Privacy
          Policy.
        </Typography>
      </Box>
    </Box>
  );
};

RegistrationStep3.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string,
    full_name: PropTypes.string,
    gender: PropTypes.string,
    mobile_no: PropTypes.string,
  }).isRequired,
};

export default RegistrationStep3;

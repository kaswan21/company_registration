import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, TextField, Typography, Paper, Stepper, Step, StepLabel, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { setCompany, setRegistrationStep, setLoading as setCompanyLoading } from '../../store/companySlice';
import '../../styles/landing.css';

const CompanyRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registrationStep, company } = useSelector((state) => state.company);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    company || {
      email: user?.email || '',
      company_name: '',
      industry: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      website: '',
      description: '',
      founded_date: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (registrationStep === 1) {
      if (!formData.company_name || !formData.industry) {
        toast.error('Please fill in company name and industry');
        return;
      }
    } else if (registrationStep === 2) {
      if (!formData.address || !formData.city || !formData.state || !formData.country || !formData.postal_code) {
        toast.error('Please fill in all address fields');
        return;
      }
    }
    dispatch(setRegistrationStep(registrationStep + 1));
  };

  const handlePrevious = () => {
    dispatch(setRegistrationStep(registrationStep - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setCompanyLoading(true));

    try {
      // TODO: Call backend API to register/update company
      // For now, just update Redux store
      dispatch(setCompany(formData));
      
      toast.success(company ? 'Company updated successfully!' : 'Company registered successfully!');
      
      setLoading(false);
      dispatch(setCompanyLoading(false));
      
      // Reset step to 1
      dispatch(setRegistrationStep(1));
      
      // Navigate back to dashboard after 1.5 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to register company');
      setLoading(false);
      dispatch(setCompanyLoading(false));
    }
  };

  const steps = ['Basic Info', 'Address', 'Additional Details'];

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa', py: 4 }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#333' }}>
            Register Your Company
          </Typography>

          <Stepper activeStep={registrationStep - 1} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Paper className="form-container" sx={{ maxWidth: '600px' }}>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Info */}
              {registrationStep === 1 && (
                <>
                  <Typography className="form-title">Company Basic Information</Typography>
                  <div className="form-group">
                    <label>Company Name *</label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Your Company Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Industry *</label>
                    <select name="industry" value={formData.industry} onChange={handleChange} required>
                      <option value="">Select Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Education">Education</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Founded Date</label>
                    <input
                      type="date"
                      name="founded_date"
                      value={formData.founded_date}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* Step 2: Address */}
              {registrationStep === 2 && (
                <>
                  <Typography className="form-title">Company Address</Typography>
                  <div className="form-group">
                    <label>Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street Address"
                      required
                    />
                  </div>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City"
                          required
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>State *</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="State"
                          required
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 0 }}>
                    <Grid item xs={12} sm={6}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Country *</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="Country"
                          required
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Postal Code *</label>
                        <input
                          type="text"
                          name="postal_code"
                          value={formData.postal_code}
                          onChange={handleChange}
                          placeholder="Postal Code"
                          required
                        />
                      </div>
                    </Grid>
                  </Grid>
                </>
              )}

              {/* Step 3: Additional Details */}
              {registrationStep === 3 && (
                <>
                  <Typography className="form-title">Additional Details</Typography>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Tell us about your company..."
                      rows="5"
                    />
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                {registrationStep > 1 && (
                  <Button
                    variant="outlined"
                    onClick={handlePrevious}
                    sx={{
                      color: '#667eea',
                      borderColor: '#667eea',
                      fontWeight: 'bold',
                      flex: 1,
                    }}
                  >
                    Previous
                  </Button>
                )}
                {registrationStep < 3 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontWeight: 'bold',
                      flex: 1,
                    }}
                  >
                    Next
                  </Button>
                )}
                {registrationStep === 3 && (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontWeight: 'bold',
                      flex: 1,
                    }}
                  >
                    {loading ? 'Registering...' : 'Complete Registration'}
                  </Button>
                )}
              </Box>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CompanyRegisterPage;

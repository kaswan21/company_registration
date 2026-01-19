import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useRegisterMutation } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../store/authSlice';
import Step1 from './RegistrationStep1';
import Step2 from './RegistrationStep2';
import Step3 from './RegistrationStep3';

const steps = ['Email & Password', 'Personal Info', 'Review'];

const RegistrationWizard = ({ onSuccess }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    gender: '',
    mobile_no: '',
  });

  const { control, handleSubmit, formState: { errors }, watch, trigger } = useForm({
    mode: 'onChange',
    defaultValues: formData,
  });

  const registerMutation = useRegisterMutation();
  const dispatch = useDispatch();

  const password = watch('password');

  const handleNext = async () => {
    // Validate current step
    let fieldsToValidate = [];
    if (activeStep === 0) {
      fieldsToValidate = ['email', 'password', 'confirmPassword'];
    } else if (activeStep === 1) {
      fieldsToValidate = ['full_name', 'gender', 'mobile_no'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (activeStep === 0) {
        setFormData({
          ...formData,
          email: watch('email'),
          password: watch('password'),
        });
      } else if (activeStep === 1) {
        setFormData({
          ...formData,
          full_name: watch('full_name'),
          gender: watch('gender'),
          mobile_no: watch('mobile_no'),
        });
      }
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    try {
      // Get Firebase token from localStorage
      const firebaseUserStr = localStorage.getItem('firebaseUser');
      if (!firebaseUserStr) {
        toast.error('Firebase token not found. Please register first.');
        console.error('❌ No Firebase user in localStorage');
        return;
      }

      const firebaseUser = JSON.parse(firebaseUserStr);
      const firebaseToken = firebaseUser.idToken;

      if (!firebaseToken) {
        toast.error('Firebase token not found. Please register first.');
        console.error('❌ No Firebase token in localStorage');
        return;
      }

      console.log('✅ Found Firebase token, submitting registration...');

      const userData = {
        full_name: data.full_name,
        gender: data.gender,
        mobile_no: data.mobile_no,
        signup_type: 'e',
      };

      const result = await registerMutation.mutateAsync({
        firebaseToken,
        userData,
      });

      console.log('✅ Registration successful:', result);

      // Store in Redux
      dispatch(setUser(result.user));
      dispatch(setToken(result.appToken));

      // Clear Firebase user from localStorage
      localStorage.removeItem('firebaseUser');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Create Account
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ minHeight: 300 }}>
          {activeStep === 0 && (
            <Step1 control={control} errors={errors} password={password} />
          )}
          {activeStep === 1 && (
            <Step2 control={control} errors={errors} />
          )}
          {activeStep === 2 && (
            <Step3 formData={formData} />
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button
            disabled={activeStep === 0 || registerMutation.isPending}
            onClick={handleBack}
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Registering...
                </>
              ) : (
                'Complete Registration'
              )}
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={handleNext}
              disabled={registerMutation.isPending}
            >
              Next
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
};

export default RegistrationWizard;

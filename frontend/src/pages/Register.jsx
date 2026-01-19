import { useState, useEffect } from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import RegistrationWizard from '../components/RegistrationWizard';
import FirebaseRegisterForm from '../components/FirebaseRegisterForm';

const Register = ({ onSuccess }) => {
  const [step, setStep] = useState('firebase'); // 'firebase' or 'wizard'

  // Check if user already completed Firebase registration
  useEffect(() => {
    const firebaseUser = localStorage.getItem('firebaseUser');
    if (firebaseUser) {
      setStep('wizard');
    }
  }, []);

  const handleFirebaseSuccess = () => {
    console.log('✅ Firebase registration complete, moving to profile step');
    setStep('wizard');
  };

  const handleWizardSuccess = () => {
    console.log('✅ Profile registration complete, redirecting to home');
    // Clear any stored data
    localStorage.removeItem('firebaseUser');
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        {/* Step 1: Firebase Registration (Create account) */}
        {step === 'firebase' && (
          <>
            <Button
              onClick={() => onSuccess?.()}
              variant="text"
              sx={{ mb: 2 }}
            >
              ← Back to Home
            </Button>
            <FirebaseRegisterForm
              onSuccess={handleFirebaseSuccess}
              loading={false}
            />
          </>
        )}

        {/* Step 2: Multi-step Wizard (Complete profile) */}
        {step === 'wizard' && (
          <>
            <Button
              onClick={() => setStep('firebase')}
              variant="text"
              sx={{ mb: 2 }}
            >
              ← Back
            </Button>
            <RegistrationWizard onSuccess={handleWizardSuccess} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default Register;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Business,
  SecurityOutlined,
  CloudUploadOutlined,
  VerifiedUserOutlined,
  ArrowForward,
  CheckCircleOutline,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import "../../styles/landing.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Business sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Company Registration',
      description: 'Easy multi-step company registration process with all required fields',
    },
    {
      icon: <VerifiedUserOutlined sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Verification',
      description: 'Secure email and OTP verification for your account',
    },
    {
      icon: <CloudUploadOutlined sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Logo & Banner Upload',
      description: 'Upload your company logo and banner with ease',
    },
    {
      icon: <SecurityOutlined sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with Firebase & JWT authentication',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '24px', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Business sx={{ fontSize: 30 }} />
            Bluestock
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" onClick={() => navigate('/login')} sx={{ fontWeight: 600, fontSize: '16px' }}>
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                background: '#fff',
                color: '#667eea',
                fontWeight: 'bold',
                '&:hover': { background: '#f0f0f0' },
              }}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: 12,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="hero-background">
            <div className="blob blob1"></div>
            <div className="blob blob2"></div>
          </div>

          <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '28px', sm: '36px', md: '48px' },
                  animation: 'fadeInDown 1s ease',
                }}
              >
                Register Your Company
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.95,
                  fontSize: { xs: '16px', sm: '18px' },
                }}
              >
                Join thousands of companies already verified on Bluestock. Complete your registration in just a few steps.
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants} sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  background: '#fff',
                  color: '#667eea',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  fontSize: '16px',
                  borderRadius: '50px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                  },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                Get Started <ArrowForward />
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  fontSize: '16px',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                Login
              </Button>
            </motion.div>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 12 }}>
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#333',
              }}
            >
              Why Choose Bluestock?
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontSize: '16px' }}>
              Everything you need to register and verify your company
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      border: 'none',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                        borderTop: '4px solid #667eea',
                      },
                    }}
                  >
                    <CardContent sx={{ py: 4 }}>
                      <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* CTA Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: 8,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="sm">
            <motion.div variants={itemVariants}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                Ready to get started?
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  background: '#fff',
                  color: '#667eea',
                  fontWeight: 'bold',
                  px: 5,
                  py: 1.5,
                  fontSize: '16px',
                  borderRadius: '50px',
                  '&:hover': {
                    background: '#f0f0f0',
                  },
                }}
              >
                Start Registration Now
              </Button>
            </motion.div>
          </Container>
        </Box>
      </motion.div>
    </div>
  );
};

export default LandingPage;

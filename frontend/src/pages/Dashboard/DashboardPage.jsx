import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, AppBar, Toolbar, Card, CardContent, Grid } from '@mui/material';
import { LogoutOutlined, BusinessOutlined, PersonOutlined, AddOutlined, EditOutlined } from '@mui/icons-material';
import { logout } from '../../store/authSlice';
import { loadCompanyFromStorage } from '../../store/companySlice';
import { motion } from 'framer-motion';
import '../../styles/landing.css';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);

  useEffect(() => {
    // Load company data for this user from localStorage
    if (user?.email) {
      dispatch(loadCompanyFromStorage(user.email));
    }
  }, [user?.email, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
            Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutOutlined />}
            sx={{ fontWeight: 600 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#333' }}>
            Welcome to Your Dashboard
          </Typography>

          <Grid container spacing={3}>
            {/* User Info Card */}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: '0 4px 15px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <PersonOutlined sx={{ fontSize: 40, color: '#667eea' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      User Information
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                    <strong>Name:</strong> {user?.full_name || 'Not set'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                    <strong>Email:</strong> {user?.email || 'Not set'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    <strong>Mobile:</strong> {user?.mobile_no || 'Not set'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Company Info Card */}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: '0 4px 15px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <BusinessOutlined sx={{ fontSize: 40, color: '#667eea' }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Company Information
                      </Typography>
                    </Box>
                    {company ? (
                      <Button
                        size="small"
                        startIcon={<EditOutlined />}
                        onClick={() => navigate('/company/edit')}
                        sx={{ color: '#667eea', fontWeight: 'bold' }}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        startIcon={<AddOutlined />}
                        onClick={() => navigate('/company/register')}
                        sx={{ color: '#667eea', fontWeight: 'bold' }}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                  {company ? (
                    <>
                      <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                        <strong>Company:</strong> {company?.company_name || 'Not set'}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                        <strong>Industry:</strong> {company?.industry || 'Not set'}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        <strong>Location:</strong> {company?.city ? `${company.city}, ${company.state}` : 'Not set'}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body2" sx={{ color: '#999' }}>
                      No company registered yet. Click "Add" to register your company.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, p: 3, background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Welcome to your dashboard! Here you can manage your account and company information.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default DashboardPage;

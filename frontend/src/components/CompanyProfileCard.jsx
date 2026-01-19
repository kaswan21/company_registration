import { Box, Card, CardContent, Typography, Button, Grid, Chip, Divider, Alert, Paper, useTheme, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CompanyProfileCard = ({ onEdit, onCreate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const company = useSelector((state) => state.company.profile);

  if (!company) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              textAlign: 'center',
              py: isMobile ? 2 : 4,
              px: isMobile ? 1 : 2,
            }}
          >
            <BusinessIcon
              sx={{
                fontSize: isMobile ? 48 : 64,
                color: 'text.secondary',
                mb: 2,
              }}
            />
            <Typography variant={isMobile ? 'body1' : 'h6'} gutterBottom>
              No Company Profile Yet
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Create a company profile to get started with Bluestock
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={onCreate}
              variant="contained"
              size={isMobile ? 'small' : 'medium'}
            >
              Register Company
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            mb: 2,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 2 : 0,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              gutterBottom
              sx={{ wordBreak: 'break-word' }}
            >
              {company.company_name}
            </Typography>
            <Chip
              label={company.industry}
              size={isMobile ? 'small' : 'medium'}
              variant="outlined"
              color="primary"
              sx={{ mb: 2 }}
            />
          </Box>

          <Button
            startIcon={<EditIcon />}
            onClick={onEdit}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
            sx={{ minWidth: isMobile ? 'auto' : '140px', alignSelf: isMobile ? 'flex-start' : 'flex-start' }}
          >
            {isMobile ? '' : 'Edit Company'}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Company Details Grid */}
        <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: isMobile ? 1.5 : 2, bgcolor: '#f5f5f5' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationOnIcon fontSize="small" color="primary" />
                <Typography variant="caption" color="textSecondary">
                  Address
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                {company.address}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                {company.city}, {company.state}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                {company.country} - {company.postal_code}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: isMobile ? 1.5 : 2, bgcolor: '#f5f5f5' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LanguageIcon fontSize="small" color="primary" />
                <Typography variant="caption" color="textSecondary">
                  Website
                </Typography>
              </Box>
              {company.website ? (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: 'primary.main',
                    cursor: 'pointer',
                    wordBreak: 'break-all',
                    fontSize: isMobile ? '0.875rem' : '1rem',
                  }}
                  onClick={() => window.open(company.website, '_blank')}
                >
                  {company.website}
                </Typography>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Not provided
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Description */}
        {company.description && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="caption" color="textSecondary" display="block" sx={{ mb: 1 }}>
                About Company
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  lineHeight: 1.6,
                }}
              >
                {company.description}
              </Typography>
            </Box>
          </>
        )}

        {/* Logo & Banner */}
        {(company.logo_url || company.banner_url) && (
          <>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={isMobile ? 1 : 2}>
              {company.logo_url && (
                <Grid item xs={isMobile ? 6 : 3}>
                  <Paper sx={{ p: 1, textAlign: 'center' }}>
                    <img
                      src={company.logo_url}
                      alt="Company Logo"
                      style={{
                        maxWidth: '100%',
                        maxHeight: isMobile ? 80 : 120,
                        objectFit: 'contain',
                      }}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ mt: 1, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                    >
                      Logo
                    </Typography>
                  </Paper>
                </Grid>
              )}
              {company.banner_url && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 1 }}>
                    <img
                      src={company.banner_url}
                      alt="Company Banner"
                      style={{
                        maxWidth: '100%',
                        maxHeight: isMobile ? 100 : 150,
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ mt: 1, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                    >
                      Banner
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </>
        )}

        {/* Meta Information */}
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={isMobile ? 1 : 2}>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" color="textSecondary" display="block">
              Created
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: isMobile ? '0.875rem' : '1rem',
              }}
            >
              {new Date(company.created_at).toLocaleDateString('en-IN')}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" color="textSecondary" display="block">
              Updated
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: isMobile ? '0.875rem' : '1rem',
              }}
            >
              {new Date(company.updated_at).toLocaleDateString('en-IN')}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CompanyProfileCard.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CompanyProfileCard;

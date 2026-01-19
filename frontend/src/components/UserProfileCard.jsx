import { Box, Card, CardContent, Typography, Button, Grid, Avatar, Chip, Divider, useTheme, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const UserProfileCard = ({ onEdit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return null;
  }

  const genderDisplay = {
    m: 'Male',
    f: 'Female',
    o: 'Other',
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 2 : 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: isMobile ? '100%' : 'auto' }}>
            <Avatar
              sx={{
                width: isMobile ? 60 : 80,
                height: isMobile ? 60 : 80,
                bgcolor: 'primary.main',
                fontSize: isMobile ? '1.5rem' : '2rem',
              }}
            >
              {user.full_name?.charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
                {user.full_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom sx={{ wordBreak: 'break-all' }}>
                {user.email}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                {user.is_email_verified && (
                  <Chip
                    icon={<VerifiedUserIcon />}
                    label="Email"
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                )}
                {user.is_mobile_verified && (
                  <Chip
                    icon={<VerifiedUserIcon />}
                    label="Mobile"
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                )}
              </Box>
            </Box>
          </Box>

          <Button
            startIcon={<EditIcon />}
            onClick={onEdit}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
            sx={{ alignSelf: isMobile ? 'flex-start' : 'flex-start', minWidth: isMobile ? 'auto' : '120px' }}
          >
            {isMobile ? '' : 'Edit'}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={isMobile ? 1 : 2}>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" color="textSecondary" display="block">
              Gender
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: isMobile ? '0.875rem' : '1rem' }}>
              {genderDisplay[user.gender] || user.gender}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" color="textSecondary" display="block">
              Mobile
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: isMobile ? '0.875rem' : '1rem' }}>
              {user.mobile_no}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" color="textSecondary" display="block">
              Account
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: isMobile ? '0.875rem' : '1rem' }}>
              Email
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" color="textSecondary" display="block">
              Member Since
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: isMobile ? '0.875rem' : '1rem' }}>
              {new Date(user.created_at).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

UserProfileCard.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default UserProfileCard;

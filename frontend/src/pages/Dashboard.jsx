import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Container,
	Box,
	Typography,
	Button,
	AppBar,
	Toolbar,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Alert,
	IconButton,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { clearAuth } from '../store/authSlice';
import { clearCompany } from '../store/companySlice';
import UserProfileCard from '../components/UserProfileCard';
import CompanyProfileCard from '../components/CompanyProfileCard';
import CompanyRegistrationForm from '../components/CompanyRegistrationForm';
import EditCompanyForm from '../components/EditCompanyForm';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { companyAPI } from '../api';
import { setProfile, setLoading } from '../store/companySlice';
import { toast } from 'react-toastify';

const Dashboard = ({ onLogout }) => {
	dispatch = useDispatch();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const isTablet = useMediaQuery(theme.breakpoints.down('md'));

	const user = useSelector((state) => state.auth.user);
	const company = useSelector((state) => state.company.profile);
	const loading = useSelector((state) => state.company.loading);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [page, setPage] = useState('overview'); // 'overview', 'company-create', 'company-edit'

	const handleLogout = async () => {
		try {
			await signOut(auth);
			dispatch(clearAuth());
			dispatch(clearCompany());
			localStorage.removeItem('token');
			localStorage.removeItem('firebaseUser');
			if (onLogout) {
				onLogout();
			}
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

	const handleNavClick = (newPage) => {
		setPage(newPage);
		if (isMobile) {
			setOpenDrawer(false);
		}
	};

	useEffect(() => {
		if (!user) {
			navigate('/login');
			return;
		}

		const fetchProfile = async () => {
			dispatch(setLoading(true));
			try {
				const response = await companyAPI.getProfile();
				dispatch(setProfile(response.data));
			} catch (error) {
				if (error.response?.status === 404) {
					toast.info('No company profile yet. Create one to get started.');
				} else {
					toast.error(error.response?.data?.error?.message || error.message);
				}
			} finally {
				dispatch(setLoading(false));
			}
		};

		fetchProfile();
	}, [user, dispatch, navigate]);

	if (!user) {
		return (
			<Container sx={{ mt: 4 }}>
				<Alert severity="error">Please log in to access the dashboard</Alert>
			</Container>
		);
	}

	return (
		<Box sx={{ display: 'flex' }}>
			{/* App Bar */}
			<AppBar position="fixed" sx={{ zIndex: 1300 }}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						{isMobile && (
							<IconButton
								color="inherit"
								onClick={() => setOpenDrawer(true)}
								sx={{ mr: 1 }}
							>
								<MenuIcon />
							</IconButton>
						)}
						<Typography
							variant={isMobile ? 'h6' : 'h6'}
							sx={{
								flexGrow: isMobile ? 0 : 1,
								fontSize: isMobile ? '1rem' : '1.25rem',
							}}
						>
							{isMobile ? '🏢' : '🏢 Bluestock'}
						</Typography>
					</Box>

					{!isMobile && <Typography sx={{ flexGrow: 1 }} />}

					<Button
						color="inherit"
						onClick={handleLogout}
						endIcon={<LogoutIcon />}
						sx={{
							fontSize: isMobile ? '0.75rem' : '0.875rem',
							'& .MuiSvgIcon-root': {
								fontSize: isMobile ? '1.2rem' : '1.5rem',
							},
						}}
					>
						{isMobile ? '' : 'Logout'}
					</Button>
				</Toolbar>
			</AppBar>

			{/* Drawer */}
			<Drawer
				anchor="left"
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				sx={{
					width: isMobile ? '100%' : 250,
					'& .MuiDrawer-paper': {
						width: isMobile ? '100%' : 250,
					},
				}}
			>
				<Box
					sx={{
						width: isMobile ? '100%' : 250,
						pt: 2,
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							px: 2,
							mb: 1,
						}}
					>
						<Typography variant="h6">Menu</Typography>
						{isMobile && (
							<IconButton
								onClick={() => setOpenDrawer(false)}
								size="small"
							>
								<CloseIcon />
							</IconButton>
						)}
					</Box>

					<List sx={{ flex: 1 }}>
						<ListItem disablePadding>
							<ListItemButton
								selected={page === 'overview'}
								onClick={() => handleNavClick('overview')}
							>
								<ListItemIcon>
									<DashboardIcon />
								</ListItemIcon>
								<ListItemText primary="Overview" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton
								selected={
									page === 'company-create' || page === 'company-edit'
								}
								onClick={() =>
									handleNavClick(company ? 'company-edit' : 'company-create')
								}
							>
								<ListItemIcon>
									<BusinessIcon />
								</ListItemIcon>
								<ListItemText
									primary={company ? 'Edit Company' : 'Register Company'}
								/>
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<SettingsIcon />
								</ListItemIcon>
								<ListItemText primary="Settings" />
							</ListItemButton>
						</ListItem>
					</List>

					<Divider sx={{ my: 2 }} />

					<Box sx={{ px: 2, pb: 2 }}>
						<Typography variant="caption" color="textSecondary" display="block">
							Logged in as
						</Typography>
						<Typography
							variant="body2"
							sx={{
								fontWeight: 500,
								wordBreak: 'break-word',
								fontSize: isMobile ? '0.75rem' : '0.875rem',
							}}
						>
							{user.email}
						</Typography>
					</Box>
				</Box>
			</Drawer>

			{/* Main Content */}
			<Box
				sx={{
					flexGrow: 1,
					p: isMobile ? 2 : 3,
					pt: isMobile ? 10 : 10,
					bgcolor: '#fafafa',
					minHeight: '100vh',
					width: '100%',
				}}
			>
				<Container maxWidth={isMobile ? 'sm' : isTablet ? 'md' : 'lg'}>
					{/* Overview Page */}
					{page === 'overview' && (
						<Box>
							<Typography
								variant={isMobile ? 'h5' : 'h4'}
								gutterBottom
								sx={{ mb: 3, fontSize: isMobile ? '1.5rem' : '2rem' }}
							>
								👋 Welcome, {isMobile ? user.full_name.split(' ')[0] : user.full_name}!
							</Typography>

							<Box sx={{ mb: 4 }}>
								<Typography
									variant={isMobile ? 'body1' : 'h6'}
									gutterBottom
									sx={{ mb: 2 }}
								>
									📋 Your Profile
								</Typography>
								<UserProfileCard onEdit={() => setPage('profile-edit')} />
							</Box>

							<Box>
								<Typography
									variant={isMobile ? 'body1' : 'h6'}
									gutterBottom
									sx={{ mb: 2 }}
								>
									🏢 Company Profile
								</Typography>
								<CompanyProfileCard
									onEdit={() => setPage('company-edit')}
									onCreate={() => setPage('company-create')}
								/>
							</Box>
						</Box>
					)}

					{/* Company Registration Page */}
					{page === 'company-create' && (
						<Box>
							<Button
								variant="text"
								onClick={() => setPage('overview')}
								sx={{ mb: 2 }}
							>
								← Back to Dashboard
							</Button>
							<CompanyRegistrationForm
								onSuccess={() => setPage('overview')}
							/>
						</Box>
					)}

					{/* Company Edit Page */}
					{page === 'company-edit' && (
						<Box>
							<Button
								variant="text"
								onClick={() => setPage('overview')}
								sx={{ mb: 2 }}
							>
								← Back to Dashboard
							</Button>
							{company && (
								<EditCompanyForm
									initialData={company}
									onSuccess={() => setPage('overview')}
									onCancel={() => setPage('overview')}
								/>
							)}
						</Box>
					)}
				</Container>
			</Box>
		</Box>
	);
};

export default Dashboard;

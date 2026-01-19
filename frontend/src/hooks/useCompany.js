import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getCompanyProfile,
  createCompanyProfile,
  updateCompanyProfile,
  uploadCompanyLogo,
  uploadCompanyBanner,
} from '../api/company';
import { toast } from 'react-toastify';

// Get company profile query
export const useGetCompanyProfile = (enabled = true) => {
  return useQuery({
    queryKey: ['companyProfile'],
    queryFn: getCompanyProfile,
    enabled,
    onError: (error) => {
      console.error('❌ Failed to load company profile:', error.message);
    },
  });
};

// Create company profile mutation
export const useCreateCompanyMutation = () => {
  return useMutation({
    mutationFn: createCompanyProfile,
    onSuccess: (data) => {
      console.log('✅ Company created');
      toast.success('Company registered successfully!');
    },
    onError: (error) => {
      console.error('❌ Company creation failed:', error.message);
      toast.error('Company registration failed: ' + error.message);
    },
  });
};

// Update company profile mutation
export const useUpdateCompanyMutation = () => {
  return useMutation({
    mutationFn: updateCompanyProfile,
    onSuccess: (data) => {
      console.log('✅ Company updated');
      toast.success('Company updated successfully!');
    },
    onError: (error) => {
      console.error('❌ Company update failed:', error.message);
      toast.error('Company update failed: ' + error.message);
    },
  });
};

// Upload company logo mutation
export const useUploadLogoMutation = () => {
  return useMutation({
    mutationFn: uploadCompanyLogo,
    onSuccess: (data) => {
      console.log('✅ Logo uploaded');
      toast.success('Logo uploaded successfully!');
    },
    onError: (error) => {
      console.error('❌ Logo upload failed:', error.message);
      toast.error('Logo upload failed: ' + error.message);
    },
  });
};

// Upload company banner mutation
export const useUploadBannerMutation = () => {
  return useMutation({
    mutationFn: uploadCompanyBanner,
    onSuccess: (data) => {
      console.log('✅ Banner uploaded');
      toast.success('Banner uploaded successfully!');
    },
    onError: (error) => {
      console.error('❌ Banner upload failed:', error.message);
      toast.error('Banner upload failed: ' + error.message);
    },
  });
};

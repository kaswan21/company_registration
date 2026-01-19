import client from './client';

// Get company profile
export const getCompanyProfile = async () => {
  const response = await client.get('/api/company/profile');
  return response.data;
};

// Create company profile
export const createCompanyProfile = async (companyData) => {
  const response = await client.post('/api/company/register', companyData);
  return response.data;
};

// Update company profile
export const updateCompanyProfile = async (companyData) => {
  const response = await client.put('/api/company/profile', companyData);
  return response.data;
};

// Upload company logo
export const uploadCompanyLogo = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await client.post('/api/company/upload-logo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Upload company banner
export const uploadCompanyBanner = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await client.post('/api/company/upload-banner', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

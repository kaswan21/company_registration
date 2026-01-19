import apiClient from './client';

export const companyAPI = {
  register: async (data) => {
    const response = await apiClient.post('/company/register', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/company/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await apiClient.put('/company/profile', data);
    return response.data;
  },
};

export default companyAPI;

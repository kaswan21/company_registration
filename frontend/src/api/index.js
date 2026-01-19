import axios from 'axios';
import store from '../store';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (firebaseToken) => api.post('/api/auth/login', { firebase_id_token: firebaseToken }),
  register: (data) => api.post('/api/auth/register', data),
};

export const companyAPI = {
  getProfile: () => api.get('/api/company/profile'),
  registerProfile: (data) => api.post('/api/company/register', data),
  updateProfile: (data) => api.put('/api/company/profile', data),
  uploadLogo: (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    return api.post('/api/company/upload-logo', formData);
  },
  uploadBanner: (file) => {
    const formData = new FormData();
    formData.append('banner', file);
    return api.post('/api/company/upload-banner', formData);
  },
};

export default api;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('appToken') || null,
  isAuthenticated: !!localStorage.getItem('appToken'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem('appToken', action.payload);
      } else {
        localStorage.removeItem('appToken');
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('appToken');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setToken, setLoading, setError, logout, clearError } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: null,
  loading: false,
  error: null,
  registrationStep: 1,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
      // Save to localStorage with user email as key
      if (action.payload && action.payload.email) {
        localStorage.setItem(`company_${action.payload.email}`, JSON.stringify(action.payload));
      }
    },
    updateCompany: (state, action) => {
      state.company = { ...state.company, ...action.payload };
      if (state.company && state.company.email) {
        localStorage.setItem(`company_${state.company.email}`, JSON.stringify(state.company));
      }
    },
    loadCompanyFromStorage: (state, action) => {
      // Load company data for specific user
      const userEmail = action.payload;
      const savedCompany = localStorage.getItem(`company_${userEmail}`);
      if (savedCompany) {
        state.company = JSON.parse(savedCompany);
      } else {
        state.company = null;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setRegistrationStep: (state, action) => {
      state.registrationStep = action.payload;
    },
    clearCompany: (state) => {
      if (state.company && state.company.email) {
        localStorage.removeItem(`company_${state.company.email}`);
      }
      state.company = null;
      state.registrationStep = 1;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCompany,
  updateCompany,
  loadCompanyFromStorage,
  setLoading,
  setError,
  setRegistrationStep,
  clearCompany,
  clearError,
} = companySlice.actions;
export default companySlice.reducer;

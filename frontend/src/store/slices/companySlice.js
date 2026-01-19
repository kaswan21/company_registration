import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	profile: null,
};

const companySlice = createSlice({
	name: 'company',
	initialState,
	reducers: {
		setCompanyProfile(state, action) {
			state.profile = action.payload;
		},
		clearCompanyProfile(state) {
			state.profile = null;
		},
	},
});

export const { setCompanyProfile, clearCompanyProfile } = companySlice.actions;
export default companySlice.reducer;

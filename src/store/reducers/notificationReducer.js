import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	notification: '',
};

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification: (state, action) => {
			state.notification = action.payload;
		},
		clearNotification: (state) => {
			state.notification = 0;
		},
	},
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './reducers/newsReducer';
import searchReducer from './reducers/searchSlice';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
	reducer: {
		news: newsReducer,
		search: searchReducer,
		notification: notificationReducer,
	},
});

export default store;

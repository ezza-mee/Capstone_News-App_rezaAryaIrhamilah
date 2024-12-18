import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	keyword: '',
	searchResults: [],
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchKeyword: (state, action) => {
			state.keyword = action.payload;
		},
		setSearchResults: (state, action) => {
			state.searchResults = action.payload;
		},
		clearSearch: (state) => {
			state.keyword = '';
			state.searchResults = [];
		},
	},
});

export const { setSearchKeyword, setSearchResults, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;

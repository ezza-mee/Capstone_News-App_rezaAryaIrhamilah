import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	bookmarkedNews: [],
};

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setBookmarkedNews: (state, action) => {
			state.bookmarkedNews = action.payload;
		},

		saveBookmark: (state, action) => {
			const news = action.payload;
			if (!state.bookmarkedNews.some((item) => item.web_url === news.web_url)) {
				state.bookmarkedNews.push(news);
			}
		},

		removeBookmark: (state, action) => {
			state.bookmarkedNews = state.bookmarkedNews.filter((news) => news.web_url !== action.payload);
		},
	},
});

export const { setBookmarkedNews, saveBookmark, removeBookmark } = newsSlice.actions;
export default newsSlice.reducer;

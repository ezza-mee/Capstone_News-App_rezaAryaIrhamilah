export const fetchNewsByKeyword = async (keyword) => {
	const NEWS_API_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
	const API_KEY = import.meta.env.VITE_API_KEY;

	try {
		const response = await fetch(`${NEWS_API_URL}?q=${keyword}&api-key=${API_KEY}`);
		const data = await response.json();
		return data.response?.docs || [];
	} catch (error) {
		console.error('Error fetching news with keyword', keyword, error);
		return [];
	}
};

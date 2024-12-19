import { useEffect, useState } from 'react';
import { fetchNewsByKeyword } from '../utils/fetchNews';
import NewsCard from '../components/NewsCard/NewsCard';

const HomePage = () => {
	const [news, setNews] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRandomNews = async () => {
			const keywords = ['technology', 'sports', 'business', 'health', 'entertainment']; 
			const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)]; 
			const data = await fetchNewsByKeyword(randomKeyword);
			setNews(data);
			setLoading(false);
		};

		fetchRandomNews();
	}, []);

	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="text-2xl font-bold mb-4 text-center">Top News Today</h1>
			{loading ? (
				<div className="text-center">Loading...</div>
			) : news.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{news.map((item) => (
						<NewsCard key={item._id} item={item} />
					))}
				</div>
			) : (
				<div className="text-center">No news found</div>
			)}
		</div>
	);
};

export default HomePage;

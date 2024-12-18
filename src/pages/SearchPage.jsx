import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard/NewsCard';
import { fetchNewsByKeyword } from '../utils/fetchNews';

const SearchPage = () => {
	const { keyword } = useParams(); 
	const [newsResults, setNewsResults] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchNewsByKeyword(keyword);
				setNewsResults(result);
			} catch (error) {
				console.error('Error fetching search results:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [keyword]);

	const handleSaveNews = (newsItem) => {
		const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];

		const newsExists = savedNews.some((item) => item.web_url === newsItem.web_url);

		if (!newsExists) {
			const updatedNews = [...savedNews, newsItem];
			localStorage.setItem('savedNews', JSON.stringify(updatedNews));
			alert('News saved successfully!');
		} else {
			alert('This news item is already saved.');
		}
	};

	if (loading) return <div className="text-center mt-10">Loading...</div>;

	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="text-2xl font-bold text-center mb-4">Results for {keyword}</h1>
			{newsResults.length === 0 ? (
				<div className="text-center mt-4">No results found.</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{newsResults.map((item, index) => (
						<NewsCard
							key={index}
							item={item}
							onSave={handleSaveNews} 
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchPage;

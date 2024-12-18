import { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard/NewsCard';
import { fetchNewsByKeyword } from '../utils/fetchNews';

const IndonesiaPage = () => {
	const [news, setNews] = useState([]); 
	const [loading, setLoading] = useState(true); 

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchNewsByKeyword('indonesia');
				setNews(result);
			} catch (error) {
				console.error('Error fetching news:', error);
			} finally {
				setLoading(false); 
			}
		};
		fetchData();
	}, []);

	const handleSave = (item) => {
		const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];

		const isAlreadySaved = savedArticles.some((article) => article.web_url === item.web_url);

		if (isAlreadySaved) {
			alert('Berita sudah disimpan sebelumnya!');
		} else {
			localStorage.setItem('savedArticles', JSON.stringify([...savedArticles, item]));
			alert('Berita berhasil disimpan!');
		}
	};

	const handleViewDetails = (url) => {
		if (url) {
			window.open(url, '_blank'); 
		} else {
			alert('URL tidak tersedia');
		}
	};

	if (loading) return <div className="text-center mt-10">Loading...</div>;

	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="text-2xl font-bold text-center mb-6">News Indonesia</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{news.length > 0 ? news.map((item, index) => <NewsCard key={index} item={item} onSave={handleSave} onViewDetails={handleViewDetails} />) : <div className="text-center mt-4">No news available</div>}
			</div>
		</div>
	);
};

export default IndonesiaPage;

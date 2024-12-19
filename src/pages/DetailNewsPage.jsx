import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNewsByKeyword } from '../utils/fetchNews';
import { ArrowLeftIcon, LinkIcon } from '@heroicons/react/24/solid';

const DetailNewsPage = () => {
	const { id } = useParams();
	const [newsDetails, setNewsDetails] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchNewsDetails = async () => {
			if (!id) {
				setError('Invalid news ID');
				return;
			}

			try {
				const newsList = await fetchNewsByKeyword(id);

				if (newsList?.length > 0) {
					setNewsDetails(newsList);
				} else {
					setError('News not found');
				}
			} catch (error) {
				console.error('Error fetching news details:', error);
				setError('Failed to load news');
			}
		};

		fetchNewsDetails();
	}, [id]);

	if (error) {
		return (
			<div className="container mx-auto px-4 py-6">
				<h1 className="text-2xl font-bold mb-4 text-red-500">Error: {error}</h1>
			</div>
		);
	}

	if (!newsDetails.length) {
		return <div className="container mx-auto px-4 py-6">Loading...</div>;
	}

	return (
		<div className="container mx-auto px-4 py-6">
			{newsDetails.map((news) => (
				<div key={news._id} className="mb-6 border rounded-lg shadow-md p-4">
					<h1 className="text-3xl font-bold mb-2">{news?.headline?.main ?? 'Title Unavailable'}</h1>
					<p className="text-gray-600 mb-2">{news?.byline?.original ?? 'Unknown'}</p>
					<p className="text-gray-600 mb-2">{news?.pub_date ? new Date(news.pub_date).toLocaleString() : 'Date not available'}</p>
					<p className="text-gray-700 mb-2">{news?.source ?? 'Unknown'}</p>
					<p className="text-gray-700 mb-4">{news?.abstract ?? 'Description not available'}</p>
					<div className="flex justify-between">
						<div>
							<a href="/homePage" className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
								<ArrowLeftIcon className="w-5 h-5 mr-2" />
								Back
							</a>
						</div>
						<div>
							<a href={news?.web_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
								Click Here
								<LinkIcon className="w-5 h-5 ml-2" />
							</a>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default DetailNewsPage;

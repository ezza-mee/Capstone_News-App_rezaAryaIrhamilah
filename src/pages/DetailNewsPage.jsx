import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchNewsByKeyword } from '../utils/fetchNews';

const DetailNewsPage = () => {
	const { id } = useParams(); 
	const [newsDetails, setNewsDetails] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchNewsDetails = async () => {
			if (!id) {
				setError('ID berita tidak valid');
				return;
			}

			try {
				const newsList = await fetchNewsByKeyword(id);

				if (newsList?.length > 0) {
					setNewsDetails(newsList);
				} else {
					setError('Berita tidak ditemukan');
				}
			} catch (error) {
				console.error('Error fetching news details:', error);
				setError('Gagal memuat berita');
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
			{/* Judul dan Informasi Berita */}
			{newsDetails.map((news) => (
				<div key={news._id} className="mb-6 border rounded-lg shadow-md p-4">
					{/* Judul */}
					<h1 className="text-3xl font-bold mb-2">{news?.headline?.main ?? 'Judul Tidak Tersedia'}</h1>

					{/* Informasi Detail Berita */}
					<p className="text-gray-600 mb-2">
						<span className="font-semibold">Penulis: </span>
						{news?.byline?.original ?? 'Unknown'}
					</p>
					<p className="text-gray-600 mb-2">
						<span className="font-semibold">Tanggal: </span>
						{news?.pub_date ? new Date(news.pub_date).toLocaleString() : 'Tanggal tidak tersedia'}
					</p>
					<p className="text-gray-700 mb-2">
						<span className="font-semibold">Sumber: </span>
						{news?.source ?? 'Unknown'}
					</p>

					{/* Deskripsi */}
					<p className="text-gray-700 mb-4">{news?.abstract ?? 'Deskripsi tidak tersedia'}</p>

					{/* Link ke berita asli */}
					<a href={news?.web_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
						Buka Berita Asli
					</a>
				</div>
			))}
		</div>
	);
};

export default DetailNewsPage;

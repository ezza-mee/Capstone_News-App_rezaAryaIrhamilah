import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeBookmark } from '../../store/reducers/newsReducer';
import { setNotification } from '../../store/reducers/notificationReducer';

const NewsCard = ({ item }) => {
	const dispatch = useDispatch();
	const [isSaved, setIsSaved] = useState(false);

	useEffect(() => {
		const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
		setIsSaved(savedNews.some((news) => news.web_url === item.web_url));
	}, [item.web_url]);

	const handleSave = () => {
		const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
		savedNews.push(item);
		localStorage.setItem('savedNews', JSON.stringify(savedNews));
		setIsSaved(true);

		dispatch(setNotification(savedNews.length));
	};

	const handleDelete = () => {
		let savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
		savedNews = savedNews.filter((news) => news.web_url !== item.web_url);
		localStorage.setItem('savedNews', JSON.stringify(savedNews));

		dispatch(removeBookmark(item.web_url));
		setIsSaved(false);

		dispatch(setNotification(savedNews.length));
	};

	return (
		<div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
			{/* Judul Berita */}
			<h2 className="text-lg font-semibold mb-2">{item.headline?.main || 'No Title Available'}</h2>

			{/* Deskripsi */}
			<p className="text-sm text-gray-600 mb-4">{item.abstract || 'No Description Available'}</p>

			{/* Tombol Navigasi dan Simpan/Delete */}
			<div className="flex justify-between space-x-2 mt-3">
				<Link to={`/detailNews/${encodeURIComponent(item.web_url)}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
					Detail News
				</Link>

				{/* Tombol Simpan atau Delete */}
				{isSaved ? (
					<button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={handleDelete}>
						Delete
					</button>
				) : (
					<button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded" onClick={handleSave}>
						Save
					</button>
				)}
			</div>
		</div>
	);
};

NewsCard.propTypes = {
	item: PropTypes.shape({
		headline: PropTypes.shape({
			main: PropTypes.string,
		}),
		abstract: PropTypes.string,
		web_url: PropTypes.string,
	}).isRequired,
};

export default NewsCard;

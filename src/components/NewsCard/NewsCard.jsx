import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeBookmark } from '../../store/reducers/newsReducer';
import { setNotification } from '../../store/reducers/notificationReducer';
import { BookmarkIcon, BookmarkSlashIcon, EyeIcon } from '@heroicons/react/24/outline'; 

const NewsCard = ({ item }) => {
	const dispatch = useDispatch();
	const [isSaved, setIsSaved] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
		setIsSaved(savedNews.some((news) => news.web_url === item.web_url));

		setIsLoaded(true);
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

	const formatDate = (dateString) => {
		if (!dateString) return 'No Date Available';
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};

	return (
		<div className={`bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all duration-500 transform ${isLoaded ? '-translate-y-100' : 'translate-y-10'} `}>
			{/* Judul Berita */}
			<h2 className="text-lg font-semibold mb-2">{item.headline?.main || 'No Title Available'}</h2>

			{/* Deskripsi */}
			<p className="text-sm text-gray-600 mb-4">{item.abstract || 'No Description Available'}</p>

			{/* Tanggal dan Source */}
			<div className="text-xs text-gray-500 mb-4">
				<p>
					{formatDate(item.pub_date)} | Source: {item.source || 'No Source Available'}
				</p>
			</div>

			{/* Tombol Navigasi dan Simpan/Delete */}
			<div className="flex justify-between space-x-2 mt-3">
				<Link to={`/detailNews/${encodeURIComponent(item.web_url)}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center space-x-1">
					<EyeIcon className="h-5 w-5" /> <span>Detail News</span>
				</Link>

				{/* Tombol Simpan atau Delete */}
				{isSaved ? (
					<button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center space-x-1" onClick={handleDelete}>
						<BookmarkSlashIcon className="h-5 w-5" /> <span>Un-save</span>
					</button>
				) : (
					<button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center space-x-1" onClick={handleSave}>
						<BookmarkIcon className="h-5 w-5" /> <span>Save</span>
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
		pub_date: PropTypes.string,
		source: PropTypes.string,
	}).isRequired,
};

export default NewsCard;

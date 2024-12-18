import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NewsCard from '../components/NewsCard/NewsCard';
import { setBookmarkedNews, removeBookmark } from '../store/reducers/newsReducer'; 

const BookmarksPage = () => {
	const dispatch = useDispatch();
	const bookmarkedNews = useSelector((state) => state.news.bookmarkedNews);

	useEffect(() => {
		try {
			const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
			if (Array.isArray(savedNews)) {
				dispatch(setBookmarkedNews(savedNews));
			} else {
				console.error('Data di localStorage tidak valid');
				dispatch(setBookmarkedNews([]));
			}
		} catch (error) {
			console.error('Gagal memuat data dari localStorage:', error);
			dispatch(setBookmarkedNews([]));
		}
	}, [dispatch]);

	const handleDelete = (web_url) => {
		dispatch(removeBookmark(web_url));
		const updatedBookmarks = bookmarkedNews.filter((news) => news.web_url !== web_url);
		localStorage.setItem('savedArticles', JSON.stringify(updatedBookmarks));
	};

	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="text-2xl font-bold mb-4">Bookmarks</h1>
			{bookmarkedNews.length === 0 ? (
				<p className="text-gray-600">Belum ada berita yang disimpan.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{bookmarkedNews.map((item) => (
						<NewsCard key={item.web_url} item={item} onDelete={() => handleDelete(item.web_url)} />
					))}
				</div>
			)}
		</div>
	);
};

export default BookmarksPage;

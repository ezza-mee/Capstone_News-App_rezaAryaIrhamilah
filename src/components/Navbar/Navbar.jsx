import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../store/reducers/notificationReducer';
import Search from './Search/Search';
import '../../index.css';

const Navbar = () => {
	const dispatch = useDispatch();
	const savedNewsCount = useSelector((state) => state.notification.notification);

	const updateSavedNewsCount = () => {
		const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
		dispatch(setNotification(savedNews.length));
	};

	return (
		<nav className="bg-blue-500 shadow-md py-4">
			<div className="container mx-auto px-6 flex items-center justify-between">
				{/* Logo Brand */}
				<div className="text-white text-2xl font-bold">News App</div>

				{/* Menu Navigasi */}
				<div className="hidden md:flex space-x-4">
					<Link to="/homePage" className="text-white hover:text-gray-200">
						Home
					</Link>
					<Link to="/indonesiaPage" className="text-white hover:text-gray-200">
						Indonesia
					</Link>
					<Link to="/programmingPage" className="text-white hover:text-gray-200">
						Programming
					</Link>
					<Link to="/covidPage" className="text-white hover:text-gray-200">
						Covid-19
					</Link>
					<div className="relative">
						<Link to="/bookmarksPage" className="text-white hover:text-gray-200 flex items-center" onClick={updateSavedNewsCount}>
							Bookmarks
							{savedNewsCount > 0 && <span className="absolute -top-2 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">{savedNewsCount}</span>}
						</Link>
					</div>
				</div>

				{/* Search Bar */}
				<Search />
			</div>
		</nav>
	);
};

export default Navbar;

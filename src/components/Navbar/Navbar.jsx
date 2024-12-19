import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setNotification } from '../../store/reducers/notificationReducer';
import Search from './Search/Search';
import '../../index.css';

const Navbar = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const savedNewsCount = useSelector((state) => state.notification.notification);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const updateSavedNewsCount = () => {
		const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
		dispatch(setNotification(savedNews.length));
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const isActive = (path) => location.pathname === path;

	return (
		<nav className="bg-blue-500 shadow-md fixed top-0 left-0 w-full z-50">
			<div className="container mx-auto px-6 py-4 flex items-center justify-between">
				{/* Logo Brand */}
				<div className="text-white text-2xl font-bold">ZzaNews</div>

				{/* Hamburger Button */}
				<button className="text-white md:hidden focus:outline-none fixed top-4 right-6 z-50" onClick={toggleMenu}>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
					</svg>
				</button>

				{/* Menu Navigation */}
				{/* Adjust visibility for small screens */}
				<div className={`${isMenuOpen ? 'block' : 'hidden'} xl:ml-16 xl:w-full xl:flex xl:justify-center md:flex md:items-center md:w-auto`}>
					<div className="flex flex-col md:flex-row md:items-center md:space-x-4 bg-blue-500 md:bg-transparent fixed md:static top-16 left-0 w-full md:w-auto h-screen md:h-auto overflow-y-auto md:overflow-visible space-y-4 md:space-y-0 px-6 md:px-0 pt-4 md:pt-0">
						<Link to="/homePage" className={`text-white hover:text-gray-200 ${isActive('/homePage') ? 'font-bold' : ''}`} onClick={toggleMenu}>
							Home
						</Link>
						<Link to="/indonesiaPage" className={`text-white hover:text-gray-200 ${isActive('/indonesiaPage') ? 'font-bold' : ''}`} onClick={toggleMenu}>
							Indonesia
						</Link>
						<Link to="/programmingPage" className={`text-white hover:text-gray-200 ${isActive('/programmingPage') ? 'font-bold' : ''}`} onClick={toggleMenu}>
							Programming
						</Link>
						<Link to="/covidPage" className={`text-white hover:text-gray-200 ${isActive('/covidPage') ? 'font-bold' : ''}`} onClick={toggleMenu}>
							Covid-19
						</Link>
						<Link
							to="/bookmarksPage"
							className={`text-white hover:text-gray-200 flex items-center ${isActive('/bookmarksPage') ? 'font-bold' : ''}`}
							onClick={() => {
								updateSavedNewsCount();
								toggleMenu();
							}}
						>
							Bookmarks
							{savedNewsCount > 0 && <span className="ml-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 mb-3 rounded-full">{savedNewsCount}</span>}
						</Link>
						{/* Search Bar */}
						<div className="xl:relative xl:left-40">
							<Search />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

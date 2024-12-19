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
				<Link to="/homePage" className="text-white text-2xl font-bold">
					ZzaNews
				</Link>
				<button className="text-white md:hidden focus:outline-none fixed top-4 right-6 z-50" onClick={toggleMenu}>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
					</svg>
				</button>
				<div className={`${isMenuOpen ? 'block' : 'hidden'} xl:ml-16 xl:w-full xl:flex xl:justify-center md:flex md:items-center md:w-auto`}>
					<div className="flex flex-col md:flex-row md:items-center md:space-x-4 bg-blue-500 md:bg-transparent fixed md:static top-16 left-0 w-full md:w-auto overflow-y-auto md:overflow-visible space-y-4 md:space-y-0 px-6 md:px-0 pt-4 md:pt-0 py-4 xl:py-0">
						{['/homePage', '/indonesiaPage', '/programmingPage', '/covidPage', '/bookmarksPage'].map((path, index) => {
							const labels = ['Home', 'Indonesia', 'Programming', 'Covid-19', 'Bookmarks'];
							return (
								<Link
									key={path}
									to={path}
									className={`relative text-white hover:text-gray-200 flex items-center ${isActive(path) ? 'font-bold' : ''}`}
									onClick={
										path === '/bookmarksPage'
											? () => {
													updateSavedNewsCount();
													toggleMenu();
											  }
											: toggleMenu
									}
								>
									{labels[index]}
									<div className={`absolute left-0 bottom-0 w-full h-0.5 transition-all duration-300 ${isActive(path) ? 'bg-white' : 'hover:bg-gray-200'}`}></div>
									{path === '/bookmarksPage' && savedNewsCount > 0 && <span className="ml-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 mb-3 rounded-full">{savedNewsCount}</span>}
								</Link>
							);
						})}
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

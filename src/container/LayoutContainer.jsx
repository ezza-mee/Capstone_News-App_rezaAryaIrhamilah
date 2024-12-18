import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../store/reducers/notificationReducer';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const LayoutContainer = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const handleSavedNewsCount = () => {
			const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
			dispatch(setNotification(savedNews.length));
		};

		handleSavedNewsCount();
	}, [dispatch]);

	return (
		<>
			<div className="min-h-screen flex flex-col bg-gray-100">
				{/* Navbar */}
				<Navbar />

				{/* Main Content Area */}
				<main className="flex-grow container mx-auto px-4 py-6">
					<Outlet />
				</main>

				{/* Footer */}
				<Footer />
			</div>
		</>
	);
};

export default LayoutContainer;

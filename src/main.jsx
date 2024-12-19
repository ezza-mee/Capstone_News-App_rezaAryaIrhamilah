import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import LayoutContainer from './container/LayoutContainer';
import IndonesiaPage from './pages/IndonesiaPage';
import ErrorPage from './error-page';
import ProgrammingPage from './pages/ProgrammingPage';
import CovidPage from './pages/CovidPages';
import DetailNewsPage from './pages/DetailNewsPage';
import BookmarksPage from './pages/BookmarksPage';
import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LayoutContainer />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/homePage',
				element: <HomePage />,
			},
			{
				path: '/indonesiaPage',
				element: <IndonesiaPage />,
			},
			{
				path: '/programmingPage',
				element: <ProgrammingPage />,
			},
			{
				path: '/covidPage',
				element: <CovidPage />,
			},
			{
				path: '/news/:keyword',
				element: <SearchPage />,
			},
			{
				path: '/bookmarksPage',
				element: <BookmarksPage />,
			},
			{
				path: '/detailNews/:id',
				element: <DetailNewsPage />,
			},
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);

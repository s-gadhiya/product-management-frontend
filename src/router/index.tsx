import Dashboard from '@/features/Dashboard';
import ProductsList from '@/features/Products/ProductsList';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
	},
	{
		path: '/products',
		element: <ProductsList />,
	},
]);

export default router;

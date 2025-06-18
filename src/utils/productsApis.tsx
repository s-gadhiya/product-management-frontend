import type { Product } from '@/features/Products/types';
import callAPI from './callAPI';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;

export const fetchProductsList = async (
	search = '',
	status = ''
): Promise<AnyType[]> => {
	try {
		const queryParams: Record<string, string> = {};
		if (search) {
			queryParams.search = search;
		}
		if (status && status !== 'all') {
			queryParams.status = status;
		}

		const searchParams = new URLSearchParams(queryParams);

		const response: AnyType = await callAPI(
			'GET',
			`/products?${searchParams.toString()}`
		);

		if (response.status === 200) {
			return response.data?.response?.products;
		} else {
			console.error('Failed to fetch products:', response.message);
		}
	} catch (err) {
		console.error('Error fetching products:', err);
	}

	return [];
};

export const createProduct = async (productData: Partial<Product>) => {
	const response = await callAPI('POST', '/products', productData);
	return response;
};

export const updateProduct = async (
	id: string,
	productData: Partial<Product>
) => {
	const response = await callAPI('PUT', `/products/${id}`, productData);
	return response;
};

export const deleteProduct = async (id: string) => {
	const response = await callAPI('DELETE', `/products/${id}`);
	return response;
};

import axios, {
	type AxiosRequestConfig,
	type AxiosResponse,
	type Method,
} from 'axios';
import { API_URL } from './API_CONFIG';

interface ApiError {
	message: string;
	status: number;
}

const api = axios.create({
	baseURL: API_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const callAPI = async (
	method: Method,
	endpoint: string,
	data?: unknown,
	config?: AxiosRequestConfig
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
	try {
		const response: AxiosResponse = await api.request({
			method,
			url: endpoint,
			data,
			...config,
		});

		return {
			data: response.data,
			status: response.status,
			message: 'Success',
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw {
			message: error.response?.data?.message || 'Something went wrong',
			status: error.response?.status || 500,
		} as ApiError;
	}
};

export default callAPI;

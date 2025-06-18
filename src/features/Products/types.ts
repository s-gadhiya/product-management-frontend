export type Product = {
	_id: string;
	name: string;
	price: number;
	status: 'active' | 'archived';
	tags: string[];
};

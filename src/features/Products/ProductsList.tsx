import { useState, useEffect, useRef, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Product } from './types';
import ProductCard from './components/ProductCard';
import Dropdown from '@/components/shared/Dropdown';
import { productFilterStatus } from './misc/constants';
import CreateProductDialog from './components/CreateProductDialog';
import { fetchProductsList } from '@/utils/productsApis';

export default function ProductsList() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [isCreateDialogOpen, setIsDialogOpen] = useState(false);
	const timeoutRef = useRef<null | NodeJS.Timeout>(null);
	const [editingProductId, setEditingProductId] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);

			const products = await fetchProductsList(searchQuery, statusFilter);
			setProducts(products as Product[]);

			setLoading(false);
		};

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			fetchProducts();
		}, 300);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [searchQuery, statusFilter]);

	const handleProductAction = (product: Product) => {
		if (editingProductId) {
			setProducts((prev) =>
				prev.map((existingProduct) =>
					existingProduct._id === product._id ? product : existingProduct
				)
			);
		} else {
			setProducts([...products, product]);
		}
		setIsDialogOpen(false);
	};

	const handleProductDelete = (productId: string) => {
		setProducts(products.filter((product) => product._id !== productId));
	};

	// Find editing product details
	const editingProductData = useMemo(() => {
		const product = products.find(
			(product) => product._id === editingProductId
		);
		return {
			_id: product?._id || '',
			name: product?.name || '',
			price: product?.price || 0,
			status: product?.status || 'active',
			tags: product?.tags.join(',') || '',
		};
	}, [editingProductId, products]);

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Products</h1>

				<Button onClick={() => setIsDialogOpen(true)}>
					Create New Product
				</Button>
			</div>

			{/* SubHeader - Search, Filter */}
			<div className="space-y-4 mb-6">
				<div className="flex flex-col md:flex-row gap-4">
					{/* Search Input */}
					<Input
						type="search"
						placeholder="Search products or tags..."
						value={searchQuery}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setSearchQuery(e.target.value)
						}
						className="md:w-1/4"
					/>

					{/* Product Status */}
					<Dropdown
						options={productFilterStatus}
						value={statusFilter}
						onChange={(value) => setStatusFilter(value)}
						className="w-fit"
					/>
				</div>
			</div>

			{/* Products */}
			{loading ? (
				<div className="text-center py-8">
					<p className="text-lg">Loading products...</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{products.map((product) => (
						<ProductCard
							key={product._id}
							product={product}
							onProductEdit={() => {
								setEditingProductId(product._id);
								setIsDialogOpen(true);
							}}
							onProductDeleted={handleProductDelete}
						/>
					))}
				</div>
			)}

			{/* Create New Product */}
			<CreateProductDialog
				action={editingProductId ? 'update' : 'create'}
				productData={editingProductData}
				isOpen={isCreateDialogOpen}
				onOpenChange={setIsDialogOpen}
				handleProductAction={handleProductAction}
			/>
		</div>
	);
}

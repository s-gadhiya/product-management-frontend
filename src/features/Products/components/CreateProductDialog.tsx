import React, { useEffect, useState } from 'react';
import DialogBox from '@/components/shared/DialogBox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Dropdown from '@/components/shared/Dropdown';
import { Button } from '@/components/ui/button';
import { productStatusOptions } from '../misc/constants';
import { toast } from 'sonner';
import type { Product } from '../types';
import { createProduct, updateProduct } from '@/utils/productsApis';

type ProductState = {
	name: string;
	price: number;
	status: 'active' | 'archived';
	tags: string;
	_id?: string;
};

type ValidationErrors = {
	name?: string;
	price?: string;
	tags?: string;
};

type CreateProductDialogProps = {
	action: 'create' | 'update';
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	handleProductAction: (product: Product) => void;
	productData?: ProductState;
};

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
	action,
	isOpen,
	onOpenChange,
	handleProductAction,
	productData,
}) => {
	const [newProduct, setNewProduct] = useState<ProductState>({
		name: '',
		price: 0,
		status: 'active',
		tags: '',
	});
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<ValidationErrors>({});

	// At time of update product setting the product details
	useEffect(() => {
		if (productData && action === 'update') {
			setNewProduct(productData);
		}
	}, [productData, action]);

	const validateForm = (): boolean => {
		const newErrors: ValidationErrors = {};

		if (!newProduct.name.trim()) {
			newErrors.name = 'Name is required';
		}

		if (newProduct.price <= 0) {
			newErrors.price = 'Price must be greater than 0';
		}

		if (newProduct.tags.trim() && !/^[a-zA-Z0-9\s,]+$/.test(newProduct.tags)) {
			newErrors.tags =
				'Tags can only contain letters, numbers, spaces, and commas';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSuccess = (product: Product & { _id: string }) => {
		console.log({ action, product });
		handleProductAction(product);
		onOpenChange(false);
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;

		setLoading(true);
		try {
			const formattedProduct = {
				...newProduct,
				tags: newProduct.tags
					.split(',')
					.map((tag) => tag.trim())
					.filter(Boolean),
			};

			const response =
				action === 'create'
					? await createProduct(formattedProduct)
					: await updateProduct(productData?._id || '', formattedProduct);

			if (response.status === 201 || response.status === 200) {
				handleSuccess(response.data?.response?.product);
			} else {
				throw new Error(response.message);
			}
		} catch (error) {
			console.error(error);
			toast.error(`Failed to ${action} product`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<DialogBox
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title="Create New Product"
		>
			<div className="space-y-4">
				<div>
					<Label htmlFor="name" className="mb-2">
						Name
					</Label>
					<Input
						id="name"
						value={newProduct.name}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setNewProduct((prev) => ({ ...prev, name: e.target.value }))
						}
						className={errors.name ? 'border-red-500' : ''}
					/>
					{errors.name && (
						<p className="text-sm text-red-500 mt-1">{errors.name}</p>
					)}
				</div>
				<div>
					<Label htmlFor="price" className="mb-2">
						Price
					</Label>
					<Input
						id="price"
						type="number"
						value={newProduct.price}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setNewProduct((prev) => ({
								...prev,
								price: parseFloat(e.target.value) || 0,
							}))
						}
						className={errors.price ? 'border-red-500' : ''}
					/>
					{errors.price && (
						<p className="text-sm text-red-500 mt-1">{errors.price}</p>
					)}
				</div>
				<div>
					<Label htmlFor="status" className="mb-2">
						Status
					</Label>
					<Dropdown
						options={productStatusOptions}
						value={newProduct.status}
						onChange={(value) =>
							setNewProduct((prev) => ({
								...prev,
								status: value as Product['status'],
							}))
						}
						className="w-full"
					/>
				</div>
				<div>
					<Label htmlFor="tags" className="mb-2">
						Tags (comma-separated)
					</Label>
					<Input
						id="tags"
						value={newProduct.tags}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setNewProduct((prev) => ({
								...prev,
								tags: e.target.value,
							}))
						}
						placeholder="Enter tags separated by commas"
						className={errors.tags ? 'border-red-500' : ''}
					/>
					{errors.tags && (
						<p className="text-sm text-red-500 mt-1">{errors.tags}</p>
					)}
				</div>
				<div className="flex justify-end space-x-2">
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={loading}
					>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={loading}>
						{action === 'create' ? 'Create Product' : 'Update Product'}
					</Button>
				</div>
			</div>
		</DialogBox>
	);
};

export default CreateProductDialog;

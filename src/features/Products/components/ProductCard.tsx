import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import type { Product } from '../types';
import { deleteProduct } from '@/utils/productsApis';
import ConfirmDialog from '@/components/shared/ConfirmDialog';

type ProductCardProps = {
	product: Product;
	onProductEdit: (productId: string) => void;
	onProductDeleted: (productId: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onProductDeleted,
	onProductEdit,
}) => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			const response = await deleteProduct(product._id);

			if (response?.status === 200) {
				onProductDeleted(product._id);
				toast.success('Product deleted successfully');
			} else {
				toast.error(response.message || 'Failed to delete product');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsDeleting(false);
			setIsDeleteDialogOpen(false);
		}
	};

	return (
		<>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-xl">{product.name}</CardTitle>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => onProductEdit(product._id)}>
								<Pencil className="mr-2 h-4 w-4" />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								className="text-red-600"
								onClick={() => setIsDeleteDialogOpen(true)}
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
						<Badge
							variant={product.status === 'active' ? 'default' : 'secondary'}
						>
							{product.status}
						</Badge>
						<div className="flex flex-wrap gap-2">
							{product.tags.map((tag) => (
								<Badge key={tag} variant="outline">
									{tag}
								</Badge>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{isDeleteDialogOpen && (
				<ConfirmDialog
					isOpen={isDeleteDialogOpen}
					onOpenChange={setIsDeleteDialogOpen}
					title="Are you sure?"
					description="This action cannot be undone. This will permanently delete the product."
					isLoading={isDeleting}
					onConfirm={handleDelete}
					confirmText="Delete"
					confirmVariant="destructive"
				/>
			)}
		</>
	);
};

export default ProductCard;

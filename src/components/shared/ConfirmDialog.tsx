import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ConfirmDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	isLoading?: boolean;
	onConfirm: () => void;
	confirmText?: string;
	cancelText?: string;
	confirmVariant?: 'default' | 'destructive';
}

const ConfirmDialog = ({
	isOpen,
	onOpenChange,
	title,
	description,
	isLoading = false,
	onConfirm,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	confirmVariant = 'destructive',
}: ConfirmDialogProps) => {
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>
						{cancelText}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						disabled={isLoading}
						className={
							confirmVariant === 'destructive'
								? 'bg-red-600 hover:bg-red-700'
								: ''
						}
					>
						{isLoading ? 'Processing...' : confirmText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ConfirmDialog;

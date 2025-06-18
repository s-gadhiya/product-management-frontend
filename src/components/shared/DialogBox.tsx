import * as React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

interface DialogBoxProps {
	children: React.ReactNode;
	trigger?: React.ReactNode;
	title?: string;
	description?: string;
	className?: string;
	isOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({
	children,
	title,
	description,
	className,
	isOpen,
	onOpenChange,
}) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className={className}>
				<DialogHeader>
					{title && <DialogTitle>{title}</DialogTitle>}
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default DialogBox;

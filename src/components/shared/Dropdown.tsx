import * as React from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface Option {
	label: string;
	value: string | number;
}

interface DropdownProps {
	options: Option[];
	value?: string | number;
	onChange?: (value: string) => void;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
	options,
	value,
	onChange,
	placeholder = 'Select...',
	disabled,
	className,
}) => {
	return (
		<div>
			<Select
				value={value?.toString()}
				onValueChange={onChange}
				disabled={disabled}
			>
				<SelectTrigger className={className}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value.toString()}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default Dropdown;

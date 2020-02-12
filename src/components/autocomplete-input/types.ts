import React from 'react';

export interface SelectedItemViewComponentProps<T extends Object> {
	item: T;
	onCancel: () => void;
}

export interface AutocompleteInputProps<T extends Object> {
	selectedItem: T | null;
	changeSelectedItem: (newVal: T | null) => void;
	selectedItemViewComponent?: React.FC<SelectedItemViewComponentProps<T>>;

	autocompleteList: T[];
	autocompleteField: keyof T;

	placeholder?: string;
}

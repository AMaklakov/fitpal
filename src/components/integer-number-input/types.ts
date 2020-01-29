export interface IntegerNumberInputPropsModel {
	max?: number;
	min?: number;

	placeholder?: string;
	initialValue?: number;

	setValue: (v: number | '') => void;
}

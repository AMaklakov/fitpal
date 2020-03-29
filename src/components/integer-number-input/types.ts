export interface IntegerNumberInputPropsModel {
	max?: number;
	min?: number;

	placeholder?: string;

	value?: string;
	onChange: (v: string) => void;
}

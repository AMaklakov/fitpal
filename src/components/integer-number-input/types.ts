export interface IntegerNumberInputPropsModel {
	max?: number;
	min?: number;

	placeholder?: string;

	value?: number;
	onChange: (v: number) => void;
}

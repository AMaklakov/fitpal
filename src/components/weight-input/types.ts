export interface WeightInputProps {
	min?: number;
	max?: number;

	value?: number;
	onChange: (v: number) => void;
}

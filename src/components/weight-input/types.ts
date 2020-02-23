export interface WeightInputProps {
	min?: number;
	max?: number;

	value: number | null;
	onChange: (v: number | null) => void;

	hasAddHalfOption?: boolean;
}

export interface SelectInputProps {
	options: string[];
	cancelButtonIndex: number;

	value: string;
	valuePostfix?: string;
	onChange: (index: number) => void;
}

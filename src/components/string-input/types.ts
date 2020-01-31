export interface TextInputPropsModel {
	maxLength?: number;

	placeholder?: string;

	value: string;
	onTextChange: (v: string) => void;
}

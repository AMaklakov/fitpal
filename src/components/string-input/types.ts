export interface TextInputPropsModel {
	maxLength?: number;

	placeholder?: string;
	initValue?: string;

	onTextChange: (v: string) => void;
}

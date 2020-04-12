import { StyleProp, TextStyle } from 'react-native';

export interface TextInputPropsModel {
	maxLength?: number;

	placeholder?: string;

	value: string;
	onTextChange: (v: string) => void;

	inputStyle?: StyleProp<TextStyle>;
}

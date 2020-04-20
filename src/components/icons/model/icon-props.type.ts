import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IconProps {
	size?: number;
	color?: string;

	style?: StyleProp<TextStyle>;
	wrapperStyle?: StyleProp<ViewStyle>;
}

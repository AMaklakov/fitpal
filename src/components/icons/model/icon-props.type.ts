import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IconProps {
	onPress?: () => void;
	onLongPress?: () => void;
	onPressIn?: () => void;

	size?: number;
	color?: string;

	activeOpacity?: number;
	style?: StyleProp<TextStyle>;
	touchableStyle?: StyleProp<ViewStyle>;
}

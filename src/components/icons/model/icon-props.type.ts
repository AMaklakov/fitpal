import { ViewStyle } from 'react-native';

export interface IconProps {
	onPress?: () => void;
	onLongPress?: () => void;
	onPressIn?: () => void;

	size?: number;
	color?: string;
	style?: ViewStyle;
}

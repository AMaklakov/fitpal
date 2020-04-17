import React, { FC, ReactNode } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface IProps {
	icon: ReactNode;

	onPress?: () => void;
	onLongPress?: () => void;
	onPressIn?: () => void;

	activeOpacity?: number;
	style?: StyleProp<ViewStyle>;
}

export const ButtonIcon: FC<IProps> = (props: IProps) => {
	const { activeOpacity = 1, onLongPress, onPress, onPressIn, style, icon } = props;

	return (
		<TouchableOpacity
			style={style}
			activeOpacity={activeOpacity}
			onPress={onPress}
			onLongPress={onLongPress}
			onPressIn={onPressIn}>
			{icon}
		</TouchableOpacity>
	);
};

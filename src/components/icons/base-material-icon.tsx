import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { IconProps } from './model/icon-props.type';

export interface IMaterialIconProps extends IconProps {
	name: string;
}

export const BaseMaterialIcon = (props: IMaterialIconProps) => {
	const {
		onLongPress,
		onPress,
		style,
		color = '#000',
		size = 24,
		name,
		onPressIn,
		touchableStyle,
		activeOpacity = 1,
	} = props;

	return (
		<TouchableOpacity
			activeOpacity={activeOpacity}
			style={touchableStyle}
			onPress={onPress}
			onLongPress={onLongPress}
			onPressIn={onPressIn}>
			<Icon name={name} size={size} style={style} color={color} />
		</TouchableOpacity>
	);
};

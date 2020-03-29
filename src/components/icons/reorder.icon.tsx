import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableWithoutFeedback } from 'react-native';
import { IconProps } from './model/icon-props.type';

export const ReorderIcon = (props: IconProps) => {
	const { onLongPress, style, color = '#000', size = 24, onPressIn, onPress } = props;

	return (
		<TouchableWithoutFeedback onLongPress={onLongPress} onPress={onPress} onPressIn={onPressIn}>
			<Icon name="arrow-split-horizontal" size={size} style={style} color={color} />
		</TouchableWithoutFeedback>
	);
};

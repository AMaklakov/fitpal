import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { IconProps } from './model/icon-props.type';

export const ReorderIcon = (props: IconProps) => {
	const { onLongPress, style, color = '000', size = 24 } = props;

	return (
		<TouchableWithoutFeedback onLongPress={onLongPress}>
			<Icon name="arrow-split-horizontal" size={size} style={style} color={color} />
		</TouchableWithoutFeedback>
	);
};

import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { IconProps } from './model/icon-props.type';

export const EditIcon = (props: IconProps) => {
	const { onLongPress, onPress, style, color = '#000', size = 24 } = props;

	return (
		<TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
			<Icon name="edit" size={size} style={style} color={color} />
		</TouchableWithoutFeedback>
	);
};

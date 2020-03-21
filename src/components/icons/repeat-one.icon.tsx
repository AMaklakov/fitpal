import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native';
import { IconProps } from './model/icon-props.type';

export const RepeatOnceIcon = (props: IconProps) => {
	const { onLongPress, onPress, style, color = '#000', size = 24 } = props;

	return (
		<TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
			<Icon name="repeat-one" size={size} style={style} color={color} />
		</TouchableWithoutFeedback>
	);
};

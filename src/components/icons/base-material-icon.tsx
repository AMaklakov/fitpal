import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import { IconProps } from './model/icon-props.type';
import { FontSizes } from '@css/fonts';

export interface IMaterialIconProps extends IconProps {
	name: string;
}

export const BaseMaterialIcon = (props: IMaterialIconProps) => {
	const { style, color = '#000', size = FontSizes.H1, name, wrapperStyle } = props;

	return (
		<View style={wrapperStyle}>
			<Icon name={name} size={size} style={style} color={color} />
		</View>
	);
};

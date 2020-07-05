import React, { FC, useMemo } from 'react';
import { Icon, IconProps, Tooltip, Text } from 'react-native-elements';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '@css/colors.style';
import { FontSizes } from '@css/fonts';

interface IProps {
	width?: number;
	text?: string;
	containerStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<ViewStyle>;
	icon?: IconProps;
	iconTooltipStyle?: StyleProp<ViewStyle>;
}

export const TooltipText: FC<IProps> = props => {
	const { width = 300, text = '', containerStyle, textStyle, icon, iconTooltipStyle } = props;

	const currentIcon = useMemo(() => icon ?? { name: 'info-outline' }, [icon]);

	return (
		<Tooltip
			width={width}
			withPointer={false}
			containerStyle={StyleSheet.flatten([styles.tooltip, containerStyle])}
			popover={
				<View>
					<Text style={StyleSheet.flatten([styles.tooltipText, textStyle])}>{text}</Text>
				</View>
			}>
			<View style={StyleSheet.flatten([styles.iconWrapper, iconTooltipStyle])}>
				<Icon {...currentIcon} />
			</View>
		</Tooltip>
	);
};

const styles = StyleSheet.create({
	tooltip: {
		height: 'auto',
		backgroundColor: Colors.White,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
	iconWrapper: {
		width: 45,
		height: 45,
	},
	tooltipText: {
		fontSize: FontSizes.Small,
		color: Colors.Black,
	},
});

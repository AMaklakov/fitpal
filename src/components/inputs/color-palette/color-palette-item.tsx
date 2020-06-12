import React, { FC, useCallback } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { FontSizes } from '@css/fonts';

interface IProps {
	color: string;
	onPress: (color: string) => void;
	selected: boolean;
	colorsInRow: number;
}

export const ColorPaletteItem: FC<IProps> = props => {
	const { color, selected, onPress, colorsInRow } = props;

	const handlePress = useCallback(() => onPress(color), [color, onPress]);

	return (
		<TouchableWithoutFeedback onPress={handlePress}>
			<View style={[styles.wrapper, { flexBasis: `${100 / colorsInRow}%` }]}>
				<View style={[styles.inner, { backgroundColor: color }]}>
					{selected && <Icon name="check" raised={true} size={FontSizes.Small} />}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		width: 70,
		padding: 5,
		flex: 1,
	},
	inner: {
		minHeight: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

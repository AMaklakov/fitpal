import React, { FC, useCallback } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { FontSizes } from '@css/fonts';

interface IProps {
	color: string;
	onPress: (color: string) => void;
	selected: boolean;
}

export const ColorPaletteItem: FC<IProps> = props => {
	const { color, selected, onPress } = props;

	const handlePress = useCallback(() => onPress(color), [color, onPress]);

	return (
		<TouchableWithoutFeedback onPress={handlePress}>
			<View style={[styles.wrapper, { backgroundColor: color }]}>
				{selected && <Icon name="check" raised={true} size={FontSizes.Small} />}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		width: 70,
		height: 40,
		marginRight: 5,
		marginTop: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

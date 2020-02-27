import React, { useMemo } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Colors } from '../../css/colors.style';

const makeStyles = (color: Colors) => {
	return StyleSheet.create({
		button: {
			backgroundColor: color,
			justifyContent: 'space-around',
		},
	});
};

interface IProps<T> {
	title: string;
	item: T;
	onTouch: (item: T) => void;

	backgroundColor?: Colors;
	textColor?: Colors;
	style?: StyleSheet.NamedStyles<object>;
}

export const SwipeHiddenButton = <T extends any>(props: IProps<T>) => {
	const {
		backgroundColor = Colors.Yellow,
		textColor = Colors.LightRed,
		item,
		onTouch,
		title,
		style = {},
	} = props;

	const styles = useMemo(() => makeStyles(backgroundColor), [backgroundColor]);

	const handleOnTouch = () => onTouch(item);

	return (
		<View style={{ ...styles.button, ...style }}>
			<Button color={textColor} title={title} onPress={handleOnTouch} />
		</View>
	);
};

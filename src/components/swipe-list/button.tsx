import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@css/colors.style';
import { Button } from '@components/button/button';

const makeStyles = (color: Colors, textColor: Colors) => {
	return StyleSheet.create({
		button: {
			backgroundColor: color,
			justifyContent: 'space-around',
		},
		redText: {
			color: textColor,
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
	const { backgroundColor = Colors.Yellow, textColor = Colors.LightRed, item, onTouch, title, style = {} } = props;

	const styles = useMemo(() => makeStyles(backgroundColor, textColor), [backgroundColor, textColor]);

	const handleOnTouch = () => onTouch(item);

	return (
		<View style={{ ...styles.button, ...style }}>
			<Button type="clear" title={title} onPress={handleOnTouch} titleStyle={styles.redText} />
		</View>
	);
};

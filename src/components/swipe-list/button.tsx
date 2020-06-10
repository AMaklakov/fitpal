import React, { useCallback, useMemo } from 'react';
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

	backgroundColor?: Colors;
	textColor?: Colors;
	style?: StyleSheet.NamedStyles<object>;
	onTouch?: (item: T) => void;
}

export const SwipeHiddenButton = <T extends any>(props: IProps<T>) => {
	const { backgroundColor = Colors.Yellow, textColor = Colors.LightRed, item, onTouch, title, style = {} } = props;

	const styles = useMemo(() => makeStyles(backgroundColor, textColor), [backgroundColor, textColor]);

	const handleOnTouch = useCallback(() => onTouch?.(item), [item, onTouch]);

	return (
		<View style={{ ...styles.button, ...style }}>
			<Button type="clear" title={title} onPress={handleOnTouch} titleStyle={styles.redText} />
		</View>
	);
};

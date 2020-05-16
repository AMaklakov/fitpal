import React, { FC, useMemo } from 'react';
import { Button as ButtonComponent, ButtonProps } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Colors } from '@css/colors.style';

interface IProps extends ButtonProps {}

export const Button: FC<IProps> = props => {
	const { type, buttonStyle, titleStyle, ...rest } = props;

	const [originalButtonStyle, originalTitleStyle] = useMemo(() => {
		switch (type) {
			case 'outline':
				return [styles.outlineStyle, styles.defaultTitleStyle];
			case 'clear':
				return [styles.clearStyle, styles.clearTitleStyle];
			case 'solid':
				return [styles.solidStyle, styles.defaultTitleStyle];
			default:
				return [styles.defaultStyle, styles.defaultTitleStyle];
		}
	}, [type]);

	return (
		<ButtonComponent
			buttonStyle={[originalButtonStyle, buttonStyle]}
			titleStyle={[originalTitleStyle, titleStyle]}
			type={type}
			{...rest}
		/>
	);
};

const styles = StyleSheet.create({
	defaultTitleStyle: {
		fontSize: 16,
		color: Colors.White,
		fontFamily: 'kerson-bold',
	},
	clearTitleStyle: {
		fontSize: 16,
		color: Colors.Darkgray,
		fontFamily: 'kerson-bold',
	},

	defaultStyle: {
		paddingVertical: 16,
		paddingHorizontal: 20,
		backgroundColor: Colors.Primary,
	},
	outlineStyle: {
		paddingVertical: 16,
		paddingHorizontal: 20,
		backgroundColor: Colors.Purple,
	},
	clearStyle: {
		paddingVertical: 16,
		paddingHorizontal: 20,
		backgroundColor: Colors.Lightgray,
	},
	solidStyle: {
		backgroundColor: Colors.Primary,
	},
});

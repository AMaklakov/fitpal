import React, { FC, useMemo } from 'react';
import { Button as ButtonComponent, ButtonProps } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Colors } from '@css/colors.style';

interface IProps extends ButtonProps {
	solidType?: 'primary' | 'gray' | 'purple';
}

export const Button: FC<IProps> = props => {
	const { type = 'solid', buttonStyle, titleStyle, solidType = 'primary', ...rest } = props;

	const [originalButtonStyle, originalTitleStyle] = useMemo(() => {
		if (type === 'solid') {
			switch (solidType) {
				case 'primary':
					return [StyleSheet.flatten([styles.default, styles.solidPrimary]), styles.defaultTitle];
				case 'gray':
					return [StyleSheet.flatten([styles.default, styles.solidGray]), styles.clearTitle];
				case 'purple':
					return [StyleSheet.flatten([styles.default, styles.solidPurple]), styles.defaultTitle];
			}
		}

		switch (type) {
			case 'outline':
				return [styles.outline, styles.outlineTitle];
			case 'clear':
				return [styles.clear, styles.clearTitle];
			default:
				return [styles.default, styles.defaultTitle];
		}
	}, [type, solidType]);

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
	defaultTitle: {
		fontSize: 16,
		color: Colors.White,
		fontFamily: 'kerson-bold',
	},
	clearTitle: {
		fontSize: 16,
		color: Colors.Darkgray,
		fontFamily: 'kerson-bold',
	},
	outlineTitle: {
		fontSize: 16,
		color: Colors.Black,
	},

	default: {
		paddingVertical: 16,
		paddingHorizontal: 20,
	},

	outline: {
		paddingVertical: 16,
		paddingHorizontal: 20,
		borderColor: Colors.Darkgray,
	},
	clear: {},

	solidPrimary: {
		backgroundColor: Colors.Primary,
	},
	solidGray: {
		backgroundColor: Colors.Lightgray,
	},
	solidPurple: {
		backgroundColor: Colors.Purple,
	},
});

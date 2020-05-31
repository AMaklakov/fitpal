import React, { FC, useMemo } from 'react';
import { Button as ButtonComponent, ButtonProps } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Colors } from '@css/colors.style';
import { Fonts, FontSizes } from '@css/fonts';

interface IProps extends ButtonProps {
	solidType?: 'primary' | 'gray' | 'purple';
}

export const Button: FC<IProps> = props => {
	const { type = 'solid', buttonStyle, titleStyle, solidType = 'primary', ...rest } = props;

	const [originalButtonStyle, originalTitleStyle] = useMemo(() => {
		if (type === 'solid') {
			switch (solidType) {
				case 'primary':
					return [styles.solidPrimary, styles.defaultTitle];
				case 'gray':
					return [styles.solidGray, styles.clearTitle];
				case 'purple':
					return [styles.solidPurple, styles.defaultTitle];
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
			buttonStyle={[originalButtonStyle, styles.default, buttonStyle]}
			titleStyle={[originalTitleStyle, titleStyle]}
			type={type}
			{...rest}
		/>
	);
};

const styles = StyleSheet.create({
	defaultTitle: {
		fontSize: FontSizes.Medium,
		color: Colors.White,
		fontFamily: Fonts.KelsonBold,
	},
	clearTitle: {
		fontSize: FontSizes.Medium,
		color: Colors.Darkgray,
		fontFamily: Fonts.KelsonBold,
	},
	outlineTitle: {
		fontSize: FontSizes.Medium,
		color: Colors.Black,
		fontFamily: Fonts.KelsonBold,
	},

	default: {
		paddingVertical: 15,
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

import React, { FC, useMemo } from 'react';
import { Button as ButtonComponent, ButtonProps } from 'react-native-elements';
import { Platform, StyleSheet } from 'react-native';
import { Colors } from '@css/colors.style';
import { Fonts } from '@css/fonts';

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
				return [StyleSheet.flatten([styles.default, styles.outline]), styles.outlineTitle];
			case 'clear':
				return [StyleSheet.flatten([styles.clear, IS_IOS && styles.iosClear]), styles.clearTitle];
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

const IS_IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
	defaultTitle: {
		fontSize: 16,
		color: Colors.White,
		fontFamily: Fonts.KelsonBold,
	},
	clearTitle: {
		fontSize: 16,
		color: Colors.Darkgray,
		fontFamily: Fonts.KelsonBold,
	},
	outlineTitle: {
		fontSize: 16,
		color: Colors.Black,
		fontFamily: Fonts.KelsonBold,
	},

	default: {
		paddingTop: IS_IOS ? 19 : 16,
		paddingBottom: IS_IOS ? 13 : 16,
		paddingHorizontal: 20,
	},

	outline: {
		paddingVertical: 16,
		paddingHorizontal: 20,
		borderColor: Colors.Darkgray,
	},

	clear: {},
	iosClear: {
		paddingTop: 11,
		paddingBottom: 5,
	},

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

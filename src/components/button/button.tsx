import React, { FC, useMemo } from 'react';
import { Button as ButtonComponent, ButtonProps } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Colors } from '@css/colors.style';
import LinearGradient from 'react-native-linear-gradient';

interface IProps extends ButtonProps {}

export const Button: FC<IProps> = props => {
	const { type, ...rest } = props;

	let buttonStyles;
	let titleStyles;

	const typeOfButton = useMemo(() => {

		switch (type) {
			case 'outline':
				buttonStyles = styles.outlineStyle;
				return;
			case 'clear':
				buttonStyles = styles.clearStyle;
				titleStyles = styles.clearTitleStyle;
				return;
			case 'solid':
				buttonStyles = styles.solidStyle;
				return;
			default:
				buttonStyles = styles.defaultStyle;
				titleStyles = styles.defaultTitleStyle;
				return;
		}
	}, [type]);

	return <ButtonComponent buttonStyle={buttonStyles} titleStyle={titleStyles} type={type} {...rest} />;
};

// TODO write styles here

const styles = StyleSheet.create({
	defaultTitleStyle: {
		fontSize: 16,
		color: Colors.White,
	},
	clearTitleStyle: {
		fontSize: 16,
		color: '#62676A',
	},

	defaultStyle: {
		paddingTop: 12,
		paddingBottom: 12,
		width: '100%',
		backgroundColor: '#292929',
	},
	outlineStyle: {
		width: '100%',
		backgroundColor: 'transparent'
	},
	clearStyle: {
		paddingTop: 12,
		paddingBottom: 12,
		width: '100%',
		backgroundColor: '#EAEAEA'
	},
	solidStyle: {
		width: '100%',
		backgroundColor: '#292929'
	}
});

import { Platform, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import React from 'react';
import { Text } from 'react-native-elements';
import { Fonts } from '@css/fonts';

export interface IHeadingProps {
	text: string;

	useCenteredText?: boolean;
	numberOfLinesEllipsis?: number;
	style?: StyleProp<TextStyle>;
	wrapperStyle?: StyleProp<ViewStyle>;
}

export interface IBaseHeadingProps extends IHeadingProps {
	fontSize: number;
}

export const BaseHeading = (props: IBaseHeadingProps) => {
	const { style = {}, fontSize, text = '', wrapperStyle = {}, numberOfLinesEllipsis } = props;
	const { useCenteredText = false } = props;

	return (
		<View style={[styles.wrapper, wrapperStyle]}>
			<Text
				style={[
					styles.text,
					{ fontSize },
					!IS_IOS && { lineHeight: fontSize + 7 },
					useCenteredText && styles.textCenter,
					style,
				]}
				numberOfLines={numberOfLinesEllipsis}>
				{text}
			</Text>
		</View>
	);
};

const IS_IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
	wrapper: {
		// backgroundColor: 'orange',
	},
	text: {
		fontFamily: Fonts.Kelson,
		paddingTop: IS_IOS ? 9 : 5,
		paddingBottom: IS_IOS ? 1 : 5,
	},
	textCenter: {
		textAlign: 'center',
	},
});

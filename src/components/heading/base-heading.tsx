import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';

export interface IHeadingProps {
	text: string;

	numberOfLinesEllipsis?: number;
	style?: StyleProp<TextStyle>;
	wrapperStyle?: StyleProp<ViewStyle>;
}

export interface IBaseHeadingProps extends IHeadingProps {
	fontSize: number;
}

export const BaseHeading = (props: IBaseHeadingProps) => {
	const { style = {}, fontSize, text = '', wrapperStyle = {}, numberOfLinesEllipsis } = props;
	const textStyles = useMemo(() => StyleSheet.flatten([styles.text, { fontSize }, style]), [fontSize, style]);

	return (
		<View style={wrapperStyle}>
			<Text style={textStyles} numberOfLines={numberOfLinesEllipsis}>
				{text}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
	},
});

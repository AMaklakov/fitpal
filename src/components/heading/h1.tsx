import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	h1: {
		fontSize: 24,
		textAlign: 'center',
	},
});

export const H1 = (props: { text: string }) => {
	const { text } = props;

	return (
		<View>
			<Text style={styles.h1}>{text}</Text>
		</View>
	);
};

export default H1;

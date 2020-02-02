import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	h2: {
		fontSize: 20,
		textAlign: 'center',
		paddingBottom: 10,
		paddingTop: 10,
	},
});

const H2 = (props: { text: string }) => {
	const { text } = props;

	return (
		<View>
			<Text style={styles.h2}>{text}</Text>
		</View>
	);
};

export default H2;

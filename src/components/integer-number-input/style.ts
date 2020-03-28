import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
	input: {
		margin: 10,
		fontSize: 18,
		color: 'black',
		borderWidth: 1,
		borderColor: 'black',
		paddingHorizontal: 15,
		borderRadius: 15,
		height: 50,
	},
	errorMessageShow: {
		color: 'red',
	},
});

export const styleFocused = StyleSheet.create({
	input: {
		...style.input,
		borderColor: '#6cbbf7',
	},
});

export default style;

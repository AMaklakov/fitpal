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
	},
	inputFocused: {
		margin: 10,
		fontSize: 18,
		color: 'black',
		borderWidth: 1,
		borderColor: '#6cbbf7',
		paddingHorizontal: 15,
		borderRadius: 15,
	},
	errorMessageShow: {
		color: 'red',
	},
});

export default style;

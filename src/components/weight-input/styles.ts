import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
	container: {
		height: 40,
		fontSize: 22,

		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	checkbox: {
		height: 40,

		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkboxLabel: {
		paddingLeft: 10,
	},
});

export default style;

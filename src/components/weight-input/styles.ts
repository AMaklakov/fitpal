import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
	container: {
		height: 40,
		fontSize: 22,

		flex: 1,
		flexDirection: 'row',
	},
	value: {
		height: 40,

		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	checkbox: {
		height: 40,

		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkboxLabel: {
		paddingLeft: 10,
	},
});

export default style;

import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
	table: {
		margin: 10,
	},
	tableHeading: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',

		backgroundColor: 'darkgrey',

		padding: 5,
		borderRadius: 15,
	},
	tableBody: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',

		padding: 5,
	},
	h2: {
		fontSize: 20,
		textAlign: 'center',
		paddingBottom: 10,
		paddingTop: 10,
	},
	total: {
		fontSize: 16,
		textAlign: 'right',
		paddingRight: 25,
		paddingTop: 10,
	},
});

export default style;

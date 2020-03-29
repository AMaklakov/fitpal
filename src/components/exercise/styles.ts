import { StyleSheet } from 'react-native';
import { Colors } from '@css/colors.style';

const style = StyleSheet.create({
	table: {
		margin: 10,
	},
	tableHeading: {
		flexDirection: 'row',
		justifyContent: 'space-around',

		backgroundColor: 'darkgrey',

		padding: 5,
		borderRadius: 15,
	},
	tableBody: {
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
	wrapper: {
		backgroundColor: Colors.Default,

		borderBottomWidth: 0.3,
		borderBottomColor: Colors.Grey,
	},
	innerWrapper: {
		paddingBottom: 10,
	},
});

export default style;

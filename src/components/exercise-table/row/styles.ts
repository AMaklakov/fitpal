import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		margin: 10,
	},
	table: {
		width: '50%',
	},
	tableHeading: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: 'grey',
	},
	tableBody: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

export default style;

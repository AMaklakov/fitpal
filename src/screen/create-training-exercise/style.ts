import { Dimensions, StyleSheet } from 'react-native';

const WINDOW = Dimensions.get('window');

const style = StyleSheet.create({
	modal: {
		position: 'absolute',
		width: '80%',
		height: '70vw',
		backgroundColor: 'green',
	},
	flex: {
		marginTop: 20,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	sequenceNumber: {
		textAlign: 'center',
		width: WINDOW.width / 8,
	},
	repeats: {
		textAlign: 'center',
		width: WINDOW.width / 3,
	},
	weight: {
		textAlign: 'center',
		width: WINDOW.width / 3,
	},
});

export default style;

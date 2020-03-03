import { Dimensions, StyleSheet } from 'react-native';

const WINDOW = Dimensions.get('window');

const style = StyleSheet.create({
	wrapper: {
		paddingBottom: 10,
		flexDirection: 'column',
	},
	flex: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	sequenceNumber: {
		textAlign: 'center',
		width: WINDOW.width / 8,
	},
	repeats: {
		width: WINDOW.width / 3,
	},
	weight: {
		width: WINDOW.width / 3,
	},
});

export default style;

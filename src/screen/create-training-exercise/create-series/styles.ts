import { Dimensions, StyleSheet } from 'react-native';

const WINDOW = Dimensions.get('window');

export const styles = StyleSheet.create({
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
		width: WINDOW.width / 10,
	},
	repeats: {
		width: WINDOW.width / 3,
	},
	weight: {
		width: WINDOW.width / 3,
	},
	actions: {
		textAlign: 'center',
		width: WINDOW.width / 8,
	},
});

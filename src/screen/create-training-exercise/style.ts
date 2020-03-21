import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../css/colors.style';

const WINDOW = Dimensions.get('window');

export const style = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	flex: {
		marginTop: 20,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	sequenceNumber: {
		textAlign: 'center',
		width: WINDOW.width / 10,
	},
	repeats: {
		textAlign: 'center',
		width: WINDOW.width / 3,
	},
	weight: {
		textAlign: 'center',
		width: WINDOW.width / 3,
	},
	actions: {
		textAlign: 'center',
		width: WINDOW.width / 8,
	},
	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: 20,
	},
	seriesButtonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	saveButtonWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	saveButtonText: {
		paddingLeft: 10,
		color: Colors.LightBlue,
	},
});

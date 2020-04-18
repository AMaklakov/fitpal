import { StyleSheet } from 'react-native';
import { Colors } from '@css/colors.style';

export const commonStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	bottomActionWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: 20,
		backgroundColor: Colors.White,
	},
	buttonWithIconWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	saveButtonText: {
		paddingLeft: 10,
		color: Colors.LightBlue,
	},
	cancelButton: {
		paddingLeft: 10,
		color: Colors.LightRed,
	},
	disabledButton: {
		color: Colors.Grey,
	},
});

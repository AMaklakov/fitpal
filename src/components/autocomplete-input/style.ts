import { StyleSheet } from 'react-native';
import { Colors } from '@css/colors.style';

const style = StyleSheet.create({
	selectedWrapper: {
		padding: 10,
		margin: 5,
	},
	inputWrapper: {
		margin: 5,
		position: 'relative',
		overflow: 'visible',
	},
	input: {
		color: 'black',
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 15,
		padding: 10,
	},
	scrollArea: {
		height: 200,
		padding: 10,
		left: 0,
		right: 0,
		top: 5,
		fontSize: 66,
		backgroundColor: Colors.LightGrey,
		// for iOS
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		// for Android
		elevation: 5,
	},
	h3: {
		paddingTop: 5,
		paddingBottom: 5,
		fontSize: 18,
	},
});

export default style;

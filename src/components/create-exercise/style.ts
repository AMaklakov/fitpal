import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
	modal: {
		position: 'absolute',
		width: '80%',
		height: '70vw',
		backgroundColor: 'green',
	},
	flex: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	flex1: {
		flexGrow: 1,
		textAlign: 'center',
	},
	flex2: {
		flexGrow: 3,
		textAlign: 'center',
	},
	flex3: {
		flexGrow: 4,
		textAlign: 'center',
	},
});

export default style;

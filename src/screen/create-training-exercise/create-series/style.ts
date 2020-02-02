import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
	wrapper: {
		paddingBottom: 10,
		flexDirection: 'column',
	},
	flex: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	flex1: {
		flexGrow: 2,
		textAlign: 'center',
	},
	flex2: {
		flexGrow: 3,
	},
	flex3: {
		flexGrow: 4,
	},
});

export default style;

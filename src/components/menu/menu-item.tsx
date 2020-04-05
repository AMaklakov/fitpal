import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Colors } from '@css/colors.style';

interface IItem {
	text: string;
	icon?: React.ReactNode;
	isActive?: boolean;
}

interface IProps {
	item: IItem;
	onPress: (item: IItem) => void;
}

export const MenuItem = (props: IProps) => {
	const { item, onPress } = props;
	const { icon, text, isActive } = item;

	const handleOnPress = () => onPress(item);

	return (
		<TouchableHighlight underlayColor={Colors.LightBlue} onPress={handleOnPress}>
			<View style={StyleSheet.flatten([styles.wrapper, isActive && styles.active])}>
				<View style={styles.textWrapper}>
					<Text ellipsizeMode="tail" numberOfLines={1}>
						{text}
					</Text>
				</View>

				{!!icon && <View style={styles.iconWrapper}>{icon}</View>}
			</View>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		maxWidth: '100%',
		height: 50,
		paddingLeft: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	textWrapper: {
		flex: 1,
	},
	iconWrapper: {
		width: 40,
	},
	active: {
		backgroundColor: Colors.LightBlue,
	},
});

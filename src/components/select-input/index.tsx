import React from 'react';
import Select, { Item } from 'react-native-picker-select';
import { Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { PropType } from '@util/type.util';
import { Colors } from '@css/colors.style';
import { Fonts, FontSizes } from '@css/fonts';
import { ExpandMoreIcon } from '@components/icons/expand-more.icon';

interface IProps<T extends Item> {
	items: T[];
	value?: PropType<T, 'value'> | null;
	onChange: (value: PropType<T, 'value'> | null, index: number) => void;
	onDonePress?: () => void;
	placeholder?: T | {};

	iconStyleType?: 'dark' | 'white';
	style?: StyleProp<ViewStyle>;
}

export const SelectInput = <T extends Item>(props: IProps<T>) => {
	const { onChange, items, style = {}, value, onDonePress, placeholder, iconStyleType = 'dark' } = props;

	const handleDonePress = () => onDonePress?.();

	return (
		<Select
			value={value}
			onValueChange={onChange}
			onDonePress={handleDonePress}
			placeholder={placeholder}
			items={items}
			Icon={() => <ExpandMoreIcon color={iconStyleType === 'dark' ? Colors.White : Colors.Darkgray} />}
			style={{
				inputIOS: StyleSheet.flatten([styles.common, styles.inputIOS, style]),
				inputAndroid: StyleSheet.flatten([styles.common, styles.inputAndroid, style]),
				iconContainer: StyleSheet.flatten([styles.iconContainer, iconStyleType === 'dark' && styles.iconContainerDark]),
			}}
			useNativeAndroidPickerStyle={false}
		/>
	);
};

const IS_IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
	common: {
		paddingLeft: 10,
		paddingRight: 40, // to ensure the text is never behind the icon
		fontSize: FontSizes.Medium,
		borderWidth: 1,
		borderColor: Colors.Darkgray,
		color: Colors.Black,
		fontFamily: Fonts.Kelson,
	},
	inputIOS: {
		paddingTop: 15,
		paddingBottom: 9,
		borderRadius: 4,
	},
	inputAndroid: {
		paddingVertical: 8,
		borderRadius: 8,
	},
	iconContainer: {
		height: '100%',
		width: 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopEndRadius: IS_IOS ? 4 : 8,
		borderBottomEndRadius: IS_IOS ? 4 : 8,
	},
	iconContainerDark: {
		backgroundColor: Colors.Darkgray,
	},
});

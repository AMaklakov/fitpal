import React from 'react';
import { ActionSheetIOS, ActionSheetIOSOptions, Text, TouchableOpacity, View } from 'react-native';
import { SelectInputProps } from './types';
import style from './style';

const SelectInput = (props: SelectInputProps) => {
	const { onChange, options, value, valuePostfix, cancelButtonIndex } = props;

	const opts: ActionSheetIOSOptions = {
		options,
		message: 'Select option',
		cancelButtonIndex,
	};

	const onSelect = (index: number) => {
		if (index === cancelButtonIndex) {
			return;
		}

		onChange(index);
	};

	const openPicker = () => {
		ActionSheetIOS.showActionSheetWithOptions(opts, onSelect);
	};

	return (
		<TouchableOpacity activeOpacity={0.3} onPress={openPicker}>
			<View style={style.value}>
				<Text>
					{value} {valuePostfix}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default SelectInput;

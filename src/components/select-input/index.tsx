import React from 'react';
import { ActionSheetIOS, ActionSheetIOSOptions, Text, View } from 'react-native';
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
		<View style={style.value} onTouchEnd={openPicker}>
			<Text>
				{value} {valuePostfix}
			</Text>
		</View>
	);
};

export default SelectInput;

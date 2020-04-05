import React from 'react';
import Select, { Item } from 'react-native-picker-select';
import { SelectInputProps } from './types';
import style from './style';

export const SelectInput = <T extends Item>(props: SelectInputProps<T>) => {
	const { onChange, items, styles: propStyles = {}, value, onDonePress, placeholder } = props;

	const handleDonePress = () => onDonePress?.();

	return (
		<Select
			value={value}
			onValueChange={onChange}
			onDonePress={handleDonePress}
			placeholder={placeholder}
			items={items}
			textInputProps={{ style: { ...style.value, ...propStyles } }}
		/>
	);
};

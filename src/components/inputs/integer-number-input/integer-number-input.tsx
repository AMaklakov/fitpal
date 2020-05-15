import React, { FC, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { removeLeadingZeros } from '@util/string.util';
import { Colors, placeholderTextColor } from '@css/colors.style';
import { withValidation } from '@components/with-validation/with-validation';

interface IProps {
	value?: string;
	onChange: (v: string) => void;
	placeholder?: string;
}

export const IntegerNumberInput: FC<IProps> = (props: IProps) => {
	const { value = '', placeholder = '', onChange } = props;

	const [isFocused, setFocused] = useState(false);

	const handleTextChange = (v: string) => onChange(removeLeadingZeros(v));

	return (
		<TextInput
			style={isFocused ? focusedInputStyles : styles.input}
			keyboardType="number-pad"
			placeholder={placeholder}
			placeholderTextColor={placeholderTextColor}
			onChangeText={handleTextChange}
			onFocus={() => setFocused(() => true)}
			onBlur={() => setFocused(() => false)}
			value={value}
		/>
	);
};

export const IntegerNumberInputWithValidation = withValidation(IntegerNumberInput);

const styles = StyleSheet.create({
	input: {
		padding: 10,
		fontSize: 16,
		color: Colors.Black,
		borderColor: Colors.Black,
		borderWidth: 1,
		borderRadius: 15,
	},
	errorMessageShow: {
		color: 'red',
	},
	inputFocused: {
		borderColor: '#6cbbf7',
	},
});

const focusedInputStyles = StyleSheet.flatten([styles.input, styles.inputFocused]);

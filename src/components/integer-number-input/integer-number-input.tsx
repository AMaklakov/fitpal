import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { IntegerNumberInputPropsModel } from './types';
import { isPositiveInteger, removeLeadingZeros } from '../../util/string.util';
import style from './style';

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 500;

const IntegerNumberInput = (props: IntegerNumberInputPropsModel) => {
	const { value = 0, max = DEFAULT_MAX, min = DEFAULT_MIN, placeholder = '', onChange } = props;

	const [hasError, setHasError] = useState(false);

	const isValid = (v: string): boolean => {
		if (v === '' || v === '0') {
			return true;
		}

		v = removeLeadingZeros(v);

		if (!isPositiveInteger(v)) {
			return false;
		}

		const num = Number(v);

		if (isNaN(num)) {
			return false;
		}

		if (min !== undefined && num < min) {
			return false;
		}

		if (max !== undefined && num > max) {
			return false;
		}

		return true;
	};

	const onTextChange = (v: string) => {
		const valid = isValid(v);

		setHasError(!valid);

		console.log(123, v, Number(v), value);

		if (!valid) {
			onChange(value);

			return;
		}

		onChange(Number(v));
	};

	return (
		<>
			<TextInput
				style={style.input}
				keyboardType="number-pad"
				placeholder={placeholder}
				onChangeText={onTextChange}
				value={value?.toString()}
			/>

			<Text style={hasError ? style.errorMessageShow : style.errorMessage}>
				Значание в диапазоне от {min} до {max}
			</Text>
		</>
	);
};

export default IntegerNumberInput;

import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { IntegerNumberInputPropsModel } from './types';
import { isPositiveInteger, removeLeadingZeros } from '../../util/string.util';
import style from './style';
import { placeholderTextColor } from '../../css/colors.style';
import { useTranslation } from 'react-i18next';

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 500;

const IntegerNumberInput = (props: IntegerNumberInputPropsModel) => {
	const { value = '0', max = DEFAULT_MAX, min = DEFAULT_MIN, placeholder = '', onChange } = props;
	const { t } = useTranslation();

	const [hasError, setHasError] = useState(false);
	const [isFocused, setFocused] = useState(false);

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

		if (!valid) {
			onChange(value);

			return;
		}

		onChange(v);
	};

	return (
		<>
			<TextInput
				style={isFocused ? style.inputFocused : style.input}
				keyboardType="number-pad"
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				onChangeText={onTextChange}
				onFocus={() => setFocused(() => true)}
				onBlur={() => setFocused(() => false)}
				value={value}
			/>

			{hasError && (
				<Text style={style.errorMessageShow}>{t('Value in range from |min| to |max|', { min: min, max: max })}</Text>
			)}
		</>
	);
};

export default IntegerNumberInput;

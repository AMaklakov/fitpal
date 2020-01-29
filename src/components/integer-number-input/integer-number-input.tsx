import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { IntegerNumberInputPropsModel } from './types';
import style from './style';

const isInteger = (v: string): boolean => /\d/g.test(v);

const IntegerNumberInput = (props: IntegerNumberInputPropsModel) => {
	const [value, setValue] = useState(props?.initialValue ?? '');
	const [hasError, setHasError] = useState(false);

	const [min, setMin] = useState(props?.min);
	const [max, setMax] = useState(props?.max);

	useEffect(() => {
		setMin(props?.min);
		setMax(props?.max);
	}, [props.min, props.max]);

	const isValid = (v: string): boolean => {
		if (v === '') {
			return true;
		}

		const num = Number(v);

		if (!isInteger(v)) {
			return false;
		}

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

		const newVal: '' | number = v === '' ? v : Number(v);
		const newValue = (valid ? newVal : value) as '' | number;

		setValue(newValue);
		props?.setValue(newValue);
	};

	return (
		<TextInput
			style={style.input}
			keyboardType={'numeric'}
			placeholder={props?.placeholder}
			onChangeText={onTextChange}
			value={value?.toString()}
		/>
	);
};

export default IntegerNumberInput;

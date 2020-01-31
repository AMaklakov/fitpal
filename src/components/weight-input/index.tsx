import React, { useMemo, useState } from 'react';
import { WeightInputProps } from './types';
import { Switch, Text, View } from 'react-native';
import style from './styles';
import SelectInput from '../select-input';
import { getNumbersInRangeOptions } from '../../util/string.util';

const DEFAULT_INITIAL_VALUE = 0;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 180;

const CANCEL_BUTTON_INDEX = 0;

const WeightInput = (props: WeightInputProps) => {
	const { value = DEFAULT_INITIAL_VALUE, max = DEFAULT_MAX, min = DEFAULT_MIN, onChange } = props;

	const [hasHalf, setHasHalf] = useState(!Number.isInteger(value));
	const options = useMemo(
		() => getNumbersInRangeOptions(hasHalf ? min + 0.5 : min, hasHalf ? max + 0.5 : max, 1),
		[min, max, hasHalf]
	);

	const onSelect = (index: number) => {
		if (index === CANCEL_BUTTON_INDEX) {
			return;
		}

		const selectedValue = options[index - 1];
		onChange(Number(selectedValue));
	};

	const onHasHalfChange = (v: boolean) => {
		setHasHalf(v);

		onChange(v ? value + 0.5 : value - 0.5);
	};

	return (
		<View style={style.container}>
			<SelectInput
				options={['Отмена', ...options]}
				cancelButtonIndex={CANCEL_BUTTON_INDEX}
				value={value.toString()}
				onChange={onSelect}
				valuePostfix="кг"
			/>

			<View style={style.checkbox}>
				<Switch value={hasHalf} onValueChange={onHasHalfChange} />

				<View style={style.checkboxLabel}>
					<Text>+ 0.5</Text>
				</View>
			</View>
		</View>
	);
};

export default WeightInput;

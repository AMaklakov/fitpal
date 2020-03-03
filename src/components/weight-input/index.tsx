import React, { useMemo, useState } from 'react';
import { WeightInputProps } from './types';
import { Switch, Text, View } from 'react-native';
import style from './styles';
import { getNumbersInRangeOptions } from '../../util/string.util';
import { SelectInput } from '../select-input';

const DEFAULT_INITIAL_VALUE = 0;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 180;

const WeightInput = (props: WeightInputProps) => {
	const {
		value = DEFAULT_INITIAL_VALUE,
		max = DEFAULT_MAX,
		min = DEFAULT_MIN,
		onChange,
		hasAddHalfOption = false,
	} = props;

	const [hasHalf, setHasHalf] = useState(!Number.isInteger(value ?? 0));
	const options = useMemo(
		() =>
			getNumbersInRangeOptions(hasHalf ? min + 0.5 : min, hasHalf ? max + 0.5 : max, 1).map(v => ({
				label: v.toString(),
				value: v,
			})),
		[min, max, hasHalf]
	);

	const onSelect = item => {
		if (!item) {
			onChange(null);
			return;
		}

		onChange(Number(item));
	};

	const onHasHalfChange = (v: boolean) => {
		setHasHalf(v);

		const numValue = value ?? 0;
		onChange(v ? numValue + 0.5 : numValue - 0.5);
	};

	return (
		<View style={style.container}>
			<SelectInput value={value} items={options} onChange={onSelect} />

			{hasAddHalfOption && (
				<View style={style.checkbox}>
					<Switch value={hasHalf} onValueChange={onHasHalfChange} />

					<View style={style.checkboxLabel}>
						<Text>+ 0.5</Text>
					</View>
				</View>
			)}
		</View>
	);
};

export default WeightInput;

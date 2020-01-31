import React, { useEffect, useState } from 'react';
import { CreateSeriesPropsModel } from './types';
import { Text, View } from 'react-native';
import SelectInput from '../../select-input';
import { getNumbersInRangeOptions } from '../../../util/string.util';
import WeightInput from '../../weight-input';
import style from './style';

const DEFAULT_CANCEL_BUTTON_INDEX = 0;
const DEFAULT_REPEATS_SELECT_LIST = ['Отмена', ...getNumbersInRangeOptions(1, 50)];

const CreateSeries = (props: CreateSeriesPropsModel) => {
	const { index, onChange, series } = props;

	const [sequenceNumber] = useState(series?.sequenceNumber ?? index + 1);
	const [repeats, setRepeats] = useState(series?.repeats ?? 1);
	const [weight, setWeight] = useState(series?.weight ?? 0);

	useEffect(() => {
		onChange({
			sequenceNumber,
			repeats: Number(repeats),
			weight: Number(weight),
		});
	}, [sequenceNumber, repeats, weight, onChange]);

	return (
		<View style={style.wrapper}>
			<View style={style.flex}>
				<Text style={style.flex1}>{sequenceNumber}</Text>
				<View style={style.flex2}>
					<SelectInput
						options={DEFAULT_REPEATS_SELECT_LIST}
						cancelButtonIndex={DEFAULT_CANCEL_BUTTON_INDEX}
						value={repeats.toString()}
						valuePostfix="раз"
						onChange={setRepeats}
					/>
				</View>

				<View style={style.flex3}>
					<WeightInput value={weight} onChange={setWeight} />
				</View>
			</View>
		</View>
	);
};

export default CreateSeries;

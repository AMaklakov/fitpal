import React, { useEffect, useState } from 'react';
import { CreateSeriesPropsModel } from './types';
import { Text, View } from 'react-native';
import { getNumbersInRangeOptions } from '../../../util/string.util';
import WeightInput from '../../../components/weight-input';
import style from './style';
import { SelectInput } from '../../../components/select-input';

const DEFAULT_REPEATS_SELECT_LIST = getNumbersInRangeOptions(1, 50).map(x => ({
	label: x.toString(),
	value: x,
}));

const CreateSeries = (props: CreateSeriesPropsModel) => {
	const { index, onChange, series } = props;

	const [sequenceNumber] = useState(series?.sequenceNumber ?? index + 1);
	const [repeats, setRepeats] = useState<number | null>(series?.repeats ?? 1);
	const [weight, setWeight] = useState<number | null>(series?.weight ?? 0);

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
					<SelectInput items={DEFAULT_REPEATS_SELECT_LIST} onChange={v => setRepeats(v)} />
				</View>

				<View style={style.flex3}>
					<WeightInput value={weight} onChange={v => setWeight(v)} />
				</View>
			</View>
		</View>
	);
};

export default CreateSeries;

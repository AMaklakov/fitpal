import React, { useEffect, useState } from 'react';
import { CreateSeriesPropsModel } from './types';
import { Text, View } from 'react-native';
import style from './style';
import IntegerNumberInput from '../../../components/integer-number-input/integer-number-input';

const CreateSeries = (props: CreateSeriesPropsModel) => {
	const { index, onChange, series } = props;

	const [sequenceNumber] = useState(series?.sequenceNumber ?? index + 1);
	const [repeats, setRepeats] = useState<number | undefined>(series?.repeats ?? 1);
	const [weight, setWeight] = useState<number | undefined>(series?.weight ?? 0);

	useEffect(() => {
		onChange({
			sequenceNumber,
			repeats: Number(repeats),
			weight: Number(weight),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sequenceNumber, repeats, weight]);

	return (
		<View style={style.wrapper}>
			<View style={style.flex}>
				<Text style={style.sequenceNumber}>{sequenceNumber}</Text>

				<View style={style.repeats}>
					<IntegerNumberInput value={repeats} onChange={v => setRepeats(v)} />
				</View>

				<View style={style.weight}>
					<IntegerNumberInput value={weight} onChange={v => setWeight(v)} />
				</View>
			</View>
		</View>
	);
};

export default CreateSeries;

import React, { useEffect, useState } from 'react';
import { CreateSeriesPropsModel } from './types';
import { Text, View } from 'react-native';
import IntegerNumberInput from '../../integer-number-input/integer-number-input';

const CreateSeries = (props: CreateSeriesPropsModel) => {
	const { index, onChange, series } = props;

	const [sequenceNumber] = useState(series?.sequenceNumber ?? index + 1);
	const [repeats, setRepeats] = useState(series?.repeats ?? 0);
	const [weight, setWeight] = useState(series?.weight ?? 0);

	useEffect(() => {
		onChange({
			sequenceNumber,
			repeats: Number(repeats),
			weight: Number(weight),
		});
	}, [sequenceNumber, repeats, weight, onChange]);

	return (
		<View>
			<Text>Подход: </Text>
			<Text>{sequenceNumber}</Text>

			<Text>Количество повторений</Text>
			<IntegerNumberInput value={repeats} onChange={setRepeats} />

			<Text>Вес</Text>
			<IntegerNumberInput value={weight} onChange={setWeight} />
		</View>
	);
};

export default CreateSeries;

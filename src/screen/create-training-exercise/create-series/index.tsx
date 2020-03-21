import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import IntegerNumberInput from '../../../components/integer-number-input/integer-number-input';
import { SeriesModel } from '../../../model/training.model';
import { RepeatOnceIcon } from '../../../components/icons/repeat-one.icon';
import { styles } from './styles';

export interface IProps {
	series?: SeriesModel;
	index: number;

	onChange: (s: SeriesModel) => void;
	onRepeatIconPress?: () => void;
}

export const CreateSeries = (props: IProps) => {
	const { index, onChange, series, onRepeatIconPress } = props;

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

	const handleSetRepeats = (v: number) => setRepeats(v);

	const handleSetWeight = (v: number) => setWeight(v);

	return (
		<View style={styles.wrapper}>
			<View style={styles.flex}>
				<Text style={styles.sequenceNumber}>{sequenceNumber}</Text>

				<View style={styles.repeats}>
					<IntegerNumberInput value={repeats} onChange={handleSetRepeats} />
				</View>

				<View style={styles.weight}>
					<IntegerNumberInput value={weight} onChange={handleSetWeight} />
				</View>

				<View style={styles.actions}>{!!onRepeatIconPress && <RepeatOnceIcon onPress={onRepeatIconPress} />}</View>
			</View>
		</View>
	);
};

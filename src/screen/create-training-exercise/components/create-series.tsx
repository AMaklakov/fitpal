import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import IntegerNumberInput from '@components/integer-number-input/integer-number-input';
import { RepeatOnceIcon } from '@icons/repeat-one.icon';
import { ISeries } from '@model/training-exercise';

export interface IProps {
	series?: ISeries;
	index: number;

	onChange: (s: ISeries) => void;
	onRepeatIconPress?: () => void;

	weightMax?: number;
}

export const CreateSeries = (props: IProps) => {
	const { index, onChange, series, onRepeatIconPress, weightMax } = props;

	const [sequenceNumber] = useState(series?.sequenceNumber ?? index + 1);
	const [repeats, setRepeats] = useState<string | undefined>(series?.repeats?.toString() ?? '1');
	const [weight, setWeight] = useState<string | undefined>(series?.weight?.toString() ?? '0');

	useEffect(() => {
		onChange({
			sequenceNumber,
			repeats: Number(repeats),
			weight: Number(weight),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sequenceNumber, repeats, weight]);

	return (
		<View style={styles.wrapper}>
			<Text style={styles.sequenceNumber}>{sequenceNumber}</Text>

			<View style={styles.repeats}>
				<IntegerNumberInput value={repeats} onChange={setRepeats} />
			</View>

			<View style={styles.weight}>
				<IntegerNumberInput value={weight} onChange={setWeight} max={weightMax} />
			</View>

			<View style={styles.actions}>{!!onRepeatIconPress && <RepeatOnceIcon onPress={onRepeatIconPress} />}</View>
		</View>
	);
};

const WINDOW = Dimensions.get('window');

const styles = StyleSheet.create({
	wrapper: {
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
	},
	sequenceNumber: {
		textAlign: 'center',
		width: WINDOW.width / 10,
		paddingTop: 24,
	},
	repeats: {
		width: WINDOW.width / 3,
	},
	weight: {
		width: WINDOW.width / 3,
	},
	actions: {
		paddingTop: 22,
		textAlign: 'center',
		width: WINDOW.width / 8,
	},
});

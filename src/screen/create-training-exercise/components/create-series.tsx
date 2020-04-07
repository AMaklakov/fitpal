import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { IntegerNumberInputWithValidation } from '@components/inputs/integer-number-input/integer-number-input';
import { RepeatOnceIcon } from '@icons/repeat-one.icon';
import { ISeries } from '@model/training-exercise';
import { useTranslation } from 'react-i18next';

export interface IProps {
	series?: ISeries;
	index: number;

	onChange: (s: ISeries) => void;
	onRepeatIconPress?: () => void;

	weightMax?: number;
}

const MIN_REPEATS = 1;
const MAX_REPEATS = 200;
const MIN_WEIGHT = 1;
const MAX_WEIGHT = 500;

export const CreateSeries = (props: IProps) => {
	const { index, onChange, series, onRepeatIconPress, weightMax = MAX_WEIGHT } = props;
	const { t } = useTranslation();

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
				<IntegerNumberInputWithValidation
					min={[MIN_REPEATS, t('Min value is |min|', { min: MIN_REPEATS })]}
					max={[MAX_REPEATS, t('Max value is |max|', { max: MAX_REPEATS })]}
					value={repeats}
					onChange={setRepeats}
				/>
			</View>

			<View style={styles.weight}>
				<IntegerNumberInputWithValidation
					value={weight}
					onChange={setWeight}
					min={[1, t('Min value is |min|', { min: MIN_WEIGHT })]}
					max={[weightMax, t('Must be less than |userWeight|', { userWeight: weightMax })]}
				/>
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

import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { IntegerNumberInputWithValidation } from '@components/inputs/integer-number-input/integer-number-input';
import { RepeatOnceIcon } from '@icons/repeat-one.icon';
import { ISeries } from '@model/training-exercise';
import { useTranslation } from 'react-i18next';
import { ButtonIcon } from '@components/button-icon/button-icon';
import { MAX_REPEATS, MAX_WEIGHT, MIN_REPEATS, MIN_WEIGHT } from '@const/validation-const';
import { Text } from 'react-native-elements';

interface IProps {
	index: number;
	onChange: (s: Partial<ISeries>) => void;

	series?: ISeries;
	onRepeatIconPress?: () => void;
	weightMin?: number;
	weightMax?: number;
}

export const CreateSeries = (props: IProps) => {
	const { index, onChange, series, onRepeatIconPress, weightMax = MAX_WEIGHT, weightMin = 1 } = props;
	const { t } = useTranslation();

	const [sequenceNumber] = useState(index + 1);
	const [repeats, setRepeats] = useState<string | undefined>(series?.repeats?.toString() ?? '1');
	const [weight, setWeight] = useState<string | undefined>(series?.weight?.toString() ?? '0');

	useEffect(() => {
		onChange({
			repeats: Number(repeats),
			weight: Number(weight),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sequenceNumber, repeats, weight]);

	const handleSetRepeats = useCallback((v: string) => setRepeats(v), []);
	const handleSetWeight = useCallback((v: string) => setWeight(v), []);

	return (
		<View style={styles.wrapper}>
			<Text style={styles.sequenceNumber}>{sequenceNumber}</Text>

			<View style={styles.repeats}>
				<IntegerNumberInputWithValidation
					isNumber={[true, t('Not a number')]}
					min={[MIN_REPEATS,t('Min value is |min|', { min: MIN_REPEATS })]}
					max={[MAX_REPEATS, t('Max value is |max|', { max: MAX_REPEATS })]}
					haveErrorMessage={true}
					value={repeats}
					onChange={handleSetRepeats}
				/>
			</View>

			<View style={styles.weight}>
				<IntegerNumberInputWithValidation
					isNumber={[true, t('Not a number')]}
					min={[weightMin, t('Min value is |min|', { min: weightMin })]}
					max={[weightMax, t('Must be less than |userWeight|', { userWeight: weightMax })]}
					value={weight}
					haveErrorMessage={true}
					onChange={handleSetWeight}
					rightIcon={<Text>{t('Kg')}</Text>}
					rightIconContainerStyle={styles.iconContainerStyle}
				/>
			</View>

			<View style={styles.actions}>
				{!!onRepeatIconPress && <ButtonIcon icon={<RepeatOnceIcon />} onPress={onRepeatIconPress} />}
			</View>
		</View>
	);
};

const WINDOW = Dimensions.get('window');

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingVertical: 10,
	},
	sequenceNumber: {
		height: '100%',
		paddingTop: 12,
		textAlign: 'center',
		width: WINDOW.width / 10,
	},
	repeats: {
		width: WINDOW.width / 3,
	},
	weight: {
		width: WINDOW.width / 3,
	},
	actions: {
		height: '100%',
		paddingTop: 10,
		width: WINDOW.width / 8,
		alignItems: 'center',
	},
	iconContainerStyle: { marginVertical: 0 },
});

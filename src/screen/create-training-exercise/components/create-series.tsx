import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { IntegerNumberInputWithValidation } from '@components/inputs/integer-number-input/integer-number-input';
import { RepeatOnceIcon } from '@icons/repeat-one.icon';
import { ISeries } from '@model/training-exercise';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/button/button';
import { MAX_REPEATS, MAX_WEIGHT, MIN_REPEATS } from '@const/validation-const';
import { Text } from 'react-native-elements';

interface IProps {
	index: number;
	onChange: (s: Partial<ISeries>) => void;

	series?: ISeries;
	onRepeatIconPress?: () => void;
	weightMin?: number;
	weightMax?: number;
	maxSequenceNumber?: number;
}

export const CreateSeries = (props: IProps) => {
	const {
		index,
		onChange,
		series,
		onRepeatIconPress,
		weightMax = MAX_WEIGHT,
		weightMin = 1,
		maxSequenceNumber,
	} = props;
	const { t } = useTranslation();

	const [sequenceNumber] = useState(index + 1);
	const [repeats, setRepeats] = useState<string | undefined>(series?.repeats?.toString() ?? '1');
	const [weight, setWeight] = useState<string | undefined>(series?.weight?.toString() ?? '0');

	const showRepeatButton = useMemo(() => !maxSequenceNumber || index + 1 < maxSequenceNumber, [
		index,
		maxSequenceNumber,
	]);

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
			<View style={styles.sequenceNumber}>
				<Text>{sequenceNumber}</Text>
			</View>

			<View style={styles.repeats}>
				<IntegerNumberInputWithValidation
					isNumber={[true, t('Not a number')]}
					min={[MIN_REPEATS, t('Min value is |min|', { min: MIN_REPEATS })]}
					max={[MAX_REPEATS, t('Max value is |max|', { max: MAX_REPEATS })]}
					useOneLineErrors={true}
					value={repeats}
					onChange={handleSetRepeats}
				/>
			</View>

			<View style={styles.weight}>
				<IntegerNumberInputWithValidation
					isNumber={[true, t('Not a number')]}
					min={[weightMin, t('Min value is |min|', { min: weightMin })]}
					max={[weightMax, t('Must be less than |userWeight|', { userWeight: weightMax })]}
					useOneLineErrors={true}
					value={weight}
					onChange={handleSetWeight}
					rightIcon={<Text>{t('Kg')}</Text>}
					rightIconContainerStyle={styles.iconContainer}
				/>
			</View>

			<View style={styles.actions}>
				{!!onRepeatIconPress && showRepeatButton && (
					<Button
						type="clear"
						icon={<RepeatOnceIcon />}
						onPress={onRepeatIconPress}
						containerStyle={styles.buttonWrapper}
						buttonStyle={styles.button}
					/>
				)}
			</View>
		</View>
	);
};

const WINDOW = Dimensions.get('window');
const INPUT_HEIGHT = 42;

const styles = StyleSheet.create({
	wrapper: {
		marginVertical: 5,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	sequenceNumber: {
		height: INPUT_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
		width: WINDOW.width / 10,
	},
	repeats: {
		width: WINDOW.width / 3,
	},
	weight: {
		width: WINDOW.width / 3,
	},
	actions: {
		width: WINDOW.width / 8,
		alignItems: 'center',
	},
	iconContainer: { marginVertical: 0 },
	buttonWrapper: {
		width: '100%',
	},
	button: {
		height: INPUT_HEIGHT,
		paddingVertical: 0,
		paddingHorizontal: 0,
	},
});

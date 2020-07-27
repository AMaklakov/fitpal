import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IntegerNumberInputWithValidation } from '@components/inputs/integer-number-input/integer-number-input';
import { ISet } from '@model/training-exercise';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/button/button';
import { MAX_REPEATS, MAX_WEIGHT, MIN_REPEATS } from '@const/validation-const';
import { Icon, Text } from 'react-native-elements';
import { Colors } from '@css/colors.style';
import { Fonts, FontSizes } from '@css/fonts';

interface IProps {
	index: number;
	set: ISet;
	onChange: (s: ISet) => void;
	onRepeatIconPress?: () => void;
	weightMin?: number;
	weightMax?: number;
	maxSequenceNumber?: number;
}

export const CreateSet = (props: IProps) => {
	const { index, onChange, set, onRepeatIconPress, weightMax = MAX_WEIGHT, weightMin = 1, maxSequenceNumber } = props;
	const { t } = useTranslation();

	const sequenceNumber = useMemo(() => index + 1, [index]);

	const [repeats, setRepeats] = useState<string>(set?.repeats?.toString() ?? '1');
	const [weight, setWeight] = useState<string>(set?.weight?.toString() ?? '0');

	const showRepeatButton = useMemo(() => !maxSequenceNumber || sequenceNumber < maxSequenceNumber, [
		sequenceNumber,
		maxSequenceNumber,
	]);

	useEffect(() => {
		setRepeats(set.repeats.toString());
		setWeight(set.weight.toString());
	}, [set]);

	useEffect(() => {
		if (set.weight.toString() !== weight || set.repeats.toString() !== repeats) {
			onChange({ ...set, weight, repeats });
		}
	}, [onChange, set, repeats, weight]);

	const handleSetRepeats = useCallback((v: string) => setRepeats(v), []);
	const handleSetWeight = useCallback((v: string) => setWeight(v), []);

	return (
		<View style={styles.wrapper}>
			<View style={styles.sequenceNumber}>
				<Text style={styles.sequenceNumberText}>{sequenceNumber}</Text>
			</View>

			<View style={styles.repeats}>
				<IntegerNumberInputWithValidation
					isNumber={[true, t('Not a number')]}
					min={[MIN_REPEATS, t('Min value is |min|', { min: MIN_REPEATS })]}
					max={[MAX_REPEATS, t('Max value is |max|', { max: MAX_REPEATS })]}
					value={repeats}
					onChange={handleSetRepeats}
					keyboardType="decimal-pad"
				/>
			</View>

			<View style={styles.multiply}>
				<Icon name="close" type="ionicon" iconStyle={styles.multiplyText} />
			</View>

			<View style={styles.weight}>
				<IntegerNumberInputWithValidation
					isNumber={[true, t('Not a number')]}
					min={[weightMin, t('Min value is |min|', { min: weightMin })]}
					max={[weightMax, t('Must be less than |userWeight|', { userWeight: weightMax })]}
					value={weight}
					onChange={handleSetWeight}
					rightIcon={<Text style={styles.kg}>{t('Kg')}</Text>}
					rightIconContainerStyle={styles.iconContainer}
					keyboardType="decimal-pad"
				/>
			</View>

			<View style={styles.actions}>
				{!!onRepeatIconPress && showRepeatButton && (
					<Button
						type="clear"
						icon={{ name: 'copy-outline', type: 'ionicon', size: FontSizes.Big, color: Colors.Darkgray }}
						onPress={onRepeatIconPress}
						containerStyle={styles.buttonWrapper}
						buttonStyle={styles.button}
					/>
				)}
			</View>
		</View>
	);
};

const INPUT_HEIGHT = 42;

const styles = StyleSheet.create({
	wrapper: {
		paddingVertical: 5,
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: Colors.WhiteMilk,
	},
	sequenceNumber: {
		flex: 1,
		height: INPUT_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
	},
	repeats: {
		flex: 4,
	},
	multiply: {
		height: INPUT_HEIGHT,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	weight: {
		flex: 4,
	},
	actions: {
		height: INPUT_HEIGHT,
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconContainer: {
		marginVertical: 0,
	},
	buttonWrapper: {
		width: '100%',
	},
	button: {
		height: INPUT_HEIGHT,
		paddingVertical: 0,
		paddingHorizontal: 0,
	},
	multiplyText: {
		color: Colors.Darkgray,
		fontSize: FontSizes.Big,
	},
	sequenceNumberText: {
		fontFamily: Fonts.RobotoCondensedLight,
		fontSize: FontSizes.Regular,
	},
	kg: {
		fontFamily: Fonts.RobotoCondensedLight,
	},
});

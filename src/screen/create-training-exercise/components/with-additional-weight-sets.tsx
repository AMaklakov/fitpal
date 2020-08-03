import React, { FC, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CreateSet } from '@screen/create-training-exercise/components/create-set';
import { useTranslation } from 'react-i18next';
import { IAdditionalWeightTrainingExercise, IBaseTrainingExercise, ISet } from '@model/training-exercise';
import { editSet, repeatLastSet } from '@screen/create-training-exercise/helpers';
import { TooltipText } from '@components/tooltip/tooltip-text';
import { TRAINING_EXERCISES } from '@const/validation-const';
import { useAddFirstSet } from '@screen/create-training-exercise/components/hooks';
import { Fonts, FontSizes } from '@css/fonts';

interface IProps {
	trainingExercise: IAdditionalWeightTrainingExercise;
	onChange: (trainingExercise: IBaseTrainingExercise) => void;
}

export const WithAdditionalWeightSets: FC<IProps> = props => {
	const { trainingExercise, onChange } = props;
	const { seriesList } = trainingExercise;
	const { t } = useTranslation();

	useAddFirstSet(trainingExercise, onChange);

	const handleRepeatLast = useCallback(() => onChange(repeatLastSet(trainingExercise)), [trainingExercise, onChange]);
	const handleUpdate = useCallback((s: ISet) => onChange(editSet(s, trainingExercise)), [trainingExercise, onChange]);

	return (
		<View style={styles.wrapper}>
			<View style={styles.flex}>
				<View style={styles.sequenceNumber} />
				<Text style={styles.repeats}>{t('Repeats')}</Text>
				<View style={styles.multiply} />
				<Text style={styles.weight}>{t('Additional weight')}</Text>
				<View style={styles.actions}>
					<TooltipText
						text={t('Additional weight description')}
						icon={{ name: 'info-outline', size: FontSizes.Big }}
						iconTooltipStyle={styles.infoIcon}
					/>
				</View>
			</View>

			<FlatList<ISet>
				data={seriesList}
				keyExtractor={s => `series_${s._id}`}
				renderItem={({ index, item }) => (
					<CreateSet
						index={index}
						set={item}
						weightMin={0}
						maxSequenceNumber={TRAINING_EXERCISES.MAX}
						onChange={handleUpdate}
						onRepeatIconPress={index + 1 === seriesList?.length ? handleRepeatLast : undefined}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	flex: {
		marginTop: 20,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	sequenceNumber: {
		flex: 1,
	},
	repeats: {
		textAlign: 'center',
		flex: 4,
		fontFamily: Fonts.RobotoCondensedLight,
	},
	multiply: {
		flex: 1,
	},
	weight: {
		textAlign: 'center',
		flex: 4,
		fontFamily: Fonts.RobotoCondensedLight,
	},
	actions: {
		flex: 2,
		alignItems: 'center',
	},
	infoIcon: {
		height: 'auto',
		width: '100%',
	},
});

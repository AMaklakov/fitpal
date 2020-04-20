import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ExerciseModel, ExerciseTypes } from '@model/exercise.model';
import AutocompleteInput from '@components/autocomplete-input';
import ShowSelectedExercise from './components/show-selected-exercise';
import { CancelIcon } from '@icons/cancel.icon';
import { useTranslation } from 'react-i18next';
import { H1 } from '@components/heading/h1';
import { Colors } from '@css/colors.style';
import { SaveIcon } from '@icons/save.icon';
import { assertUnreachable } from '@util/assert-unreachable';
import { DefaultSeries } from '@screen/create-training-exercise/components/default-series';
import {
	IAdditionalWeightTrainingExercise,
	IBaseTrainingExercise,
	IDefaultTrainingExercise,
	INegativeWeightTrainingExercise,
} from '@model/training-exercise';
import { WithAdditionalWeightSeries } from '@screen/create-training-exercise/components/with-additional-weight-series';
import { WithNegativeWeightSeries } from '@screen/create-training-exercise/components/with-negative-weight';
import { commonStyles } from '@screen/create-training-exercise/style';
import { BigSource } from 'big.js';

interface IProps {
	trainingExercise: IBaseTrainingExercise;
	setTrainingExercise: (exercise: IBaseTrainingExercise) => void;

	userWeight: BigSource;
	exerciseList: ExerciseModel[];

	onSave: () => void;
	onCancel: () => void;

	disabledSave: boolean;
}

export const CreateExercise = (props: IProps) => {
	const { onSave, trainingExercise, setTrainingExercise, exerciseList, onCancel, userWeight, disabledSave } = props;
	const { t } = useTranslation();

	const [selectedExercise, setSelectedExercise] = useState<ExerciseModel | null>(
		exerciseList?.find(x => x?.id === trainingExercise?.exerciseId) ?? null
	);

	const handleSetTrainingExercise = (ex: IBaseTrainingExercise) => setTrainingExercise({ ...ex });

	const handleSelectExercise = (exercise: ExerciseModel | null) => {
		setSelectedExercise(exercise);

		handleSetTrainingExercise({
			...trainingExercise,
			exerciseId: exercise?.id,
			type: exercise?.type,
			// when a user changes an exercise, series should be empty
			seriesList: [],
		} as IBaseTrainingExercise);
	};

	const createSeries = useMemo(() => {
		if (!selectedExercise) {
			return null;
		}

		switch (selectedExercise.type) {
			case ExerciseTypes.Default:
				return (
					<DefaultSeries
						trainingExercise={trainingExercise as IDefaultTrainingExercise}
						onChange={handleSetTrainingExercise}
					/>
				);

			case ExerciseTypes.WithAdditionalWeight:
				return (
					<WithAdditionalWeightSeries
						trainingExercise={trainingExercise as IAdditionalWeightTrainingExercise}
						onChange={handleSetTrainingExercise}
					/>
				);

			case ExerciseTypes.WithNegativeWeight:
				return (
					<WithNegativeWeightSeries
						trainingExercise={trainingExercise as INegativeWeightTrainingExercise}
						onChange={handleSetTrainingExercise}
						userWeight={userWeight}
					/>
				);

			default:
				assertUnreachable(selectedExercise.type);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedExercise, trainingExercise]);

	return (
		<View style={commonStyles.wrapper}>
			<View style={commonStyles.wrapper}>
				<H1 text={t('Exercise')} />

				<Text>{t('Nomination')}</Text>
				<AutocompleteInput<ExerciseModel>
					autocompleteList={exerciseList}
					autocompleteField={'name'}
					selectedItem={selectedExercise}
					changeSelectedItem={handleSelectExercise}
					selectedItemViewComponent={ShowSelectedExercise}
				/>

				{createSeries}
			</View>

			<View style={commonStyles.bottomActionWrapper}>
				<TouchableOpacity onPress={onCancel} style={commonStyles.buttonWithIconWrapper}>
					<CancelIcon color={Colors.Red} />
					<Text style={commonStyles.cancelButton}>{t('Cancel')}</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={onSave} style={commonStyles.buttonWithIconWrapper}>
					<SaveIcon color={disabledSave ? Colors.Grey : Colors.LightBlue} />
					<Text style={[commonStyles.saveButtonText, disabledSave && commonStyles.disabledButton]}>{t('Save')}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

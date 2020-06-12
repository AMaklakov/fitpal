import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TrainingModel } from '@model/training.model';
import { ShowTraining } from './show-training';
import { ReorderTrainingExercise } from './reorder-training-exercises';
import { TrainingHeading } from '@screen/training/components/training-heading';
import { TrainingStatusBar } from '@screen/training/components/training-status-bar';
import { ExerciseModel } from '@model/exercise.model';
import { IBaseTrainingExercise } from '@model/training-exercise';
import moment, { MomentInput } from 'moment';
import { USER_WEIGHT_EXPIRATION_TIME_HOURS } from '@const/validation-const';
import { useTranslation } from 'react-i18next';

interface IProps {
	training?: TrainingModel;
	changeTraining: (training: TrainingModel) => void;
	exercises: ExerciseModel[];
	onAddExercise: (e?: IBaseTrainingExercise) => void;
	removeExercise: (e: IBaseTrainingExercise) => void;
	onGoBack: () => void;
	canEdit: boolean;
	lastUserUpdatedWeight: MomentInput;
	onShowWeightModal: () => void;

	onCalcRM?: (e: IBaseTrainingExercise) => void;
}

export const Training = (props: IProps) => {
	const { training, onAddExercise, exercises, removeExercise, changeTraining, canEdit = true } = props;
	const { lastUserUpdatedWeight, onShowWeightModal, onGoBack, onCalcRM } = props;

	const { t } = useTranslation();
	const [isReorder, changeIsReorder] = useState(false);

	const reorderExercises = (t: TrainingModel) => changeTraining(t);

	const onChangeOrderExercises = () => changeIsReorder(!isReorder);

	const handleAddOrEditExercise = useCallback(
		(e?: IBaseTrainingExercise) => {
			if (moment().diff(lastUserUpdatedWeight, 'hours') > USER_WEIGHT_EXPIRATION_TIME_HOURS) {
				onShowWeightModal();
			}

			onAddExercise(e);
		},
		[lastUserUpdatedWeight, onAddExercise, onShowWeightModal]
	);

	if (!training) {
		return (
			<View>
				{/*<Text>{'Seems like no training is present'}</Text>*/}

				<TouchableOpacity onPress={onGoBack}>
					<Text>{t('Go back to trainings')}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<TrainingStatusBar training={training} />
			<TrainingHeading training={training} canEdit={canEdit} onUpdateTraining={changeTraining} />

			{isReorder ? (
				<ReorderTrainingExercise
					exercises={exercises}
					training={training}
					changeTraining={reorderExercises}
					onSave={onChangeOrderExercises}
				/>
			) : (
				<ShowTraining
					exercises={exercises}
					onAddExercise={handleAddOrEditExercise}
					removeExercise={removeExercise}
					training={training}
					changeOrder={onChangeOrderExercises}
					onCalcRM={onCalcRM}
				/>
			)}
		</View>
	);
};

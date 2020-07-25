import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ITraining } from '@model/training.model';
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
	training?: ITraining;
	changeTraining: (training: ITraining) => void;
	onEdit?: (training?: ITraining) => void;
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
	const { lastUserUpdatedWeight, onShowWeightModal, onGoBack, onCalcRM, onEdit } = props;

	const { t } = useTranslation();
	const [isReorder, setIsReorder] = useState(false);

	const reorderExercises = useCallback((t: ITraining) => changeTraining(t), [changeTraining]);

	const handleToggleReorderMode = useCallback(() => setIsReorder(isReorder => !isReorder), []);

	const handleAddOrEditExercise = useCallback(
		(e?: IBaseTrainingExercise) => {
			if (moment().diff(lastUserUpdatedWeight, 'hours') > USER_WEIGHT_EXPIRATION_TIME_HOURS) {
				onShowWeightModal();
			}

			onAddExercise(e);
		},
		[lastUserUpdatedWeight, onAddExercise, onShowWeightModal]
	);

	const handleEdit = useCallback(() => onEdit?.(training), [onEdit, training]);

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
		<View style={styles.wrapper}>
			{isReorder && <TrainingStatusBar training={training} />}
			{isReorder && <TrainingHeading training={training} canEdit={canEdit} onEdit={handleEdit} />}

			{isReorder ? (
				<ReorderTrainingExercise
					exercises={exercises}
					training={training}
					changeTraining={reorderExercises}
					onExitReorderMode={handleToggleReorderMode}
				/>
			) : (
				<ShowTraining
					exercises={exercises}
					onAddExercise={handleAddOrEditExercise}
					removeExercise={removeExercise}
					training={training}
					onReorder={handleToggleReorderMode}
					onCalcRM={onCalcRM}
					header={
						<View>
							<TrainingStatusBar training={training} />
							<TrainingHeading training={training} canEdit={canEdit} onEdit={handleEdit} />
						</View>
					}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		marginHorizontal: 15,
		flex: 1,
	},
});

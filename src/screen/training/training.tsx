import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { TrainingModel } from '@model/training.model';
import { ShowTraining } from './show-training';
import { ReorderTrainingExercise } from './reorder-training-exercises';
import { TrainingHeading } from '@screen/training/components/training-heading';
import { TrainingStatusBar } from '@screen/training/components/training-status-bar';
import { ExerciseModel } from '@model/exercise.model';
import { IBaseTrainingExercise } from '@model/training-exercise';
import moment, { MomentInput } from 'moment';
import { USER_WEIGHT_EXPIRATION_TIME_HOURS } from '@const/validation-const';

interface IProps {
	training?: TrainingModel;
	changeTraining: (training: TrainingModel) => void;

	exercises: ExerciseModel[];

	onAddExercise: (e?: IBaseTrainingExercise) => void;
	removeExercise: (e: IBaseTrainingExercise) => void;
	onUpdateTrainingName: (name: string) => void;

	canEdit: boolean;
	lastUserUpdatedWeight: MomentInput;
	onShowWeightModal: () => void;
}

export const Training = (props: IProps) => {
	const {
		training,
		onAddExercise,
		exercises,
		removeExercise,
		changeTraining,
		canEdit = true,
		onUpdateTrainingName,
		lastUserUpdatedWeight,
		onShowWeightModal,
	} = props;

	if (!training) {
		throw new Error(`No training present`);
	}

	const [isReorder, changeIsReorder] = useState(false);

	const reorderExercises = (t: TrainingModel) => changeTraining(t);

	const onChangeOrderExercises = () => changeIsReorder(!isReorder);

	const handleAddExercise = useCallback(() => {
		if (moment().diff(lastUserUpdatedWeight, 'hours') > USER_WEIGHT_EXPIRATION_TIME_HOURS) {
			onShowWeightModal();
		}

		onAddExercise();
	}, [lastUserUpdatedWeight, onAddExercise, onShowWeightModal]);

	return (
		<View style={{ flex: 1 }}>
			<TrainingStatusBar training={training} />
			<TrainingHeading training={training} canEdit={canEdit} onUpdateTrainingName={onUpdateTrainingName} />

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
					onAddExercise={handleAddExercise}
					removeExercise={removeExercise}
					training={training}
					changeOrder={onChangeOrderExercises}
				/>
			)}
		</View>
	);
};

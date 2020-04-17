import { TrainingProps } from './types';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TrainingModel } from '@model/training.model';
import { ShowTraining } from './show-training';
import { ReorderTrainingExercise } from './reorder-training-exercises';
import { TrainingHeading } from '@screen/training/components/training-heading';
import { TrainingStatusBar } from '@screen/training/components/training-status-bar';

export const Training = (props: TrainingProps) => {
	const {
		training,
		addExerciseAction,
		exercises,
		removeExercise,
		changeTraining,
		canEdit = true,
		onUpdateTrainingName,
	} = props;

	if (!training) {
		throw new Error(`No training present`);
	}

	const [isReorder, changeIsReorder] = useState(false);

	const reorderExercises = (t: TrainingModel) => changeTraining(t);

	const onChangeOrderExercises = () => changeIsReorder(!isReorder);

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
					addExerciseAction={addExerciseAction}
					removeExercise={removeExercise}
					training={training}
					changeOrder={onChangeOrderExercises}
				/>
			)}
		</View>
	);
};

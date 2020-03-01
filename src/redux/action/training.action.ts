import { TrainingModel } from '@model/training.model';
import { PropType } from '../../util/type.util';
import { TrainingActions, TrainingExerciseAction } from './training-exercise.action';

export type ChangeTrainingAction = TrainingExerciseAction<{ training: TrainingModel }>;
export const changeTraining = (training: TrainingModel): ChangeTrainingAction => ({
	type: TrainingActions.ChangeTraining,

	payload: { training },
});

export type DeleteTrainingAction = TrainingExerciseAction<{
	trainingId: PropType<TrainingModel, 'id'>;
}>;
export const deleteTrainingById = (
	trainingId: PropType<TrainingModel, 'id'>
): DeleteTrainingAction => ({
	type: TrainingActions.DeleteTrainingById,

	payload: { trainingId },
});

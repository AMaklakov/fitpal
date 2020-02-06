import { Action } from 'redux';
import { PropType } from '../../util/type.util';
import { TrainingExerciseModel, TrainingModel } from '@model/training.model';

export enum TrainingActions {
	CreateTrainingExerciseByTrainingId = 'CreateTrainingExerciseByTrainingId',
	EditTrainingExerciseByTrainingId = 'EditTrainingExerciseByTrainingId',
	DeleteTrainingExerciseByTrainingId = 'DeleteTrainingExerciseByTrainingId',
}

export type TrainingAction<T extends Object> = Action<TrainingActions> & { payload: T };

export type CreateTrainingExerciseByTrainingIdAction = TrainingAction<{
	trainingId: PropType<TrainingModel, 'id'>;
	exercise: TrainingExerciseModel;
}>;

export const createTrainingExerciseByTrainingId = (
	trainingId: PropType<TrainingModel, 'id'>,
	exercise: TrainingExerciseModel
): CreateTrainingExerciseByTrainingIdAction => ({
	type: TrainingActions.CreateTrainingExerciseByTrainingId,

	payload: {
		trainingId,
		exercise,
	},
});

export const editTrainingExerciseByTrainingId = (
	trainingId: PropType<TrainingModel, 'id'>,
	exercise: TrainingExerciseModel
): CreateTrainingExerciseByTrainingIdAction => ({
	type: TrainingActions.EditTrainingExerciseByTrainingId,

	payload: {
		trainingId,
		exercise,
	},
});

export const deleteTrainingExerciseByTrainingId = (
	trainingId: PropType<TrainingModel, 'id'>,
	exercise: TrainingExerciseModel
): CreateTrainingExerciseByTrainingIdAction => ({
	type: TrainingActions.DeleteTrainingExerciseByTrainingId,

	payload: {
		trainingId,
		exercise,
	},
});

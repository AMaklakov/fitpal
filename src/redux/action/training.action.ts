import { Action } from 'redux';
import { PropType } from '../../util/type.util';
import { TrainingExerciseModel, TrainingModel } from '@model/training.model';

export enum TrainingActions {
	CreateTrainingExerciseByTrainingId = 'CreateTrainingExerciseByTrainingId',
	EditTrainingExerciseByTrainingId = 'EditTrainingExerciseByTrainingId',
}

export type TrainingAction<T extends Object> = Action<TrainingActions> & { payload: T };

export type CreateTrainingExerciseByTrainingIdAction = TrainingAction<{
	trainingId: PropType<TrainingModel, 'id'>;
	exercise: TrainingExerciseModel;
}>;

export const createTrainingExerciseByTrainingId = (
	trainingId: PropType<TrainingModel, 'id'>,
	exercise: TrainingExerciseModel
): CreateTrainingExerciseByTrainingIdAction => {
	return {
		type: TrainingActions.CreateTrainingExerciseByTrainingId,

		payload: {
			trainingId,
			exercise,
		},
	};
};

export const editTrainingExerciseByTrainingId = (
	trainingId: PropType<TrainingModel, 'id'>,
	exercise: TrainingExerciseModel
): CreateTrainingExerciseByTrainingIdAction => {
	return {
		type: TrainingActions.EditTrainingExerciseByTrainingId,

		payload: {
			trainingId,
			exercise,
		},
	};
};

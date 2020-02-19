import { Action } from 'redux';
import { PropType } from '../../util/type.util';
import { TrainingExerciseModel, TrainingModel } from '@model/training.model';

export enum TrainingActions {
	CreateTrainingExerciseByTrainingId = 'CreateTrainingExerciseByTrainingId',
	EditTrainingExerciseByTrainingId = 'EditTrainingExerciseByTrainingId',
	DeleteTrainingExerciseByTrainingId = 'DeleteTrainingExerciseByTrainingId',
	ChangeTraining = 'ChangeTraining',
}

export type TrainingExerciseByTrainingId = {
	trainingId: PropType<TrainingModel, 'id'>;
	exercise: TrainingExerciseModel;
};

export type TrainingExerciseAction<
	PayloadType extends Object = TrainingExerciseByTrainingId
> = Action<TrainingActions> & { payload: PayloadType };

export const createTrainingExerciseByTrainingId = (
	trainingId: PropType<TrainingModel, 'id'>,
	exercise: TrainingExerciseModel
): TrainingExerciseAction => ({
	type: TrainingActions.CreateTrainingExerciseByTrainingId,

	payload: {
		trainingId,
		exercise,
	},
});

export const editTrainingExerciseByTrainingId = (
	trainingId: PropType<TrainingModel, 'id'>,
	exercise: TrainingExerciseModel
): TrainingExerciseAction => ({
	type: TrainingActions.EditTrainingExerciseByTrainingId,

	payload: {
		trainingId,
		exercise,
	},
});

export const deleteTrainingExerciseByTrainingId = (
	trainingId: PropType<TrainingModel, 'id'>,
	exercise: TrainingExerciseModel
): TrainingExerciseAction => ({
	type: TrainingActions.DeleteTrainingExerciseByTrainingId,

	payload: {
		trainingId,
		exercise,
	},
});

export type ChangeTrainingAction = TrainingExerciseAction<{ training: TrainingModel }>;
export const changeTraining = (training: TrainingModel): ChangeTrainingAction => ({
	type: TrainingActions.ChangeTraining,

	payload: { training },
});

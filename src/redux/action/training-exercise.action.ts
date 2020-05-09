import { Action } from 'redux';
import { IBaseTrainingExercise } from '@model/training-exercise';

export enum TrainingActions {
	CreateTrainingExerciseByTrainingId = 'CreateTrainingExerciseByTrainingId',
	EditTrainingExerciseByTrainingId = 'EditTrainingExerciseByTrainingId',
	DeleteTrainingExerciseByTrainingId = 'DeleteTrainingExerciseByTrainingId',

	FetchTrainingsByDateStart = 'TRAINING/FETCH_BY_DATE/START',
	FetchTrainingByDateSuccess = 'TRAINING/FETCH_BY_DATE/SUCCESS',
	FetchTrainingByDateError = 'TRAINING/FETCH_BY_DATE/ERROR',

	FetchTrainingByIdStart = 'TRAINING/FETCH_BY_ID/START',
	FetchTrainingByIdSuccess = 'TRAINING/FETCH_BY_ID/SUCCESS',
	FetchTrainingByIdError = 'TRAINING/FETCH_BY_ID/ERROR',

	CreateTrainingStart = 'TRAINING/CREATE/START',
	CreateTrainingSuccess = 'TRAINING/CREATE/SUCCESS',
	CreateTrainingError = 'TRAINING/CREATE/ERROR',

	DeleteTrainingByIdStart = 'TRAINING/DELETE/START',
	DeleteTrainingByIdSuccess = 'TRAINING/DELETE/SUCCESS',
	DeleteTrainingByIdError = 'TRAINING/DELETE/ERROR',

	UpdateTrainingStart = 'TRAINING/UPDATE/START',
	UpdateTrainingSuccess = 'TRAINING/UPDATE/SUCCESS',
	UpdateTrainingError = 'TRAINING/UPDATE/ERROR',
}

export type TrainingExerciseByTrainingId = {
	trainingId: string;
	exercise: IBaseTrainingExercise;
};

export type TrainingExerciseAction<PayloadType extends Object = TrainingExerciseByTrainingId> = Action<
	TrainingActions
> & { payload: PayloadType };

export const createTrainingExerciseByTrainingId = (
	trainingId: string,
	exercise: IBaseTrainingExercise
): TrainingExerciseAction => ({
	type: TrainingActions.CreateTrainingExerciseByTrainingId,

	payload: {
		trainingId,
		exercise,
	},
});

export const editTrainingExerciseByTrainingId = (
	trainingId: string,
	exercise: IBaseTrainingExercise
): TrainingExerciseAction => ({
	type: TrainingActions.EditTrainingExerciseByTrainingId,

	payload: {
		trainingId,
		exercise,
	},
});

export const deleteTrainingExerciseByTrainingId = (
	trainingId: string,
	exercise: IBaseTrainingExercise
): TrainingExerciseAction => ({
	type: TrainingActions.DeleteTrainingExerciseByTrainingId,

	payload: {
		trainingId,
		exercise,
	},
});

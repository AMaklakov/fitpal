import { Action } from 'redux';
import { IBaseTrainingExercise } from '@model/training-exercise';
import { progressActions, progressTypes } from '@util/redux.util';
import { TrainingModel } from '@model/training.model';

/**
 * @deprecated use TRAINING_ACTIONS instead
 */
export enum TrainingActions {
	EditTrainingExerciseByTrainingId = 'EditTrainingExerciseByTrainingId',

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

// TODO replace TrainingActions with TRAINING_ACTIONS
export const TRAINING_ACTIONS = {
	EXERCISE: {
		ADD: progressTypes('TRAINING/EXERCISE', 'ADD'),
		REMOVE: progressTypes('TRAINING/EXERCISE', 'REMOVE'),
	},
};

export type IAddExerciseStart = { trainingId: string; exercise: IBaseTrainingExercise };
export type IRemoveExerciseStart = { trainingId: string; exerciseId: string };
export const TRAINING_ACTION_CREATORS = {
	EXERCISE: {
		ADD: progressActions<IAddExerciseStart, TrainingModel, object>(TRAINING_ACTIONS.EXERCISE.ADD),
		REMOVE: progressActions<IRemoveExerciseStart, TrainingModel, object>(TRAINING_ACTIONS.EXERCISE.REMOVE),
	},
};

// TODO remove everything below

export type TrainingExerciseByTrainingId = {
	trainingId: string;
	exercise: IBaseTrainingExercise;
};

export type TrainingExerciseAction<PayloadType extends Object = TrainingExerciseByTrainingId> = Action<
	TrainingActions
> & { payload: PayloadType };

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

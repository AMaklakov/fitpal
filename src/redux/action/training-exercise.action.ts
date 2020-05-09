import { IBaseTrainingExercise } from '@model/training-exercise';
import { progressActions, progressTypes } from '@util/redux.util';
import { ICreateTraining, TrainingModel } from '@model/training.model';
import { MomentInput } from 'moment';

/**
 * @deprecated use TRAINING_ACTIONS instead
 */
export enum TrainingActions {
	DeleteTrainingByIdStart = 'TRAINING/DELETE/START',
	DeleteTrainingByIdSuccess = 'TRAINING/DELETE/SUCCESS',
	DeleteTrainingByIdError = 'TRAINING/DELETE/ERROR',

	UpdateTrainingStart = 'TRAINING/UPDATE/START',
	UpdateTrainingSuccess = 'TRAINING/UPDATE/SUCCESS',
	UpdateTrainingError = 'TRAINING/UPDATE/ERROR',
}

// TODO replace TrainingActions with TRAINING_ACTIONS
export const TRAINING_ACTIONS = {
	FETCH_BY_DATE: progressTypes('TRAINING', 'FETCH_BY_DATE'),
	FETCH_BY_ID: progressTypes('TRAINING', 'FETCH_BY_ID'),
	CREATE: progressTypes('TRAINING', 'CREATE'),
	EXERCISE: {
		ADD: progressTypes('TRAINING/EXERCISE', 'ADD'),
		EDIT: progressTypes('TRAINING/EXERCISE', 'EDIT'),
		REMOVE: progressTypes('TRAINING/EXERCISE', 'REMOVE'),
	},
};

export type IAddExerciseStart = { trainingId: string; exercise: IBaseTrainingExercise };
export type IEditExerciseStart = IAddExerciseStart;
export type IRemoveExerciseStart = { trainingId: string; exerciseId: string };
export const TRAINING_ACTION_CREATORS = {
	FETCH_BY_DATE: progressActions<MomentInput, TrainingModel[], object>(TRAINING_ACTIONS.FETCH_BY_DATE),
	FETCH_BY_ID: progressActions<string | undefined, TrainingModel | undefined, object>(TRAINING_ACTIONS.FETCH_BY_ID),
	CREATE: progressActions<ICreateTraining, TrainingModel | undefined, object>(TRAINING_ACTIONS.CREATE),
	EXERCISE: {
		ADD: progressActions<IAddExerciseStart, TrainingModel, object>(TRAINING_ACTIONS.EXERCISE.ADD),
		EDIT: progressActions<IEditExerciseStart, TrainingModel, object>(TRAINING_ACTIONS.EXERCISE.EDIT),
		REMOVE: progressActions<IRemoveExerciseStart, TrainingModel, object>(TRAINING_ACTIONS.EXERCISE.REMOVE),
	},
};

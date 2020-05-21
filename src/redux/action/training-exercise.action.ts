import { IBaseTrainingExercise } from '@model/training-exercise';
import { progressActions, progressTypes } from '@util/redux.util';
import { ICreateTraining, TrainingModel } from '@model/training.model';
import { MomentInput } from 'moment';

export const TRAINING_ACTIONS = {
	FETCH_BY_DATE_RANGE: progressTypes('TRAINING', 'FETCH_BY_DATE_RANGE'),
	FETCH_BY_DATE: progressTypes('TRAINING', 'FETCH_BY_DATE'),
	FETCH_BY_ID: progressTypes('TRAINING', 'FETCH_BY_ID'),
	CREATE: progressTypes('TRAINING', 'CREATE'),
	DELETE: progressTypes('TRAINING', 'DELETE'),
	UPDATE: progressTypes('TRAINING', 'UPDATE'),

	EXERCISE: {
		ADD: progressTypes('TRAINING/EXERCISE', 'ADD'),
		EDIT: progressTypes('TRAINING/EXERCISE', 'EDIT'),
		REMOVE: progressTypes('TRAINING/EXERCISE', 'REMOVE'),
	},
};

export type IFetchByDateRange = { startDate: MomentInput; endDate: MomentInput };
export type IAddExerciseStart = { trainingId: string; exercise: IBaseTrainingExercise };
export type IEditExerciseStart = IAddExerciseStart;
export type IRemoveExerciseStart = { trainingId: string; exerciseId: string };
export const TRAINING_ACTION_CREATORS = {
	FETCH_BY_DATE_RANGE: progressActions<IFetchByDateRange, TrainingModel[], object>(
		TRAINING_ACTIONS.FETCH_BY_DATE_RANGE
	),
	FETCH_BY_DATE: progressActions<MomentInput, TrainingModel[], object>(TRAINING_ACTIONS.FETCH_BY_DATE),
	FETCH_BY_ID: progressActions<string | undefined, TrainingModel | undefined, object>(TRAINING_ACTIONS.FETCH_BY_ID),
	CREATE: progressActions<ICreateTraining, TrainingModel | undefined, object>(TRAINING_ACTIONS.CREATE),
	DELETE: progressActions<string, string, object>(TRAINING_ACTIONS.DELETE),
	UPDATE: progressActions<TrainingModel, TrainingModel, object>(TRAINING_ACTIONS.UPDATE),

	EXERCISE: {
		ADD: progressActions<IAddExerciseStart, TrainingModel, object>(TRAINING_ACTIONS.EXERCISE.ADD),
		EDIT: progressActions<IEditExerciseStart, TrainingModel, object>(TRAINING_ACTIONS.EXERCISE.EDIT),
		REMOVE: progressActions<IRemoveExerciseStart, TrainingModel, object>(TRAINING_ACTIONS.EXERCISE.REMOVE),
	},
};

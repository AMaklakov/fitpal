import { ICreateTrainingExercise } from '@model/training-exercise';
import { dataActionCreator, progressActions, progressTypes } from '@util/redux.util';
import { ICreateTraining, ITraining } from '@model/training.model';
import { MomentInput } from 'moment';

export const TRAINING_ACTIONS = {
	FETCH_BY_DATE_RANGE: progressTypes('TRAINING', 'FETCH_BY_DATE_RANGE'),
	FETCH_BY_DATE: progressTypes('TRAINING', 'FETCH_BY_DATE'),
	FETCH_BY_ID: progressTypes('TRAINING', 'FETCH_BY_ID'),
	CREATE: progressTypes('TRAINING', 'CREATE'),
	DELETE: progressTypes('TRAINING', 'DELETE'),
	SET_TO_UPDATE: 'TRAINING/SET_TO_UPDATE',
	UPDATE: progressTypes('TRAINING', 'UPDATE'),

	EXERCISE: {
		ADD: progressTypes('TRAINING/EXERCISE', 'ADD'),
		EDIT: progressTypes('TRAINING/EXERCISE', 'EDIT'),
		REMOVE: progressTypes('TRAINING/EXERCISE', 'REMOVE'),
	},
};

export type IFetchByDateRange = { startDate: MomentInput; endDate: MomentInput };
export type IAddExerciseStart = { trainingId: string; exercise: ICreateTrainingExercise };
export type IEditExerciseStart = IAddExerciseStart;
export type IRemoveExerciseStart = { trainingId: string; exerciseId: string };
export const TRAINING_ACTION_CREATORS = {
	FETCH_BY_DATE_RANGE: progressActions<IFetchByDateRange, ITraining[], object>(TRAINING_ACTIONS.FETCH_BY_DATE_RANGE),
	FETCH_BY_DATE: progressActions<MomentInput, ITraining[], object>(TRAINING_ACTIONS.FETCH_BY_DATE),
	FETCH_BY_ID: progressActions<string | undefined, ITraining | undefined, object>(TRAINING_ACTIONS.FETCH_BY_ID),
	CREATE: progressActions<ICreateTraining, ITraining | undefined, object>(TRAINING_ACTIONS.CREATE),
	DELETE: progressActions<string, string, object>(TRAINING_ACTIONS.DELETE),
	SET_TO_UPDATE: dataActionCreator<string | null>(TRAINING_ACTIONS.SET_TO_UPDATE),
	UPDATE: progressActions<ITraining, ITraining, object>(TRAINING_ACTIONS.UPDATE),

	EXERCISE: {
		ADD: progressActions<IAddExerciseStart, ITraining, object>(TRAINING_ACTIONS.EXERCISE.ADD),
		EDIT: progressActions<IEditExerciseStart, ITraining, object>(TRAINING_ACTIONS.EXERCISE.EDIT),
		REMOVE: progressActions<IRemoveExerciseStart, ITraining, object>(TRAINING_ACTIONS.EXERCISE.REMOVE),
	},
};

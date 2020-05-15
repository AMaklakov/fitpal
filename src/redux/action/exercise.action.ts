import { ExerciseModel, ICreateExercise } from '@model/exercise.model';
import { progressActions, progressTypes } from '@util/redux.util';

export enum ExerciseActions {
	FetchStart = 'EXERCISE/FETCH/START',
	FetchSuccess = 'EXERCISE/FETCH/SUCCESS',
	FetchError = 'EXERCISE/FETCH/ERROR',

	CreateStart = 'EXERCISE/CREATE/START',
	CreateSuccess = 'EXERCISE/CREATE/SUCCESS',
	CreateError = 'EXERCISE/CREATE/ERROR',
}

export const EXERCISE_ACTIONS = {
	UPDATE: progressTypes('EXERCISE', 'UPDATE'),
};

export const EXERCISE_ACTION_CREATORS = {
	FETCH: progressActions<null, ExerciseModel, object>({
		START: ExerciseActions.FetchStart,
		SUCCESS: ExerciseActions.FetchSuccess,
		ERROR: ExerciseActions.FetchError,
	}),
	CREATE: progressActions<ICreateExercise, ExerciseModel, object>({
		START: ExerciseActions.CreateStart,
		SUCCESS: ExerciseActions.CreateSuccess,
		ERROR: ExerciseActions.CreateError,
	}),
	UPDATE: progressActions<ExerciseModel, ExerciseModel, object>(EXERCISE_ACTIONS.UPDATE),
};

export const {
	START: fetchExercisesStart,
	SUCCESS: fetchExercisesSuccess,
	ERROR: fetchExercisesError,
} = EXERCISE_ACTION_CREATORS.FETCH;

export const {
	START: createExerciseStart,
	SUCCESS: createExerciseSuccess,
	ERROR: createExerciseError,
} = EXERCISE_ACTION_CREATORS.CREATE;

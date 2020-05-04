import { ExerciseModel, ICreateExercise, isExerciseValid } from '@model/exercise.model';
import { Action } from 'redux';
import { Alert } from 'react-native';
import { createFetchActions } from '@model/data-action.model';

export enum ExerciseActions {
	CreateStart = 'EXERCISE/CREATE/START',
	CreateSuccess = 'EXERCISE/CREATE/SUCCESS',
	CreateError = 'EXERCISE/CREATE/ERROR',

	Update = 'Exercise/Update',
}

export const [createExerciseStart, createExerciseSuccess, createExerciseError] = createFetchActions<
	ICreateExercise,
	ExerciseModel,
	object,
	ExerciseActions
>([ExerciseActions.CreateStart, ExerciseActions.CreateSuccess, ExerciseActions.CreateError]);

export type ExerciseAction<T extends Object = {}> = Action<ExerciseActions> & { payload: T };
// TODO rewrite to 2 separate functions
export type UpdateExerciseAction = ExerciseAction<{ exercise: ExerciseModel }>;
export const updateExerciseAction = (ex: ExerciseModel): UpdateExerciseAction | undefined => {
	const exercise = { ...ex };

	if (!isExerciseValid(exercise)) {
		Alert.alert('Exercise is not valid!');
		return;
	}

	return {
		type: ExerciseActions.Update,
		payload: { exercise: exercise as ExerciseModel },
	};
};

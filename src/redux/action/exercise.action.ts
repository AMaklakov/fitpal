import { WithOptional } from '../../util/type.util';
import { ExerciseModel, isExerciseValid } from '../../model/exercise.model';
import { Action } from 'redux';
import { Alert } from 'react-native';
import { generateId } from '../../util/uuid.util';

export enum ExerciseActions {
	Create = 'Exercise/Create',
	Update = 'Exercise/Update',
}

export type ExerciseAction<T extends Object = {}> = Action<ExerciseActions> & { payload: T };

export type CreateExerciseAction = ExerciseAction<{ exercise: ExerciseModel }>;
export const createExerciseAction = (ex: WithOptional<ExerciseModel, 'id'>): CreateExerciseAction | undefined => {
	const exercise = { ...ex };

	if (!exercise.id) {
		exercise.id = generateId();
	}

	if (!isExerciseValid(exercise)) {
		Alert.alert('Exercise is not valid!');
		return;
	}

	return {
		type: ExerciseActions.Create,
		payload: { exercise: exercise as ExerciseModel },
	};
};

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

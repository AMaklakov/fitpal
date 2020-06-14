import { ExerciseModel } from '@model/exercise.model';
import { isPresent } from '@util/type.util';
import { EXERCISE_VALID } from '@const/validation-const';

export const validateExercise = (ex: Partial<ExerciseModel>): boolean => {
	if (!isPresent(ex)) {
		return false;
	}

	if (
		!isPresent(ex.name) ||
		ex.name.length > EXERCISE_VALID.NAME.maxLength ||
		ex.name.length < EXERCISE_VALID.NAME.minLength
	) {
		return false;
	}

	if (isPresent(ex.description) && ex.description.length > EXERCISE_VALID.DESCRIPTION.maxLength) {
		return false;
	}

	return true;
};

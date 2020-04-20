import { assertUnreachable } from '../util/assert-unreachable';
import { isPresent } from '../util/type.util';

export enum ExerciseTypes {
	/**
	 * With regular weight
	 */
	Default,

	/**
	 * Exercise is being done with body weight, but additionally
	 * one can use some weight to make exercise `harder` to do
	 */
	WithAdditionalWeight,

	/**
	 * Exercise is being done with body weight, but additionally
	 * one can use some weight to make exercise `simpler` to do
	 */
	WithNegativeWeight,
}

export interface ExerciseModel {
	_id: string;

	type: ExerciseTypes;
	name: string;
}

export type ICreateExercise = Omit<ExerciseModel, '_id'>;

const isTypeValid = (type?: ExerciseTypes): boolean => {
	if (!isPresent(type)) {
		return false;
	}

	switch (type) {
		case ExerciseTypes.Default:
		case ExerciseTypes.WithAdditionalWeight:
		case ExerciseTypes.WithNegativeWeight:
			return true;
		default:
			assertUnreachable(type);
			return false;
	}
};

export const isExerciseValid = (exercise?: Partial<ExerciseModel>): boolean => {
	if (!isPresent(exercise)) {
		return false;
	}

	const { name, type } = exercise;

	if (!name) {
		return false;
	}

	if (!isPresent(type) || !isTypeValid(type)) {
		return false;
	}

	return true;
};

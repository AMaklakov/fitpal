export interface ExerciseModel {
	id: string;

	name: string;
}

export const isExerciseValid = (exercise?: Partial<ExerciseModel>): boolean => {
	if (!exercise) {
		return false;
	}

	const { id, name } = exercise;

	if (!id || !name) {
		return false;
	}

	return true;
};

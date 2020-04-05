import { IBaseTrainingExercise } from '@model/training-exercise';

export interface TrainingModel {
	id: string;
	date: string;

	name: string;

	exerciseList: IBaseTrainingExercise[];
}

export const isTrainingValid = (training?: Partial<TrainingModel>): boolean => {
	if (!training) {
		return false;
	}

	const { date, exerciseList, id, name } = training;

	if (!date || !exerciseList || !id || !name) {
		return false;
	}

	return true;
};

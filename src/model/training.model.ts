import { IBaseTrainingExercise } from '@model/training-exercise';
import { MomentInput } from 'moment';

export interface TrainingModel {
	id: string;
	date: MomentInput;

	name: string;

	exerciseList: IBaseTrainingExercise[];
}

export type ICreateTraining = Omit<TrainingModel, 'id'>;

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

export const isCreateTrainingValid = (training?: ICreateTraining | Partial<ICreateTraining>): boolean => {
	if (!training) {
		return false;
	}

	const { date, exerciseList, name } = training;

	if (!date || !exerciseList || !name) {
		return false;
	}

	return true;
};

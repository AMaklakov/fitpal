import { IBaseTrainingExercise } from '@model/training-exercise';
import { MomentInput } from 'moment';

export interface TrainingModel {
	_id: string;
	userId?: string;

	name: string;
	date: MomentInput;
	exerciseList: IBaseTrainingExercise[];

	createdAt?: MomentInput;
	updatedAt?: MomentInput;
}

export type ICreateTraining = Omit<TrainingModel, '_id' | 'createdAt' | 'updatedAt' | 'userId'>;

export const isTrainingValid = (training?: Partial<TrainingModel>): boolean => {
	if (!training) {
		return false;
	}

	const { date, exerciseList, _id, name } = training;

	if (!date || !exerciseList || !_id || !name) {
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

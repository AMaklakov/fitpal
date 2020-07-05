import { IBaseTrainingExercise } from '@model/training-exercise';
import { MomentInput } from 'moment';

export interface ITraining {
	_id: string;
	userId?: string;

	name: string;
	color: string;
	date: MomentInput;
	exerciseList: IBaseTrainingExercise[];

	createdAt?: MomentInput;
	updatedAt?: MomentInput;
}

/**
 * @deprecated
 * TODO replace with ITraining
 */
export type TrainingModel = ITraining;

export type ICreateTraining = Omit<ITraining, '_id' | 'createdAt' | 'updatedAt' | 'userId'>;

export const isTrainingValid = (training?: Partial<ITraining>): boolean => {
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

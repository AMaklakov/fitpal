import { TrainingModel } from '@model/training.model';
import { StoreModel } from '../store';
import { PropType } from '../../util/type.util';

export const getFirstTrainingByDate = (
	store: StoreModel,
	date: PropType<TrainingModel, 'date'>
): TrainingModel | undefined => {
	return store?.training?.find((t: TrainingModel) => t.date === date);
};

export const getTrainingListByDate = (
	store: StoreModel,
	date: PropType<TrainingModel, 'date'>
): TrainingModel[] | undefined => {
	return store?.training?.filter((t: TrainingModel) => t.date === date);
};

export const getTrainingById = (
	store: StoreModel,
	id: PropType<TrainingModel, 'id'>
): TrainingModel | undefined => {
	return store?.training?.find((t: TrainingModel) => t.id === id);
};

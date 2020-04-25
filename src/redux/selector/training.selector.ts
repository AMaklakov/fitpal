import { StoreModel } from '@redux/store';
import { PropType } from '@util/type.util';
import { TrainingModel } from '@model/training.model';
import { Moment } from 'moment';
import { formatDate } from '@util/date.util';

export const getFirstTrainingByDate = (
	store: StoreModel,
	date: PropType<TrainingModel, 'date'>
): TrainingModel | undefined => {
	return store?.training?.trainings.find((t: TrainingModel) => t.date === date);
};

export const getTrainingListByDate = (store: StoreModel, date: Moment): TrainingModel[] | undefined => {
	const selectedDate = formatDate(date);
	return store.training.trainings.filter((t: TrainingModel) => formatDate(t.date) === selectedDate);
};

export const getTrainingById = (store: StoreModel, id: PropType<TrainingModel, 'id'>): TrainingModel | undefined => {
	return store.training.trainings.find((t: TrainingModel) => t.id === id);
};

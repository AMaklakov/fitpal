import { StoreModel } from '@redux/store';
import { PropType } from '@util/type.util';
import { TrainingModel } from '@model/training.model';
import moment, { Moment } from 'moment';

export const getFirstTrainingByDate = (
	store: StoreModel,
	date: PropType<TrainingModel, 'date'>
): TrainingModel | undefined => {
	return store?.training?.trainings.find((t: TrainingModel) => t.date === date);
};

export const getTrainingById = (store: StoreModel, id: string): TrainingModel | undefined => {
	return store.training.trainings.find((t: TrainingModel) => t._id === id);
};

export const selectLast = (store: StoreModel, n: number): TrainingModel[] => {
	return store.training.trainings.sort((a, b) => +moment(a.date).isAfter(b.date)).slice(0, n);
};

export const selectByDates = (store: StoreModel, startDate: Moment, endDate: Moment): TrainingModel[] => {
	return store.training.trainings.filter(x => moment(x.date).isBetween(startDate, endDate, undefined, '[]'));
};

export const selectLastDays = (store: StoreModel, numberOfDays: number): TrainingModel[] => {
	const startDate = moment()
		.subtract(numberOfDays, 'days')
		.startOf('day');
	const endDate = moment().endOf('day');

	return selectByDates(store, startDate, endDate);
};

export const getTrainingListByDate = (store: StoreModel, date: Moment): TrainingModel[] => {
	const [start, end] = [date.clone().startOf('day'), date.clone().endOf('day')];
	return selectByDates(store, start, end).sort((a, b) => +moment(a.createdAt).isBefore(b.createdAt));
};

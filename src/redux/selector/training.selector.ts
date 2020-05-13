import { StoreModel } from '@redux/store';
import { PropType } from '@util/type.util';
import { TrainingModel } from '@model/training.model';
import moment, { Moment } from 'moment';
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

export const getTrainingById = (store: StoreModel, id: string): TrainingModel | undefined => {
	return store.training.trainings.find((t: TrainingModel) => t._id === id);
};

export const selectLast = (store: StoreModel, n: number): TrainingModel[] => {
	return store.training.trainings.sort((a, b) => +moment(a.date).isAfter(b.date)).slice(0, n);
};

export const selectByDates = (store: StoreModel, startDate: Moment, endDate: Moment): TrainingModel[] => {
	return store.training.trainings.filter(x => moment(x.date).isBetween(startDate, endDate));
};

export const selectLastDays = (store: StoreModel, numberOfDays: number): TrainingModel[] => {
	const startDate = moment()
		.subtract(numberOfDays, 'days')
		.startOf('day');
	const endDate = moment().endOf('day');

	return selectByDates(store, startDate, endDate);
};

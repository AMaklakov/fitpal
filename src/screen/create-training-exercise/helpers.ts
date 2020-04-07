import { IBaseTrainingExercise, ISeries } from '@model/training-exercise';
import { cloneSeries, cloneSeriesList, createEmptySeries } from '@util/series.util';

export const addEmptySeries = (ex: IBaseTrainingExercise): IBaseTrainingExercise => {
	const series = cloneSeriesList(ex.seriesList);
	series.push(createEmptySeries(series.length + 1));

	return {
		...ex,
		seriesList: series,
	};
};

export const editSeriesBySequenceNumber = (
	ex: IBaseTrainingExercise,
	series: ISeries,
	sequenceNumber: number
): IBaseTrainingExercise => {
	const seriesList = ex.seriesList.reduce((buff: ISeries[], s: ISeries, i: number) => {
		if (i + 1 !== sequenceNumber) {
			return [...buff, cloneSeries(s)];
		}

		return [...buff, cloneSeries(series)];
	}, [] as ISeries[]);

	return {
		...ex,
		seriesList,
	};
};

export const popSeries = (ex: IBaseTrainingExercise): IBaseTrainingExercise => {
	ex.seriesList.pop();

	return {
		...ex,
		seriesList: cloneSeriesList(ex.seriesList),
	};
};

export const repeatLastSeries = (ex: IBaseTrainingExercise): IBaseTrainingExercise => {
	const lastRepeat = cloneSeries(ex.seriesList[ex.seriesList.length - 1]);
	lastRepeat.sequenceNumber += 1;

	return {
		...ex,
		seriesList: [...ex.seriesList, lastRepeat],
	};
};

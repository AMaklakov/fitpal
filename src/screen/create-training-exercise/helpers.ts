import { SeriesModel, TrainingExerciseModel } from '../../model/training.model';

const createEmptySeriesBlock = (sequenceNumber: number): SeriesModel => ({
	sequenceNumber,
	repeats: 1,
	weight: 0,
});

export const addEmptySeries = (ex: TrainingExerciseModel): TrainingExerciseModel => {
	const series = ex.seriesList ?? [];

	return {
		...ex,
		seriesList: [...series, createEmptySeriesBlock(series.length + 1)],
	};
};

export const editSeriesBySequenceNumber = (
	ex: TrainingExerciseModel,
	series: SeriesModel,
	sequenceNumber: number
): TrainingExerciseModel => {
	const seriesList = ex.seriesList.reduce((buff: SeriesModel[], s: SeriesModel, i: number) => {
		if (i + 1 !== sequenceNumber) {
			return [...buff, { ...s }];
		}

		return [...buff, { ...series }];
	}, [] as SeriesModel[]);

	return {
		...ex,
		seriesList,
	};
};

export const popSeries = (ex: TrainingExerciseModel): TrainingExerciseModel => {
	ex.seriesList.pop();

	return {
		...ex,
		seriesList: [...ex.seriesList],
	};
};

export const repeatLastSeries = (ex: TrainingExerciseModel) => {
	const lastRepeat = ex.seriesList[ex.seriesList.length - 1];

	return {
		...ex,
		seriesList: [...ex.seriesList, { ...lastRepeat }],
	};
};

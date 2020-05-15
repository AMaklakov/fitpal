import { Big, BigSource } from 'big.js';
import { cloneSeriesList } from './series.util';
import {
	IAdditionalWeightTrainingExercise,
	IBaseTrainingExercise,
	IDefaultTrainingExercise,
	INegativeWeightTrainingExercise,
	ISeries,
} from '@model/training-exercise';
import { TrainingModel } from '@model/training.model';
import { assertUnreachable } from '@util/assert-unreachable';
import { ExerciseTypes } from '@model/exercise.model';
import { MAX_REPEATS, MAX_WEIGHT, MIN_REPEATS, MIN_WEIGHT } from '@const/validation-const';

type ICloneTrainingExercise = {
	(ex: IBaseTrainingExercise): IBaseTrainingExercise;
	(ex: Partial<IBaseTrainingExercise>): Partial<IBaseTrainingExercise>;
};
// @ts-ignore
export const cloneTrainingExercise: ICloneTrainingExercise = ex => {
	return {
		...ex,
		seriesList: cloneSeriesList(ex?.seriesList),
	};
};

export const cloneTrainingExerciseList = (list?: IBaseTrainingExercise[]): IBaseTrainingExercise[] => {
	return list ? list.map(ex => cloneTrainingExercise(ex)) : [];
};

export const createEmptyTrainingExercise = (userWeight?: BigSource): Partial<IBaseTrainingExercise> => ({
	seriesList: [],
	userWeight,
});

const calcWithNegativeWeightTotal = ({ seriesList, userWeight = 0 }: INegativeWeightTrainingExercise): Big => {
	return seriesList?.reduce((total, s) => {
		const seriesTotal = new Big(userWeight).minus(s.weight).times(s.repeats);
		return total.plus(seriesTotal);
	}, new Big(0));
};

const calcWithAdditionalWeightTotal = ({ seriesList, userWeight = 0 }: IAdditionalWeightTrainingExercise): Big => {
	return seriesList?.reduce((total, s) => {
		const seriesTotal = new Big(userWeight).plus(s.weight).times(s.repeats);
		return total.plus(seriesTotal);
	}, new Big(0));
};

const calcDefaultTotal = ({ seriesList }: IDefaultTrainingExercise): Big => {
	return seriesList?.reduce((total, s) => {
		const seriesTotal = new Big(s.weight).times(s.repeats);
		return total.plus(seriesTotal);
	}, new Big(0));
};

export const calcTotal = (ex: IBaseTrainingExercise): string => {
	let result = new Big(0);

	ex.type = ex.type ?? ExerciseTypes.Default;

	switch (ex.type) {
		case ExerciseTypes.Default:
			result = calcDefaultTotal(ex as IDefaultTrainingExercise);
			break;

		case ExerciseTypes.WithAdditionalWeight:
			result = calcWithAdditionalWeightTotal(ex as IAdditionalWeightTrainingExercise);
			break;

		case ExerciseTypes.WithNegativeWeight:
			result = calcWithNegativeWeightTotal(ex as INegativeWeightTrainingExercise);
			break;

		default:
			assertUnreachable(ex.type);
	}

	return result.toString();
};

export const calculateTrainingTotal = (training: TrainingModel) =>
	training.exerciseList.reduce((buff, ex) => buff.plus(calcTotal(ex)), new Big(0));

const isValidSeries = (
	series: ISeries,
	minWeight: BigSource,
	maxWeight: BigSource,
	minRepeats: BigSource,
	maxRepeats: BigSource
): boolean => {
	const repeats = new Big(series.repeats);
	const weight = new Big(series.weight);

	if (!repeats.round().eq(repeats)) {
		return false;
	}

	const isRepeatsValid = repeats.gte(minRepeats) && repeats.lte(maxRepeats);
	const isWeightValid = weight.gte(minWeight) && weight.lte(maxWeight);

	return isRepeatsValid && isWeightValid;
};

export const validateTrainingExercise = (ex: IBaseTrainingExercise, userWeight?: BigSource): boolean => {
	switch (ex.type) {
		case ExerciseTypes.Default:
			return ex.seriesList.every(series => isValidSeries(series, MIN_WEIGHT, MAX_WEIGHT, MIN_REPEATS, MAX_REPEATS));

		case ExerciseTypes.WithAdditionalWeight:
			return ex.seriesList.every(series => isValidSeries(series, 0, MAX_WEIGHT, MIN_REPEATS, MAX_REPEATS));

		case ExerciseTypes.WithNegativeWeight:
			if (!userWeight) {
				throw new Error(`User weight is not passed as argument`);
			}

			return ex.seriesList.every(series =>
				isValidSeries(series, 0, new Big(userWeight).minus(1), MIN_REPEATS, MAX_REPEATS)
			);

		default:
			assertUnreachable(ex.type);
	}

	throw new Error(`Not implemented exercise type`);
};

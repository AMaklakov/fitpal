import { Big, BigSource } from 'big.js';
import { cloneSetList } from './set.util';
import {
	IAdditionalWeightTrainingExercise,
	IBaseTrainingExercise,
	ICreateTrainingExercise,
	IDefaultTrainingExercise,
	INegativeWeightTrainingExercise,
	ISeries,
} from '@model/training-exercise';
import { TrainingModel } from '@model/training.model';
import { assertUnreachable } from '@util/assert-unreachable';
import { ExerciseTypes } from '@model/exercise.model';
import { MAX_REPEATS, MAX_WEIGHT, MIN_REPEATS, MIN_WEIGHT } from '@const/validation-const';
import { isPresent } from '@util/type.util';

type ICloneTrainingExercise = {
	(ex: IBaseTrainingExercise): IBaseTrainingExercise;
	(ex: Partial<IBaseTrainingExercise>): Partial<IBaseTrainingExercise>;
};
// @ts-ignore
export const cloneTrainingExercise: ICloneTrainingExercise = ex => {
	return {
		...ex,
		seriesList: cloneSetList(ex?.seriesList),
	};
};

export const cloneTrainingExerciseList = (list?: IBaseTrainingExercise[]): IBaseTrainingExercise[] => {
	return list ? list.map(ex => cloneTrainingExercise(ex)) : [];
};

export const createEmptyTrainingExercise = (userWeight: BigSource): ICreateTrainingExercise => ({
	seriesList: [],
	userWeight,
	exerciseId: '',
	type: ExerciseTypes.Default,
	sequenceNumber: 0, // ? why do we need this ?
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
	try {
		const repeats = new Big(series.repeats);
		const weight = new Big(series.weight);

		if (!repeats.round().eq(repeats)) {
			return false;
		}

		const isRepeatsValid = repeats.gte(minRepeats) && repeats.lte(maxRepeats);
		const isWeightValid = weight.gte(minWeight) && weight.lte(maxWeight);

		return isRepeatsValid && isWeightValid;
	} catch (error) {
		if (error.message.includes('Invalid number')) {
			// here either `repeats` or `weight` are invalid numbers, e.g. containing letters
			return false;
		}

		throw error;
	}
};

export const validateTrainingExercise = (ex: IBaseTrainingExercise | ICreateTrainingExercise): boolean => {
	if (!ex.exerciseId || !isPresent(ex.type)) {
		return false;
	}

	switch (ex.type) {
		case ExerciseTypes.Default:
			return ex.seriesList.every(series => isValidSeries(series, MIN_WEIGHT, MAX_WEIGHT, MIN_REPEATS, MAX_REPEATS));

		case ExerciseTypes.WithAdditionalWeight:
			return ex.seriesList.every(series => isValidSeries(series, 0, MAX_WEIGHT, MIN_REPEATS, MAX_REPEATS));

		case ExerciseTypes.WithNegativeWeight:
			if (!ex.userWeight) {
				throw new Error(`User weight is not passed as argument`);
			}

			return ex.seriesList.every(series =>
				isValidSeries(series, 0, new Big(ex.userWeight).minus(1), MIN_REPEATS, MAX_REPEATS)
			);
	}

	throw new Error(`Not implemented exercise type`);
};

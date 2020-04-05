import { Big, BigSource } from 'big.js';
import { cloneSeriesList } from './series.util';
import { generateId } from './uuid.util';
import {
	IAdditionalWeightTrainingExercise,
	IBaseTrainingExercise,
	IDefaultTrainingExercise,
	INegativeWeightTrainingExercise,
} from '@model/training-exercise';
import { TrainingModel } from '@model/training.model';
import { assertUnreachable } from '@util/assert-unreachable';
import { ExerciseTypes } from '@model/exercise.model';

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
	id: generateId(),
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

import { ExerciseTypes } from '@model/exercise.model';
import { BigSource } from 'big.js';
import { WithOptional } from '@util/type.util';

export interface ISet {
	_id: string;

	repeats: BigSource;
	weight: BigSource;
}

/**
 * @deprecated use `ISet` instead
 */
export type ISeries = ISet;

export interface IBaseTrainingExercise {
	_id: string;
	exerciseId: string;

	type: ExerciseTypes;
	sequenceNumber: number;
	userWeight: BigSource;

	seriesList: ISet[];
}

export type ICreateTrainingExercise = WithOptional<IBaseTrainingExercise, '_id'>;

export interface IDefaultTrainingExercise extends IBaseTrainingExercise {
	type: ExerciseTypes.Default;
}

export interface IAdditionalWeightTrainingExercise extends IBaseTrainingExercise {
	type: ExerciseTypes.WithAdditionalWeight;
}

export interface INegativeWeightTrainingExercise extends IBaseTrainingExercise {
	type: ExerciseTypes.WithNegativeWeight;
}

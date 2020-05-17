import { ExerciseTypes } from '@model/exercise.model';
import { BigSource } from 'big.js';

export interface ISeries {
	_id: string;

	repeats: BigSource;
	weight: BigSource;
}

export interface IBaseTrainingExercise {
	_id: string;
	exerciseId: string;

	type: ExerciseTypes;
	sequenceNumber: number;
	userWeight: BigSource;

	seriesList: ISeries[];
}

export interface IDefaultTrainingExercise extends IBaseTrainingExercise {
	type: ExerciseTypes.Default;
}

export interface IAdditionalWeightTrainingExercise extends IBaseTrainingExercise {
	type: ExerciseTypes.WithAdditionalWeight;
}

export interface INegativeWeightTrainingExercise extends IBaseTrainingExercise {
	type: ExerciseTypes.WithNegativeWeight;
}

import { PropType } from '@util/type.util';
import { ExerciseModel, ExerciseTypes } from '@model/exercise.model';
import { BigSource } from 'big.js';

export interface ISeries {
	sequenceNumber: number;

	repeats: BigSource;
	weight: BigSource;
}

export interface IBaseTrainingExercise {
	id: string;
	exerciseId: PropType<ExerciseModel, '_id'>;
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

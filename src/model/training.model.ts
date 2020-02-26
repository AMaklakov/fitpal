import { PropType } from '../util/type.util';
import { ExerciseModel } from '@model/exercise.model';

export interface SeriesModel {
	sequenceNumber: number;

	repeats: number;
	weight: number;
}

export interface TrainingExerciseModel {
	id: string;
	exerciseId: PropType<ExerciseModel, 'id'>;
	sequenceNumber: number;

	seriesList: SeriesModel[];
}

export interface TrainingModel {
	id: string;
	date: string;

	name: string;

	exerciseList: TrainingExerciseModel[];
}

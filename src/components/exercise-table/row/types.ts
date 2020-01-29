import { ExerciseModel } from '@model/exercise.model';

export interface ColumnModel {
	name: string;
	field: keyof ExerciseModel | 'total';
}

export interface RowModel {
	exercise: ExerciseModel;
}

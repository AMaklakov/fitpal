import { ExerciseModel } from '@model/exercise.model';

export interface CreateExercisePropsModel {
	modalVisible: { visible: boolean };
	exercise?: ExerciseModel;

	onSave: (e: ExerciseModel) => void;
}

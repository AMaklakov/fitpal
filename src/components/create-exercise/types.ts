import { ExerciseModel } from '@model/exercise.model';

export interface CreateExercisePropsModel {
	exercise?: ExerciseModel;

	onSave: (e: ExerciseModel) => void;

	visible: boolean;
	setVisible: (v: boolean) => void;
}

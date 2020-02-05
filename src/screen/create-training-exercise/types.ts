import { NavigationPropsModel } from '@model/navigation-props.model';
import { TrainingExerciseModel } from '@model/training.model';
import { ExerciseModel } from '@model/exercise.model';

export interface CreateExerciseScreenProps extends NavigationPropsModel {
	exerciseList: ExerciseModel[];

	saveAction: (trainingId: string, exercise: TrainingExerciseModel) => void;
	editAction: (trainingId: string, exercise: TrainingExerciseModel) => void;
}

export interface CreateExerciseProps {
	trainingExercise: TrainingExerciseModel;
	setTrainingExercise: (exercise: TrainingExerciseModel) => void;

	exerciseList: ExerciseModel[];

	onSave: () => void;
	onCancel: () => void;
}

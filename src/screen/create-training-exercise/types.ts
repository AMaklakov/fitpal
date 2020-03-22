import { ExerciseModel } from '../../model/exercise.model';
import { TrainingExerciseModel } from '../../model/training.model';

export interface CreateExerciseProps {
	trainingExercise: TrainingExerciseModel;
	setTrainingExercise: (exercise: TrainingExerciseModel) => void;

	exerciseList: ExerciseModel[];

	onSave: () => void;
	onCancel: () => void;
}

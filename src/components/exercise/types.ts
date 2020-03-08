import { ExerciseModel } from '../../model/exercise.model';
import { TrainingExerciseModel } from '../../model/training.model';

export interface TrainingExerciseProps {
	trainingExercise: TrainingExerciseModel;

	exerciseList: ExerciseModel[];

	onPress?: (trainingExercise: TrainingExerciseModel) => void;
	onLongPress?: (trainingExercise: TrainingExerciseModel) => void;
}

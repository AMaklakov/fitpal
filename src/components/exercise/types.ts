import { TrainingExerciseModel } from '@model/training.model';
import { ExerciseModel } from '@model/exercise.model';

export interface TrainingExerciseProps {
	trainingExercise: TrainingExerciseModel;

	exerciseList: ExerciseModel[];
}

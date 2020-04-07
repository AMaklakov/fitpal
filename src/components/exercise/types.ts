import { ExerciseModel } from '@model/exercise.model';
import { IBaseTrainingExercise } from '@model/training-exercise';

export interface TrainingExerciseProps {
	trainingExercise: IBaseTrainingExercise;

	exerciseList: ExerciseModel[];

	onPress?: (trainingExercise: IBaseTrainingExercise) => void;
	onLongPress?: (trainingExercise: IBaseTrainingExercise) => void;
}

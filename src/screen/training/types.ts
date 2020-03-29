import { TrainingExerciseModel, TrainingModel } from '../../model/training.model';
import { ExerciseModel } from '../../model/exercise.model';

export interface TrainingProps {
	training?: TrainingModel;
	changeTraining: (training: TrainingModel) => void;

	exercises: ExerciseModel[];

	addExerciseAction: (e?: TrainingExerciseModel) => void;
	removeExercise: (e: TrainingExerciseModel) => void;

	canEdit: boolean;
}

import { TrainingExerciseModel, TrainingModel } from '../../model/training.model';
import { ExerciseModel } from '../../model/exercise.model';

export interface ReorderTrainingExerciseProps {
	training: TrainingModel;
	changeTraining: (training: TrainingModel) => void;

	exercises: ExerciseModel[];
}

export interface TrainingProps {
	training?: TrainingModel;
	changeTraining: (training: TrainingModel) => void;

	exercises: ExerciseModel[];

	addExerciseAction: (e?: TrainingExerciseModel) => void;
	removeExercise: (e: TrainingExerciseModel) => void;

	canEdit: boolean;
}

export interface ShowTrainingProps {
	training: TrainingModel;
	exercises: ExerciseModel[];

	addExerciseAction: (e?: TrainingExerciseModel) => void;
	removeExercise: (e: TrainingExerciseModel) => void;
}

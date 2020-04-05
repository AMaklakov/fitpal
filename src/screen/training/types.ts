import { TrainingModel } from '@model/training.model';
import { ExerciseModel } from '@model/exercise.model';
import { IBaseTrainingExercise } from '@model/training-exercise';

export interface TrainingProps {
	training?: TrainingModel;
	changeTraining: (training: TrainingModel) => void;

	exercises: ExerciseModel[];

	addExerciseAction: (e?: IBaseTrainingExercise) => void;
	removeExercise: (e: IBaseTrainingExercise) => void;
	onUpdateTrainingName: (name: string) => void;

	canEdit: boolean;
}

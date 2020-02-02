import { TrainingModel } from '@model/training.model';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { ExerciseModel } from '@model/exercise.model';

export interface TrainingScreenProps extends NavigationPropsModel {
	training?: TrainingModel;
	exercises: ExerciseModel[];
}

export interface TrainingProps {
	training?: TrainingModel;
	exercises: ExerciseModel[];

	addExerciseAction: () => void;

	canEdit: boolean;
}

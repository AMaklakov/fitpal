import { TrainingExerciseModel, TrainingModel } from '@model/training.model';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { ExerciseModel } from '@model/exercise.model';
import { PropType } from '../../util/type.util';

export interface TrainingScreenProps extends NavigationPropsModel {
	training?: TrainingModel;
	exercises: ExerciseModel[];

	dispatchRemoveTrainingExercise: (
		e: TrainingExerciseModel,
		trainingId: PropType<TrainingModel, 'id'>
	) => void;
}

export interface TrainingProps {
	training?: TrainingModel;
	exercises: ExerciseModel[];

	addExerciseAction: (e?: TrainingExerciseModel) => void;
	removeExercise: (e: TrainingExerciseModel) => void;

	canEdit: boolean;
}

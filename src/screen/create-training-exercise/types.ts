import { NavigationPropsModel } from '../../model/navigation-props.model';
import { ExerciseModel } from '../../model/exercise.model';
import { TrainingExerciseModel } from '../../model/training.model';

export interface CreateExerciseScreenProps extends NavigationPropsModel {
	exerciseList: ExerciseModel[];

	saveAction: (trainingId: string, exercise: TrainingExerciseModel) => void;
	editAction: (trainingId: string, exercise: TrainingExerciseModel) => void;
}

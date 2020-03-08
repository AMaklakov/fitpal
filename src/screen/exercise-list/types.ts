import { ExerciseModel } from '../../model/exercise.model';
import { NavigationPropsModel } from '../../model/navigation-props.model';

export interface ExerciseListScreenProps extends NavigationPropsModel {
	exerciseList: ExerciseModel[];
}

export interface ExerciseListProps {
	exerciseList: ExerciseModel[];

	goToCreateExercise: () => void;
	onExercisePress: (exercise: ExerciseModel) => void;
}

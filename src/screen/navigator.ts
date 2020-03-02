import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './home';
import ExerciseListScreen from './exercise-list';
import CreateTrainingExerciseScreen from './create-training-exercise';
import { CalendarScreen } from './calendar/calendar';
import { TrainingScreen } from './training';
import { ExerciseScreen } from './exercise/exercise.screen';
import { ExerciseCreateScreen } from './exercise-create/exercise-create.screen';

export enum Routes {
	Home = 'Home',

	Calendar = 'Calendar',
	Training = 'Training',
	CreateTrainingExercise = 'CreateTrainingExercise',

	ExerciseList = 'ExerciseList',
	Exercise = 'Exercise',
	ExerciseCreate = 'ExerciseCreate',
}

const AppNavigator = createStackNavigator(
	{
		[Routes.Home]: { screen: HomeScreen },
		[Routes.Calendar]: { screen: CalendarScreen },
		[Routes.Training]: { screen: TrainingScreen },
		[Routes.CreateTrainingExercise]: { screen: CreateTrainingExerciseScreen },

		[Routes.ExerciseList]: { screen: ExerciseListScreen },
		[Routes.Exercise]: { screen: ExerciseScreen },
		[Routes.ExerciseCreate]: { screen: ExerciseCreateScreen },
	},
	{
		initialRouteName: Routes.Home,
		headerMode: 'none',
	}
);

export default createAppContainer(AppNavigator);

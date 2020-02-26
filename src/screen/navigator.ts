import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './home';
import ExerciseListScreen from './exercise-list';
import CreateTrainingExerciseScreen from './create-training-exercise';
import { CalendarScreen } from './calendar/calendar';
import { TrainingScreen } from './training';

export enum Routes {
	Home = 'Home',

	Calendar = 'Calendar',
	Training = 'Training',
	CreateTrainingExercise = 'CreateTrainingExercise',

	ExerciseList = 'ExerciseList',
}

const AppNavigator = createStackNavigator(
	{
		[Routes.Home]: { screen: HomeScreen },
		[Routes.Calendar]: { screen: CalendarScreen },
		[Routes.Training]: { screen: TrainingScreen },
		[Routes.ExerciseList]: { screen: ExerciseListScreen },
		[Routes.CreateTrainingExercise]: { screen: CreateTrainingExerciseScreen },
	},
	{
		initialRouteName: Routes.Home,
		headerMode: 'none',
	}
);

export default createAppContainer(AppNavigator);

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import TrainingScreen from './training';
import HomeScreen from './home';
import ExerciseListScreen from './exercise-list';
import CreateTrainingExerciseScreen from './create-training-exercise';

export enum Routes {
	Home = 'Home',

	Training = 'Training',
	CreateTrainingExercise = 'CreateTrainingExercise',

	ExerciseList = 'ExerciseList',
}

const AppNavigator = createStackNavigator(
	{
		[Routes.Home]: { screen: HomeScreen },
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

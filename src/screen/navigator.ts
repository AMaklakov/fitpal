import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { CalendarScreen } from '@screen/calendar/calendar';
import { TrainingScreen } from '@screen/training';
import { ExerciseListScreen } from '@screen/exercise-list';
import { CreateTrainingExerciseScreen } from '@screen/create-training-exercise';
import { ExerciseScreen } from '@screen/exercise/exercise.screen';
import { ExerciseCreateScreen } from '@screen/exercise-create/exercise-create.screen';
import { SettingsScreen } from '@screen/settings/settings';

export enum Routes {
	Settings = 'Settings',

	Calendar = 'Calendar',
	Training = 'Training',
	CreateTrainingExercise = 'CreateTrainingExercise',

	ExerciseList = 'ExerciseList',
	Exercise = 'Exercise',
	ExerciseCreate = 'ExerciseCreate',
}

const AppNavigator = createStackNavigator(
	{
		[Routes.Settings]: { screen: SettingsScreen },
		[Routes.Calendar]: { screen: CalendarScreen },
		[Routes.Training]: { screen: TrainingScreen },
		[Routes.CreateTrainingExercise]: { screen: CreateTrainingExerciseScreen },

		[Routes.ExerciseList]: { screen: ExerciseListScreen },
		[Routes.Exercise]: { screen: ExerciseScreen },
		[Routes.ExerciseCreate]: { screen: ExerciseCreateScreen },
	},
	{
		initialRouteName: Routes.Calendar,
		headerMode: 'none',
	}
);

export default createAppContainer(AppNavigator);

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { CalendarScreen } from '@screen/calendar/calendar';
import { TrainingScreen } from '@screen/training';
import { ExerciseListScreen } from '@screen/exercise-list';
import { CreateTrainingExerciseScreen } from '@screen/create-training-exercise';
import { ExerciseScreen } from '@screen/exercise/exercise.screen';
import { ExerciseCreateScreen } from '@screen/exercise-create/exercise-create.screen';
import { SettingsScreen } from '@screen/settings/settings';
import { AuthLoadingScreen } from '@screen/auth/auth-loading/auth-loading.screen';
import { LoginScreen } from '@screen/auth/login/login.screen';
import { RegistrationScreen } from '@screen/auth/registration/registration.screen';
import { StatisticsScreen } from '@screen/statistics/statistics.screen';
import { TrainingPlayDetailsScreen } from '@screen/training-play/details.screen';
import { TrainingPlayProgressScreen } from '@screen/training-play/progress.screen';
import { TrainingPlayResultScreen } from '@screen/training-play/results.screen';
import { Routes } from '@screen/routes';

const AppStack = createStackNavigator(
	{
		[Routes.Settings]: { screen: SettingsScreen },
		[Routes.Calendar]: { screen: CalendarScreen },
		[Routes.Training]: { screen: TrainingScreen },
		[Routes.CreateTrainingExercise]: { screen: CreateTrainingExerciseScreen },
		[Routes.Statistics]: { screen: StatisticsScreen },

		[Routes.ExerciseList]: { screen: ExerciseListScreen },
		[Routes.Exercise]: { screen: ExerciseScreen },
		[Routes.ExerciseCreate]: { screen: ExerciseCreateScreen },

		[Routes.TrainingPlayDetails]: { screen: TrainingPlayDetailsScreen },
		[Routes.TrainingPlayProgress]: { screen: TrainingPlayProgressScreen },
		[Routes.TrainingPlayResult]: { screen: TrainingPlayResultScreen },
	},
	{
		initialRouteName: Routes.Calendar,
		headerMode: 'none',
	}
);

const AuthStack = createStackNavigator(
	{
		[Routes.Login]: { screen: LoginScreen },
		[Routes.Registration]: { screen: RegistrationScreen },
	},
	{
		initialRouteName: Routes.Login,
		headerMode: 'none',
	}
);

const SwitchNavigator = createSwitchNavigator(
	{
		[Routes.AuthZone]: AuthStack,
		[Routes.AppZone]: AppStack,
		[Routes.LoadingAuthZone]: AuthLoadingScreen,
	},
	{
		initialRouteName: Routes.LoadingAuthZone,
	}
);

export const Navigator = createAppContainer(SwitchNavigator);

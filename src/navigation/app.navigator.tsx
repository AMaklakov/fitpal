import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '@navigation/routes';
import { SettingsScreen } from '@screen/settings/settings';
import { CalendarScreen } from '@screen/calendar/calendar';
import { TrainingScreen } from '@screen/training';
import { CreateTrainingExerciseScreen } from '@screen/create-training-exercise';
import { StatisticsScreen } from '@screen/statistics/statistics.screen';
import { ExerciseListScreen } from '@screen/exercise-list';
import { ExerciseScreen } from '@screen/exercise/exercise.screen';
import { ExerciseCreateScreen } from '@screen/exercise-create/exercise-create.screen';
import { TrainingPlayDetailsScreen } from '@screen/training-play/details.screen';
import { TrainingPlayProgressScreen } from '@screen/training-play/progress.screen';
import { TrainingPlayResultScreen } from '@screen/training-play/results.screen';

const Stack = createStackNavigator();

export const AppStack = () => {
	return (
		<Stack.Navigator initialRouteName={Routes.Calendar} headerMode="none">
			<Stack.Screen name={Routes.Settings} component={SettingsScreen} />
			<Stack.Screen name={Routes.Calendar} component={CalendarScreen} />
			<Stack.Screen name={Routes.Training} component={TrainingScreen} />
			<Stack.Screen name={Routes.CreateTrainingExercise} component={CreateTrainingExerciseScreen} />
			<Stack.Screen name={Routes.Statistics} component={StatisticsScreen} />

			<Stack.Screen name={Routes.ExerciseList} component={ExerciseListScreen} />
			<Stack.Screen name={Routes.Exercise} component={ExerciseScreen} />
			<Stack.Screen name={Routes.ExerciseCreate} component={ExerciseCreateScreen} />

			<Stack.Screen name={Routes.TrainingPlayDetails} component={TrainingPlayDetailsScreen} />
			<Stack.Screen name={Routes.TrainingPlayProgress} component={TrainingPlayProgressScreen} />
			<Stack.Screen name={Routes.TrainingPlayResult} component={TrainingPlayResultScreen} />
		</Stack.Navigator>
	);
};

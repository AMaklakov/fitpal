export enum Routes {
	// ----- AUTH

	Login = 'Login',
	Registration = 'Registration',

	// ----- APP

	Settings = 'Settings',

	Calendar = 'Calendar',
	Training = 'Training',
	CreateTrainingExercise = 'CreateTrainingExercise',
	Statistics = 'Statistics',

	ExerciseList = 'ExerciseList',
	Exercise = 'Exercise',
	ExerciseCreate = 'ExerciseCreate',

	TrainingPlayDetails = 'TrainingPlayDetails',
	TrainingPlayProgress = 'TrainingPlayProgress',
	TrainingPlayResult = 'TrainingPlayResult',
}

const APP_ROUTES = [
	Routes.Settings,
	Routes.Calendar,
	Routes.Training,
	Routes.CreateTrainingExercise,
	Routes.Statistics,
	Routes.ExerciseList,
	Routes.Exercise,
	Routes.ExerciseCreate,
	Routes.TrainingPlayDetails,
	Routes.TrainingPlayProgress,
	Routes.TrainingPlayResult,
].reduce((buff, route) => ({ ...buff, [route]: 'APP' as 'APP' }), {} as { [key in Partial<Routes>]: 'APP' });

const AUTH_ROUTES = [Routes.Registration, Routes.Login].reduce(
	(buff, route) => ({ ...buff, [route]: 'AUTH' as 'AUTH' }),
	{} as { [key in Partial<Routes>]: 'AUTH' }
);

export const ROUTES_MAP: { [key in Routes]: 'APP' | 'AUTH' } = { ...APP_ROUTES, ...AUTH_ROUTES };

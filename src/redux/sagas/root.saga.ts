import { all, takeLatest } from 'redux-saga/effects';
import { getCovidData } from '@redux/sagas/covid.saga';
import { CovidAction } from '@redux/action/covid.action';
import {
	addTrainingExercise,
	createTraining,
	deleteTrainingById,
	getTrainingById,
	getTrainingsByDate,
	updateTrainingById,
} from '@redux/sagas/training.saga';
import { TRAINING_ACTIONS, TrainingActions } from '@redux/action/training-exercise.action';
import { UserActions } from '@redux/action/user.action';
import { login, logout, register } from '@redux/sagas/user.saga';
import { ExerciseActions } from '@redux/action/exercise.action';
import { createExercise, fetchExercises } from '@redux/sagas/exercise.saga';

function* actionWatcher() {
	yield takeLatest(UserActions.LoginStart, login);
	yield takeLatest(UserActions.RegisterStart, register);
	yield takeLatest(UserActions.LogoutStart, logout);

	yield takeLatest(CovidAction.FetchStart, getCovidData);

	yield takeLatest(TrainingActions.FetchTrainingsByDateStart, getTrainingsByDate);
	yield takeLatest(TrainingActions.FetchTrainingByIdStart, getTrainingById);
	yield takeLatest(TrainingActions.CreateTrainingStart, createTraining);
	yield takeLatest(TrainingActions.DeleteTrainingByIdStart, deleteTrainingById);
	yield takeLatest(TrainingActions.UpdateTrainingStart, updateTrainingById);

	yield takeLatest(TRAINING_ACTIONS.EXERCISE.ADD.START, addTrainingExercise);

	yield takeLatest(ExerciseActions.CreateStart, createExercise);
	yield takeLatest(ExerciseActions.FetchStart, fetchExercises);
}

export function* rootSaga() {
	yield all([actionWatcher()]);
}

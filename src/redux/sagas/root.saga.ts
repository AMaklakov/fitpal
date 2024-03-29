import { all, takeLatest } from 'redux-saga/effects';
import { getCovidData } from '@redux/sagas/covid.saga';
import { COVID_ACTIONS } from '@redux/action/covid.action';
import {
	addTrainingExercise,
	createTraining,
	deleteTrainingById,
	editTrainingExercise,
	getTrainingById,
	getTrainingsByDate,
	getTrainingsByDateRange,
	removeTrainingExercise,
	updateTrainingById,
} from '@redux/sagas/training.saga';
import { TRAINING_ACTIONS } from '@redux/action/training-exercise.action';
import { UserActions } from '@redux/action/user.action';
import { login, logout, register } from '@redux/sagas/user.saga';
import { EXERCISE_ACTIONS, ExerciseActions } from '@redux/action/exercise.action';
import { createExercise, fetchExercises, updateExercise } from '@redux/sagas/exercise.saga';

function* actionWatcher() {
	yield takeLatest(UserActions.LoginStart, login);
	yield takeLatest(UserActions.RegisterStart, register);
	yield takeLatest(UserActions.LogoutStart, logout);

	yield takeLatest(COVID_ACTIONS.FETCH.START, getCovidData);

	yield takeLatest(TRAINING_ACTIONS.FETCH_BY_DATE_RANGE.START, getTrainingsByDateRange);
	yield takeLatest(TRAINING_ACTIONS.FETCH_BY_DATE.START, getTrainingsByDate);
	yield takeLatest(TRAINING_ACTIONS.FETCH_BY_ID.START, getTrainingById);
	yield takeLatest(TRAINING_ACTIONS.CREATE.START, createTraining);
	yield takeLatest(TRAINING_ACTIONS.DELETE.START, deleteTrainingById);
	yield takeLatest(TRAINING_ACTIONS.UPDATE.START, updateTrainingById);

	yield takeLatest(TRAINING_ACTIONS.EXERCISE.ADD.START, addTrainingExercise);
	yield takeLatest(TRAINING_ACTIONS.EXERCISE.EDIT.START, editTrainingExercise);
	yield takeLatest(TRAINING_ACTIONS.EXERCISE.REMOVE.START, removeTrainingExercise);

	yield takeLatest(ExerciseActions.CreateStart, createExercise);
	yield takeLatest(ExerciseActions.FetchStart, fetchExercises);
	yield takeLatest(EXERCISE_ACTIONS.UPDATE.START, updateExercise);
}

export function* rootSaga() {
	yield all([actionWatcher()]);
}

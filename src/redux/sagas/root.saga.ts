import { all, takeLatest } from 'redux-saga/effects';
import { getCovidData } from '@redux/sagas/covid.saga';
import { CovidAction } from '@redux/action/covid.action';
import {
	createTraining,
	deleteTrainingById,
	getTrainingById,
	getTrainingsByDate,
	updateTrainingById,
} from '@redux/sagas/training.saga';
import { TrainingActions } from '@redux/action/training-exercise.action';
import { UserActions } from '@redux/action/user.action';
import { login } from '@redux/sagas/user.saga';

function* actionWatcher() {
	yield takeLatest(UserActions.LoginStart, login);

	yield takeLatest(CovidAction.FetchStart, getCovidData);

	yield takeLatest(TrainingActions.FetchTrainingsByDateStart, getTrainingsByDate);
	yield takeLatest(TrainingActions.FetchTrainingByIdStart, getTrainingById);
	yield takeLatest(TrainingActions.CreateTrainingStart, createTraining);
	yield takeLatest(TrainingActions.DeleteTrainingByIdStart, deleteTrainingById);
	yield takeLatest(TrainingActions.UpdateTrainingStart, updateTrainingById);
}

export function* rootSaga() {
	yield all([actionWatcher()]);
}

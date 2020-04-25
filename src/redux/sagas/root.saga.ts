import { all, takeLatest } from 'redux-saga/effects';
import { getCovidData } from '@redux/sagas/covid.saga';
import { CovidAction } from '@redux/action/covid.action';
import { getTrainingById, getTrainingsByDate } from '@redux/sagas/training.saga';
import { TrainingActions } from '@redux/action/training-exercise.action';

function* actionWatcher() {
	yield takeLatest(CovidAction.FetchStart, getCovidData);
	yield takeLatest(TrainingActions.FetchTrainingsByDateStart, getTrainingsByDate);
	yield takeLatest(TrainingActions.FetchTrainingByIdStart, getTrainingById);
}

export function* rootSaga() {
	yield all([actionWatcher()]);
}
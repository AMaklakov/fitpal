import { all, takeLatest } from 'redux-saga/effects';
import { getCovidData } from '@redux/sagas/covid.saga';
import { CovidAction } from '@redux/action/covid.action';

function* actionWatcher() {
	yield takeLatest(CovidAction.FetchStart, getCovidData);
}
export function* rootSaga() {
	yield all([actionWatcher()]);
}

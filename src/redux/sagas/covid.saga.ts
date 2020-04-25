import { put } from 'redux-saga/effects';
import { setErrorCovidData, updateCovidData } from '@redux/action/covid.action';
import { axios } from '@util/axios';

export function* getCovidData() {
	try {
		const { data } = yield axios.get(`covid-statistics/country/latest`);
		yield put(updateCovidData(data));
	} catch (e) {
		yield put(setErrorCovidData(e));
	}
}

import { put } from 'redux-saga/effects';
import { COVID_ACTION_CREATORS } from '@redux/action/covid.action';
import { axios } from '@util/axios';

export function* getCovidData() {
	try {
		const { data } = yield axios.get(`covid-statistics/country/latest`);
		yield put(COVID_ACTION_CREATORS.FETCH.SUCCESS(data));
	} catch (e) {
		yield put(COVID_ACTION_CREATORS.FETCH.ERROR(e));
	}
}

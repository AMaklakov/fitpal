import { put } from 'redux-saga/effects';
import { axios } from '@util/axios';
import { Moment } from 'moment';
import {
	fetchTrainingByIdError,
	fetchTrainingByIdSuccess,
	fetchTrainingsByDateError,
	fetchTrainingsByDateSuccess,
} from '@redux/action/training.action';
import { DataAction } from '@model/data-action.model';

export function* getTrainingsByDate(action: DataAction<Moment>) {
	try {
		const { data } = yield axios.get(`trainings?date=${action.payload.toISOString()}`);
		yield put(fetchTrainingsByDateSuccess(data));
	} catch (e) {
		yield put(fetchTrainingsByDateError(e));
	}
}

export function* getTrainingById(action: DataAction<string>) {
	try {
		const { data } = yield axios.get(`trainings/${action.payload}`);
		yield put(fetchTrainingByIdSuccess(data));
	} catch (e) {
		yield put(fetchTrainingByIdError(e));
	}
}

// export function* createTraining(training: TrainingModel) {
// 	try {
// 		const { data } = yield axios.get(`covid-statistics/country/latest`);
// 		yield put(updateCovidData(data));
// 	} catch (e) {
// 		yield put(setErrorCovidData(e));
// 	}
// }
//
// export function* deleteTrainingById(id: PropType<TrainingModel, 'id'>) {
// 	try {
// 		const { data } = yield axios.get(`covid-statistics/country/latest`);
// 		yield put(updateCovidData(data));
// 	} catch (e) {
// 		yield put(setErrorCovidData(e));
// 	}
// }

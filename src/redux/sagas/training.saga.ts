import { put } from 'redux-saga/effects';
import { axios } from '@util/axios';
import { Moment } from 'moment';
import {
	createTrainingError,
	createTrainingSuccess,
	fetchTrainingByIdError,
	fetchTrainingByIdSuccess,
	fetchTrainingsByDateError,
	fetchTrainingsByDateSuccess,
} from '@redux/action/training.action';
import { DataAction } from '@model/data-action.model';
import { ICreateTraining, isCreateTrainingValid, isTrainingValid } from '@model/training.model';
import { cleanUpAction } from '@redux/action/calendar-training-modal.action';

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

export function* createTraining(action: DataAction<ICreateTraining>) {
	try {
		const isValid = isCreateTrainingValid(action.payload);

		if (!isValid) {
			throw `Training is not valid`;
		}

		const { data } = yield axios.post(`trainings`, { training: action.payload });
		const training = data?.training;

		if (!isTrainingValid(training)) {
			throw new Error(`Training from backend is not valid`);
		}

		yield put(createTrainingSuccess(training));
		yield put(cleanUpAction());
	} catch (e) {
		yield put(createTrainingError(e));
	}
}
//
// export function* deleteTrainingById(id: PropType<TrainingModel, 'id'>) {
// 	try {
// 		const { data } = yield axios.get(`covid-statistics/country/latest`);
// 		yield put(updateCovidData(data));
// 	} catch (e) {
// 		yield put(setErrorCovidData(e));
// 	}
// }

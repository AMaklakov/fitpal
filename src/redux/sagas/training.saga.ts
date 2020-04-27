import { put } from 'redux-saga/effects';
import { axios } from '@util/axios';
import { Moment } from 'moment';
import {
	createTrainingError,
	createTrainingSuccess,
	deleteTrainingByIdError,
	deleteTrainingByIdSuccess,
	fetchTrainingByIdError,
	fetchTrainingByIdSuccess,
	fetchTrainingsByDateError,
	fetchTrainingsByDateSuccess,
	updateTrainingError,
	updateTrainingSuccess,
} from '@redux/action/training.action';
import { DataAction } from '@model/data-action.model';
import { ICreateTraining, isCreateTrainingValid, isTrainingValid, TrainingModel } from '@model/training.model';
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

export function* deleteTrainingById(action: DataAction<string>) {
	try {
		yield axios.delete(`/trainings/${action.payload}`);
		yield put(deleteTrainingByIdSuccess(action.payload));
	} catch (e) {
		yield put(deleteTrainingByIdError(e));
	}
}

export function* updateTrainingById(action: DataAction<TrainingModel>) {
	try {
		if (!isTrainingValid(action.payload)) {
			throw `Training is not valid`;
		}

		const res = yield axios.put(`/trainings/${action.payload.id}`, {
			training: action.payload,
		});

		const trainingFromServer = res?.data?.training;

		if (!isTrainingValid(trainingFromServer)) {
			throw `Training from server is not valid`;
		}

		yield put(updateTrainingSuccess(trainingFromServer));
	} catch (e) {
		yield put(updateTrainingError(e));
	}
}

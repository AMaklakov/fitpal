import { put, select } from 'redux-saga/effects';
import { axios } from '@util/axios';
import { Moment } from 'moment';
import {
	createTrainingError,
	createTrainingSuccess,
	deleteTrainingByIdError,
	deleteTrainingByIdSuccess,
	fetchTrainingByIdError,
	fetchTrainingByIdSuccess,
	updateTrainingError,
	updateTrainingSuccess,
} from '@redux/action/training.action';
import { DataAction } from '@model/data-action.model';
import { ICreateTraining, isCreateTrainingValid, isTrainingValid, TrainingModel } from '@model/training.model';
import { cleanUpAction } from '@redux/action/calendar-training-modal.action';
import {
	IAddExerciseStart,
	IEditExerciseStart,
	IRemoveExerciseStart,
	TRAINING_ACTION_CREATORS,
} from '@redux/action/training-exercise.action';
import { validateTrainingExercise } from '@util/training-exercise.util';
import { getTrainingById as getTrainingByIdSlector } from '@redux/selector/training.selector';
import { StoreModel } from '@redux/store';
import { navigate } from '@util/navigation.util';
import { Routes } from '@screen/navigator';

export function* getTrainingsByDate(action: DataAction<Moment>) {
	try {
		const { data } = yield axios.get(`trainings?date=${action.payload.toISOString()}`);
		yield put(TRAINING_ACTION_CREATORS.FETCH_BY_DATE.SUCCESS(data));
	} catch (e) {
		yield put(TRAINING_ACTION_CREATORS.FETCH_BY_DATE.ERROR(e));
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

		const res = yield axios.put(`/trainings/${action.payload._id}`, {
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

// ======================== Training Exercises

export function* addTrainingExercise(action: DataAction<IAddExerciseStart>) {
	try {
		const trainingId = action.payload.trainingId;
		const newExercise = action.payload.exercise;

		if (!trainingId || !validateTrainingExercise(newExercise)) {
			throw `Not valid action payload`;
		}

		const training: TrainingModel = yield select((state: StoreModel) => getTrainingByIdSlector(state, trainingId));

		if (!training) {
			throw `Not existing trainingId`;
		}

		training.exerciseList = [...training.exerciseList, newExercise];

		const res = yield axios.put(`/trainings/${trainingId}`, { training });

		const trainingFromServer = res?.data?.training;

		if (!isTrainingValid(trainingFromServer)) {
			throw `Training from server is not valid`;
		}

		yield put(TRAINING_ACTION_CREATORS.EXERCISE.ADD.SUCCESS(trainingFromServer));
		yield navigate(Routes.Training, { trainingId: training._id });
	} catch (e) {
		yield put(TRAINING_ACTION_CREATORS.EXERCISE.ADD.ERROR(e));
	}
}

export function* editTrainingExercise(action: DataAction<IEditExerciseStart>) {
	try {
		const trainingId = action.payload.trainingId;
		const newExercise = action.payload.exercise;

		if (!trainingId || !validateTrainingExercise(newExercise)) {
			throw `Not valid action payload`;
		}

		const training: TrainingModel = yield select((state: StoreModel) => getTrainingByIdSlector(state, trainingId));

		if (!training) {
			throw `Not existing trainingId`;
		}

		training.exerciseList = training.exerciseList.map(e => {
			if (e._id === newExercise._id) {
				return newExercise;
			}

			return e;
		});

		const res = yield axios.put(`/trainings/${trainingId}`, { training });

		const trainingFromServer = res?.data?.training;

		if (!isTrainingValid(trainingFromServer)) {
			throw `Training from server is not valid`;
		}

		yield put(TRAINING_ACTION_CREATORS.EXERCISE.EDIT.SUCCESS(trainingFromServer));
		yield navigate(Routes.Training, { trainingId: training._id });
	} catch (e) {
		yield put(TRAINING_ACTION_CREATORS.EXERCISE.EDIT.ERROR(e));
	}
}

export function* removeTrainingExercise(action: DataAction<IRemoveExerciseStart>) {
	try {
		const trainingId = action.payload.trainingId;
		const exerciseId = action.payload.exerciseId;

		if (!trainingId || !exerciseId) {
			throw `Not valid action payload`;
		}

		const training: TrainingModel = yield select((state: StoreModel) => getTrainingByIdSlector(state, trainingId));

		if (!training) {
			throw `Not existing trainingId`;
		}

		training.exerciseList = training.exerciseList.filter(e => e._id !== exerciseId);

		const res = yield axios.put(`/trainings/${trainingId}`, { training });
		const trainingFromServer = res?.data?.training;

		if (!isTrainingValid(trainingFromServer)) {
			throw `Training from server is not valid`;
		}

		yield put(TRAINING_ACTION_CREATORS.EXERCISE.REMOVE.SUCCESS(trainingFromServer));
	} catch (e) {
		yield put(TRAINING_ACTION_CREATORS.EXERCISE.REMOVE.ERROR(e));
	}
}

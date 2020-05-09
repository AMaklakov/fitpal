import { put } from 'redux-saga/effects';
import { axios } from '@util/axios';
import { DataAction } from '@model/data-action.model';
import { ICreateExercise, isExerciseValid } from '@model/exercise.model';
import { Alert } from 'react-native';
import {
	createExerciseError,
	createExerciseSuccess,
	fetchExercisesError,
	fetchExercisesSuccess,
} from '@redux/action/exercise.action';

export function* createExercise(action: DataAction<ICreateExercise>) {
	try {
		if (!isExerciseValid(action.payload)) {
			Alert.alert('Exercise is not valid!');
			throw `Exercise is not valid`;
		}

		const { data } = yield axios.post(`exercises`, { exercise: action.payload });

		yield put(createExerciseSuccess(data?.exercise));
	} catch (e) {
		yield put(createExerciseError(e));
	}
}

export function* fetchExercises() {
	try {
		const { data } = yield axios.get(`exercises`);

		const exercises = data.exercises;

		yield put(fetchExercisesSuccess(exercises));
	} catch (e) {
		yield put(fetchExercisesError(e));
	}
}

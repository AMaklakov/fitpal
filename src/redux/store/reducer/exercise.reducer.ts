import { Action, Reducer } from 'redux';
import { ExerciseModel } from '@model/exercise.model';

export interface ExerciseStateModel {
	list: ExerciseModel[];
}

const DFEAULT_STATE: ExerciseStateModel = {
	list: [
		{ id: '1', name: 'Жим лежа' },
		{ id: '2', name: 'Бабочка' },
		{ id: '3', name: 'Приседания со штангой' },
		{ id: '4', name: 'Отжимания на брусьях' },
	],
};

const exercise: Reducer<ExerciseStateModel> = (
	state: ExerciseStateModel = DFEAULT_STATE,
	action: Action
) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default exercise;

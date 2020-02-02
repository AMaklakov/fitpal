import { Action, Reducer } from 'redux';
import { ExerciseModel } from '@model/exercise.model';
import { generateId } from '../../../util/uuid.util';

export interface ExerciseStateModel {
	list: ExerciseModel[];
}

const DFEAULT_STATE: ExerciseStateModel = {
	list: [
		{ id: generateId(), name: 'Жим лежа' },
		{ id: generateId(), name: 'Бабочка' },
		{ id: generateId(), name: 'Приседания со штангой' },
		{ id: generateId(), name: 'Отжимания на брусьях' },
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

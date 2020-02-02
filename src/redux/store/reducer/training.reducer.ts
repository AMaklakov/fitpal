import { Action, Reducer } from 'redux';
import { TrainingModel } from '@model/training.model';
import { generateId } from '../../../util/uuid.util';
import { getCurrentDate } from '../../../util/date.util';
import { CreateTrainingExerciseByTrainingIdAction, TrainingActions } from '../../action/training.action';

export interface TrainingStateModel {
	list: TrainingModel[];
}

const DFEAULT_STATE: TrainingStateModel = {
	list: [
		{
			id: generateId(),
			date: getCurrentDate(),
			exerciseList: [],
		},
	],
};

const createTrainingExerciseByTrainingId = (
	state: TrainingStateModel,
	action: CreateTrainingExerciseByTrainingIdAction
): TrainingStateModel => {
	const { exercise, trainingId } = action.payload;

	return {
		...state,
		list: state.list.map(item => {
			if (item.id === trainingId) {
				item = {
					...item,
					exerciseList: [...item.exerciseList, exercise],
				};
			}

			return item;
		}),
	};
};

const training: Reducer<TrainingStateModel> = (
	state: TrainingStateModel = DFEAULT_STATE,
	action: Action<TrainingActions>
): TrainingStateModel => {
	switch (action.type) {
		case TrainingActions.CreateTrainingExerciseByTrainingId:
			return createTrainingExerciseByTrainingId(
				state,
				action as CreateTrainingExerciseByTrainingIdAction
			);
		default:
			return state;
	}
};

export default training;

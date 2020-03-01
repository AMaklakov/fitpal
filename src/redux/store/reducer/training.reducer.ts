import { Action, Reducer } from 'redux';
import { TrainingModel } from '@model/training.model';
import { generateId } from '../../../util/uuid.util';
import { getCurrentDate } from '../../../util/date.util';
import {
	ChangeTrainingAction,
	DeleteTrainingAction,
	TrainingActions,
	TrainingExerciseAction,
} from '../../action/training-exercise.action';

export interface TrainingStateModel {
	list: TrainingModel[];
}

const DEFAULT_STATE: TrainingStateModel = {
	list: [
		{
			id: generateId(),
			name: 'Training today',
			date: getCurrentDate(),
			exerciseList: [],
		},
		{
			id: generateId(),
			name: 'Training today 2',
			date: getCurrentDate(),
			exerciseList: [],
		},
	],
};

const createTrainingExerciseByTrainingId = (
	state: TrainingStateModel,
	action: TrainingExerciseAction
): TrainingStateModel => {
	const { exercise, trainingId } = action.payload;

	const newExercise = {
		...exercise,
		sequenceNumber: state.list.length + 1,
	};

	return {
		...state,
		list: state.list.map(item => {
			if (item.id === trainingId) {
				item = {
					...item,
					exerciseList: [...item.exerciseList, newExercise],
				};
			}

			return item;
		}),
	};
};

const editTrainingExerciseByTrainingId = (
	state: TrainingStateModel,
	action: TrainingExerciseAction
): TrainingStateModel => {
	const { exercise, trainingId } = action.payload;

	return {
		...state,
		list: state.list.map(item => {
			if (item.id === trainingId) {
				item = {
					...item,
					exerciseList: [
						...item.exerciseList.map(x => {
							if (x.sequenceNumber === exercise.sequenceNumber) {
								x = exercise;
							}

							return { ...x };
						}),
					],
				};
			}

			return item;
		}),
	};
};

const deleteTrainingExerciseByTrainingId = (
	state: TrainingStateModel,
	action: TrainingExerciseAction
): TrainingStateModel => {
	const { exercise, trainingId } = action.payload;

	return {
		...state,
		list: state.list.map(item => {
			if (item.id === trainingId) {
				item = {
					...item,
					exerciseList: [
						...item.exerciseList.filter(x => x.id !== exercise.id).map(x => ({ ...x })),
					],
				};
			}

			return item;
		}),
	};
};

const changeTraining = (
	state: TrainingStateModel,
	{ payload: { training } }: ChangeTrainingAction
): TrainingStateModel => {
	return {
		...state,
		list: [
			...state.list.map(t => {
				if (t.id === training.id) {
					return {
						...training,
						exerciseList: [...training.exerciseList],
					};
				}

				return { ...t };
			}),
		],
	};
};

const deleteTrainingById = (
	state: TrainingStateModel,
	{ payload: { trainingId } }: DeleteTrainingAction
): TrainingStateModel => {
	return {
		...state,
		list: state.list.filter(t => t.id !== trainingId),
	};
};

const training: Reducer<TrainingStateModel> = (
	state: TrainingStateModel = DEFAULT_STATE,
	action: Action<TrainingActions>
): TrainingStateModel => {
	switch (action.type) {
		case TrainingActions.CreateTrainingExerciseByTrainingId:
			return createTrainingExerciseByTrainingId(state, action as TrainingExerciseAction);

		case TrainingActions.EditTrainingExerciseByTrainingId:
			return editTrainingExerciseByTrainingId(state, action as TrainingExerciseAction);

		case TrainingActions.DeleteTrainingExerciseByTrainingId:
			return deleteTrainingExerciseByTrainingId(state, action as TrainingExerciseAction);

		case TrainingActions.ChangeTraining:
			return changeTraining(state, action as ChangeTrainingAction);

		case TrainingActions.DeleteTrainingById:
			return deleteTrainingById(state, action as DeleteTrainingAction);

		default:
			return state;
	}
};

export default training;

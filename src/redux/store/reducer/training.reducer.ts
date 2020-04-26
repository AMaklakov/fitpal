import { Action, Reducer } from 'redux';
import { TrainingModel } from '@model/training.model';
import { TrainingActions, TrainingExerciseAction } from '@redux/action/training-exercise.action';
import { IFetchState } from '@model/fetch-state.model';
import { isPresent } from '@util/type.util';
import { DataAction } from '@model/data-action.model';
import { ChangeTrainingAction } from '@redux/action/training.action';

interface IState extends IFetchState {
	trainings: TrainingModel[];
}

const DEFAULT_STATE: IState = {
	trainings: [],
	loading: false,
	error: null,
};

export const training: Reducer<IState, Action<TrainingActions>> = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case TrainingActions.CreateTrainingExerciseByTrainingId:
			return createTrainingExerciseByTrainingId(state, action as TrainingExerciseAction);

		case TrainingActions.EditTrainingExerciseByTrainingId:
			return editTrainingExerciseByTrainingId(state, action as TrainingExerciseAction);

		case TrainingActions.DeleteTrainingExerciseByTrainingId:
			return deleteTrainingExerciseByTrainingId(state, action as TrainingExerciseAction);

		case TrainingActions.ChangeTraining:
			return changeTraining(state, action as ChangeTrainingAction);

		case TrainingActions.FetchTrainingsByDateStart:
			return {
				...state,
				loading: true,
			};
		case TrainingActions.FetchTrainingByDateSuccess:
			return addTrainingsToState(state, (action as DataAction<TrainingModel[] | undefined>).payload);
		case TrainingActions.FetchTrainingByDateError:
			return {
				...state,
				loading: false,
				error: (action as any).payload,
			};

		case TrainingActions.FetchTrainingByIdStart:
			return {
				...state,
				loading: true,
			};
		case TrainingActions.FetchTrainingByIdSuccess:
			return addTrainingsToState(state, (action as DataAction<TrainingModel | undefined>).payload);
		case TrainingActions.FetchTrainingByIdError:
			return {
				...state,
				loading: false,
				error: (action as any).payload,
			};

		case TrainingActions.CreateTrainingStart:
			return { ...state, loading: true };
		case TrainingActions.CreateTrainingSuccess:
			return addTrainingsToState(state, (action as DataAction<TrainingModel>).payload);
		case TrainingActions.CreateTrainingError:
			return {
				...state,
				loading: false,
				error: (action as any).payload,
			};

		case TrainingActions.DeleteTrainingByIdStart:
			return { ...state, loading: true };
		case TrainingActions.DeleteTrainingByIdSuccess:
			return deleteById(state, (action as DataAction<string>).payload);
		case TrainingActions.DeleteTrainingByIdError:
			return {
				...state,
				loading: false,
				error: (action as any).payload,
			};

		default:
			return state;
	}
};

const createTrainingExerciseByTrainingId = (state: IState, action: TrainingExerciseAction): IState => {
	const { exercise, trainingId } = action.payload;

	const newExercise = {
		...exercise,
		sequenceNumber: state.trainings.length + 1,
	};

	const newTrainings = state.trainings.map(item => {
		if (item.id === trainingId) {
			item = {
				...item,
				exerciseList: [...item.exerciseList, newExercise],
			};
		}

		return item;
	});

	return {
		...state,
		trainings: newTrainings,
	};
};

const editTrainingExerciseByTrainingId = (state: IState, action: TrainingExerciseAction): IState => {
	const { exercise, trainingId } = action.payload;
	const newTrainings = state.trainings.map(item => {
		if (item.id === trainingId) {
			item = {
				...item,
				exerciseList: item.exerciseList.map(x => {
					if (x.id === exercise.id) {
						x = exercise;
					}

					return { ...x };
				}),
			};
		}

		return item;
	});

	return { ...state, trainings: newTrainings };
};

const deleteTrainingExerciseByTrainingId = (state: IState, action: TrainingExerciseAction): IState => {
	const { exercise, trainingId } = action.payload;

	return {
		...state,
		trainings: state.trainings.map(item => {
			if (item.id === trainingId) {
				item = {
					...item,
					exerciseList: [...item.exerciseList.filter(x => x.id !== exercise.id).map(x => ({ ...x }))],
				};
			}

			return item;
		}),
	};
};

const changeTraining = (state: IState, { payload: { training } }: ChangeTrainingAction): IState => {
	return {
		...state,
		trainings: state.trainings.map(t => {
			if (t.id === training.id) {
				return {
					...training,
					exerciseList: [...training.exerciseList],
				};
			}

			return { ...t };
		}),
	};
};

const deleteById = (state: IState, id: string): IState => ({
	...state,
	loading: false,
	error: null,
	trainings: state.trainings.filter(t => t.id !== id),
});

const addTrainingsToState = (state: IState, trainings: TrainingModel[] | TrainingModel | undefined): IState => {
	if (!isPresent(trainings)) {
		return { ...state };
	}

	const concatedList = state.trainings.concat(trainings);
	const idList = concatedList.map(x => x.id);
	const newTrainings = concatedList.filter((x, index) => idList.lastIndexOf(x.id) === index);

	return {
		...state,
		loading: false,
		error: null,
		trainings: newTrainings,
	};
};

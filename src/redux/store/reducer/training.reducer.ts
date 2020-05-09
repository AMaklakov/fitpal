import { Action, Reducer } from 'redux';
import { TrainingModel } from '@model/training.model';
import { TRAINING_ACTIONS, TrainingActions, TrainingExerciseAction } from '@redux/action/training-exercise.action';
import { IFetchState } from '@model/fetch-state.model';
import { isPresent } from '@util/type.util';
import { DataAction } from '@model/data-action.model';
import { setError, startLoading } from '@util/state.util';

interface IState extends IFetchState {
	trainings: TrainingModel[];
}

const DEFAULT_STATE: IState = {
	trainings: [],
	loading: false,
	error: null,
};

export const training: Reducer<IState, Action<string>> = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case TRAINING_ACTIONS.EXERCISE.ADD.START:
			return startLoading(state);
		case TRAINING_ACTIONS.EXERCISE.ADD.SUCCESS:
			return addTrainingsToState(state, (action as DataAction<TrainingModel>).payload);
		case TRAINING_ACTIONS.EXERCISE.ADD.ERROR:
			return setError(state, (action as DataAction<object>).payload);

		case TRAINING_ACTIONS.EXERCISE.REMOVE.START:
			return startLoading(state);
		case TRAINING_ACTIONS.EXERCISE.REMOVE.SUCCESS:
			return addTrainingsToState(state, (action as DataAction<TrainingModel>).payload);
		case TRAINING_ACTIONS.EXERCISE.REMOVE.ERROR:
			return setError(state, (action as DataAction<object>).payload);

		case TrainingActions.EditTrainingExerciseByTrainingId:
			return editTrainingExerciseByTrainingId(state, action as TrainingExerciseAction);

		case TrainingActions.FetchTrainingsByDateStart:
			return startLoading(state);
		case TrainingActions.FetchTrainingByDateSuccess:
			return addTrainingsToState(state, (action as DataAction<TrainingModel[] | undefined>).payload);
		case TrainingActions.FetchTrainingByDateError:
			return setError(state, (action as any).payload);

		case TrainingActions.FetchTrainingByIdStart:
			return startLoading(state);
		case TrainingActions.FetchTrainingByIdSuccess:
			return addTrainingsToState(state, (action as DataAction<TrainingModel | undefined>).payload);
		case TrainingActions.FetchTrainingByIdError:
			return setError(state, (action as any).payload);

		case TrainingActions.CreateTrainingStart:
			return startLoading(state);
		case TrainingActions.CreateTrainingSuccess:
			return addTrainingsToState(state, (action as DataAction<TrainingModel>).payload);
		case TrainingActions.CreateTrainingError:
			return setError(state, (action as any).payload);

		case TrainingActions.DeleteTrainingByIdStart:
			return startLoading(state);
		case TrainingActions.DeleteTrainingByIdSuccess:
			return deleteById(state, (action as DataAction<string>).payload);
		case TrainingActions.DeleteTrainingByIdError:
			return setError(state, (action as DataAction<object>).payload);

		case TrainingActions.UpdateTrainingStart:
			return startLoading(state);
		case TrainingActions.UpdateTrainingSuccess:
			return addTrainingsToState(state, (action as DataAction<TrainingModel>).payload);
		case TrainingActions.UpdateTrainingError:
			return setError(state, (action as DataAction<object>).payload);

		default:
			return state;
	}
};

const editTrainingExerciseByTrainingId = (state: IState, action: TrainingExerciseAction): IState => {
	const { exercise, trainingId } = action.payload;
	const newTrainings = state.trainings.map(item => {
		if (item._id === trainingId) {
			item = {
				...item,
				exerciseList: item.exerciseList.map(x => {
					if (x._id === exercise._id) {
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

const deleteById = (state: IState, id: string): IState => ({
	...state,
	loading: false,
	error: null,
	trainings: state.trainings.filter(t => t._id !== id),
});

const addTrainingsToState = (state: IState, trainings: TrainingModel[] | TrainingModel | undefined): IState => {
	if (!isPresent(trainings)) {
		return { ...state };
	}

	const concatedList = state.trainings.concat(trainings);
	const idList = concatedList.map(x => x._id);
	const newTrainings = concatedList.filter((x, index) => idList.lastIndexOf(x._id) === index);

	return {
		...state,
		loading: false,
		error: null,
		trainings: newTrainings,
	};
};

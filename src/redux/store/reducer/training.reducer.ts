import { Action, Reducer } from 'redux';
import { TrainingModel } from '@model/training.model';
import { TRAINING_ACTIONS } from '@redux/action/training-exercise.action';
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

		case TRAINING_ACTIONS.EXERCISE.EDIT.START:
			return startLoading(state);
		case TRAINING_ACTIONS.EXERCISE.EDIT.SUCCESS:
			return addTrainingsToState(state, (action as DataAction<TrainingModel>).payload);
		case TRAINING_ACTIONS.EXERCISE.EDIT.ERROR:
			return setError(state, (action as DataAction<object>).payload);

		case TRAINING_ACTIONS.FETCH_BY_DATE.START:
			return startLoading(state);
		case TRAINING_ACTIONS.FETCH_BY_DATE.SUCCESS:
			return addTrainingsToState(state, (action as DataAction<TrainingModel[] | undefined>).payload);
		case TRAINING_ACTIONS.FETCH_BY_DATE.ERROR:
			return setError(state, (action as DataAction<object>).payload);

		case TRAINING_ACTIONS.FETCH_BY_ID.START:
			return startLoading(state);
		case TRAINING_ACTIONS.FETCH_BY_ID.SUCCESS:
			return addTrainingsToState(state, (action as DataAction<TrainingModel | undefined>).payload);
		case TRAINING_ACTIONS.FETCH_BY_ID.ERROR:
			return setError(state, (action as DataAction<object>).payload);

		case TRAINING_ACTIONS.CREATE.START:
			return startLoading(state);
		case TRAINING_ACTIONS.CREATE.SUCCESS:
			return addTrainingsToState(state, (action as DataAction<TrainingModel>).payload);
		case TRAINING_ACTIONS.CREATE.ERROR:
			return setError(state, (action as any).payload);

		case TRAINING_ACTIONS.DELETE.START:
			return startLoading(state);
		case TRAINING_ACTIONS.DELETE.SUCCESS:
			return deleteById(state, (action as DataAction<string>).payload);
		case TRAINING_ACTIONS.DELETE.ERROR:
			return setError(state, (action as DataAction<object>).payload);

		case TRAINING_ACTIONS.UPDATE.START:
			return startLoading(state);
		case TRAINING_ACTIONS.UPDATE.SUCCESS:
			return addTrainingsToState(state, (action as DataAction<TrainingModel>).payload);
		case TRAINING_ACTIONS.UPDATE.ERROR:
			return setError(state, (action as DataAction<object>).payload);

		default:
			return state;
	}
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

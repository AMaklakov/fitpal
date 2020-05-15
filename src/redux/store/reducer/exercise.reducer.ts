import { Reducer } from 'redux';
import { ExerciseModel } from '@model/exercise.model';
import { EXERCISE_ACTIONS, ExerciseActions } from '@redux/action/exercise.action';
import { IFetchState } from '@model/fetch-state.model';
import { DataAction } from '@model/data-action.model';
import { setError, startLoading } from '@util/state.util';

interface IExerciseState {
	exercises: ExerciseModel[];
}

type IState = IExerciseState & IFetchState;

const DEFAULT_STATE: IState = {
	loading: false,
	error: null,

	exercises: [],
};

export const exercise: Reducer<IState, DataAction> = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case ExerciseActions.CreateStart:
			return startLoading(state);
		case ExerciseActions.CreateSuccess:
			return { ...state, loading: false, error: null, exercises: [...state.exercises, action.payload] };
		case ExerciseActions.CreateError:
			return setError(state, (action as DataAction<object>).payload);

		case ExerciseActions.FetchStart:
			return startLoading(state);
		case ExerciseActions.FetchSuccess:
			return { ...state, loading: false, error: null, exercises: action.payload };
		case ExerciseActions.FetchError:
			return setError(state, (action as DataAction<object>).payload);

		case EXERCISE_ACTIONS.UPDATE.START:
			return startLoading(state);
		case EXERCISE_ACTIONS.UPDATE.SUCCESS:
			return updateExercise(state, (action as DataAction<ExerciseModel>).payload);
		case EXERCISE_ACTIONS.UPDATE.ERROR:
			return setError(state, (action as DataAction<object>).payload);

		default:
			return state;
	}
};

const updateExercise = (state: IState, ex: ExerciseModel) => ({
	...state,
	error: null,
	loading: false,
	exercises: state.exercises.filter(e => e._id !== ex._id).concat(ex),
});

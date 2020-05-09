import { Reducer } from 'redux';
import { ExerciseModel } from '@model/exercise.model';
import { ExerciseActions, UpdateExerciseAction } from '@redux/action/exercise.action';
import { IFetchState } from '@model/fetch-state.model';
import { DataAction } from '@model/data-action.model';

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
			return { ...state, loading: true };
		case ExerciseActions.CreateSuccess:
			return { ...state, loading: false, error: null, exercises: [...state.exercises, action.payload] };
		case ExerciseActions.CreateError:
			return { ...state, loading: false, error: action.payload };

		case ExerciseActions.FetchStart:
			return { ...state, loading: true };
		case ExerciseActions.FetchSuccess:
			return { ...state, loading: false, error: null, exercises: action.payload };
		case ExerciseActions.FetchError:
			return { ...state, loading: false, error: action.payload };

		case ExerciseActions.Update:
			return updateExercise(state, action as UpdateExerciseAction);

		default:
			return state;
	}
};

const updateExercise = (state: IState, { payload: { exercise } }: UpdateExerciseAction) => {
	return {
		...state,
		exercises: state.exercises.filter(ex => ex._id !== exercise._id).concat([exercise]),
	};
};

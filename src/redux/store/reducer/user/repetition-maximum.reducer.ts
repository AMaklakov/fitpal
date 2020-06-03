import { Reducer } from 'redux';
import { UserActions } from '@redux/action/user.action';
import { DataAction } from '@model/data-action.model';
import { IBaseTrainingExercise } from '@model/training-exercise';

export interface IRepetitionMaximum {
	ex: IBaseTrainingExercise | null;
}

export const DEFAULT_WEIGHT_STATE: IRepetitionMaximum = {
	ex: null,
};

export const repetitionMaximumReducer: Reducer<IRepetitionMaximum, DataAction> = (
	state = DEFAULT_WEIGHT_STATE,
	action
) => {
	switch (action.type) {
		case UserActions.SetRepetitionMaximumExercise:
			return { ...state, ex: action.payload };

		default:
			return state;
	}
};

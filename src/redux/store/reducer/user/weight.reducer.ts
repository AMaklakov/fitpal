import { BigSource } from 'big.js';
import moment, { MomentInput } from 'moment';
import { Reducer } from 'redux';
import { UserActions } from '@redux/action/user.action';

export interface IWeight {
	loading: boolean;
	error: object | string | null;
	isModalVisible: boolean;

	weight: BigSource;
	date: MomentInput;
}

export const DEFAULT_WEIGHT_STATE: IWeight = {
	loading: false,
	error: null,
	isModalVisible: false,
	weight: 60,
	date: moment(),
};

export const weightReducer: Reducer<IWeight> = (state = DEFAULT_WEIGHT_STATE, action) => {
	switch (action.type) {
		case UserActions.SetModalVisible:
			return { ...state, isModalVisible: action.payload ?? !state.isModalVisible };
		case UserActions.ChangeUserWeightStart:
			return { ...state, loading: true };
		case UserActions.ChangeUserWeightSuccess:
			return {
				...state,
				error: null,
				weight: action.payload.weight,
				date: action.payload.date,
			};
		case UserActions.ChangeUserWeightError:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

import { BigSource } from 'big.js';
import moment, { MomentInput } from 'moment';
import { Reducer } from 'redux';

export interface IWeight {
	weight: BigSource;
	date: MomentInput;
}

export const DEFAULT_WEIGHT_STATE: IWeight = {
	weight: 60,
	date: moment(),
};

export const weightReducer: Reducer<IWeight> = (state = DEFAULT_WEIGHT_STATE, action) => {
	switch (action) {
		default:
			return state;
	}
};

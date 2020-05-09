import { Action, Reducer } from 'redux';
import moment from 'moment';
import { IFetchState } from '@model/fetch-state.model';
import { ICovidData } from '@model/covid-data.model';
import { DataAction } from '@model/data-action.model';
import { COVID_ACTIONS } from '@redux/action/covid.action';
import { setError, startLoading } from '@util/state.util';

const DEFAULT_STATE: ICovidData & IFetchState = {
	date: moment(),
	confirmed: 0,
	deaths: 0,
	recovered: 0,

	error: null,
	loading: false,
};

export const covid: Reducer<ICovidData & IFetchState> = (state = DEFAULT_STATE, action: Action) => {
	switch (action.type) {
		case COVID_ACTIONS.FETCH.START:
			return startLoading(state);
		case COVID_ACTIONS.FETCH.SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				...(action as DataAction<ICovidData>).payload,
			};
		case COVID_ACTIONS.FETCH.ERROR:
			return setError(state, (action as DataAction<object>).payload);
		default:
			return state;
	}
};

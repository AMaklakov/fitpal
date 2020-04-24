import { Action, Reducer } from 'redux';
import moment from 'moment';
import { CovidAction } from '@redux/action/covid.action';
import { IFetchState } from '@model/fetch-state.model';
import { ICovidData } from '@model/covid-data.model';
import { DataAction } from '@model/data-action.model';
import { PropType } from '@util/type.util';

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
		case CovidAction.FetchStart:
			return {
				...state,
				error: null,
				loading: true,
			};
		case CovidAction.FetchSuccess:
			return {
				...state,
				...(action as DataAction<ICovidData>).payload,
				loading: false,
			};
		case CovidAction.FetchError:
			return {
				...state,
				error: (action as DataAction<PropType<IFetchState, 'error'>>).payload,
				loading: false,
			};
		default:
			return state;
	}
};

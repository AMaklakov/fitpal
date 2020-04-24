import { Action, ActionCreator } from 'redux';
import { DataAction } from '@model/data-action.model';
import { ICovidData } from '@model/covid-data.model';

export enum CovidAction {
	FetchStart = 'COVID/FETCH/START',
	FetchSuccess = 'COVID/FETCH/SUCCESS',
	FetchError = 'COVID/FETCH/ERROR',
}

export const fetchCovidData: ActionCreator<Action> = () => ({
	type: CovidAction.FetchStart,
});

export const updateCovidData: ActionCreator<DataAction<ICovidData>> = data => ({
	type: CovidAction.FetchSuccess,
	payload: data,
});

export const setErrorCovidData: ActionCreator<DataAction<string>> = data => ({
	type: CovidAction.FetchError,
	payload: data,
});

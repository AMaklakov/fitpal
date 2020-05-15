import { ICovidData } from '@model/covid-data.model';
import { progressActions, progressTypes } from '@util/redux.util';

export const COVID_ACTIONS = {
	FETCH: progressTypes('COVID'),
};

export const COVID_ACTION_CREATORS = {
	FETCH: progressActions<undefined, ICovidData, object>(COVID_ACTIONS.FETCH),
};

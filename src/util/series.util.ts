import { ISeries } from '@model/training-exercise';

export const cloneSeries = (s: ISeries): ISeries => {
	return { ...s };
};

export const cloneSeriesList = (list?: ISeries[]): ISeries[] => {
	return list ? list.map(s => cloneSeries(s)) : [];
};

export const createEmptySeries = (sequenceNumber: number): ISeries => ({
	sequenceNumber,
	repeats: 1,
	weight: 0,
});

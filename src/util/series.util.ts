import { SeriesModel } from '../model/training.model';

export const cloneSeries = (s: SeriesModel): SeriesModel => {
	return { ...s };
};

export const cloneSeriesList = (list?: SeriesModel[]): SeriesModel[] => {
	return list ? list.map(s => cloneSeries(s)) : [];
};

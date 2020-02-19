import { SeriesModel } from '@model/training.model';

export interface CreateSeriesPropsModel {
	series?: SeriesModel;
	index: number;

	onChange: (s: SeriesModel) => void;
}

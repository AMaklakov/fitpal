import { SeriesModel } from '@model/exercise.model';

export interface CreateSeriesPropsModel {
	series?: SeriesModel;
	index: number;

	onChange: (s: SeriesModel) => void;
}

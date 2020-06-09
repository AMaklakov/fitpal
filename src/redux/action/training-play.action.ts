import { dataActionCreator } from '@util/redux.util';
import { TrainingModel } from '@model/training.model';

const TRAINING_PLAY = 'TRAINING_PLAY';

export const TRAINING_PLAY_ACTIONS = {
	SET_TRAINING: `${TRAINING_PLAY}/SET_TRAINING`,
	SET_SERIES: `${TRAINING_PLAY}/SET_SERIES`,
};

export interface ISetSeries {
	exerciseId: string | null;
	seriesId: string | null;
}
export const TRAINING_PLAY_ACTION_CREATORS = {
	SET_TRAINING: dataActionCreator<TrainingModel | null>(TRAINING_PLAY_ACTIONS.SET_TRAINING),
	SET_SERIES: dataActionCreator<ISetSeries>(TRAINING_PLAY_ACTIONS.SET_SERIES),
};

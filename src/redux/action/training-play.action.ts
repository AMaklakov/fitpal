import { dataActionCreator } from '@util/redux.util';
import { TrainingModel } from '@model/training.model';
import { MomentInput } from 'moment';

const TRAINING_PLAY = 'TRAINING_PLAY';

export const TRAINING_PLAY_ACTIONS = {
	SET_TRAINING: `${TRAINING_PLAY}/SET_TRAINING`,
	SET_SERIES: `${TRAINING_PLAY}/SET_SERIES`,
	SET_TRAINING_END: `${TRAINING_PLAY}/SET_TRAINING_END`,
};

export interface ISetSeries {
	exerciseId: string | null;
	seriesId: string | null;
}

export interface ISetTrainingEnd {
	endTime: MomentInput;
	trainingId: string;
}

export const TRAINING_PLAY_ACTION_CREATORS = {
	SET_TRAINING: dataActionCreator<TrainingModel | null>(TRAINING_PLAY_ACTIONS.SET_TRAINING),
	SET_SERIES: dataActionCreator<ISetSeries>(TRAINING_PLAY_ACTIONS.SET_SERIES),
	SET_TRAINING_END: dataActionCreator<ISetTrainingEnd>(TRAINING_PLAY_ACTIONS.SET_TRAINING_END),
};

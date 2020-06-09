import { Reducer } from 'redux';
import { DataAction } from '@model/data-action.model';
import { MomentInput } from 'moment';
import { ISetSeries, TRAINING_PLAY_ACTIONS } from '@redux/action/training-play.action';
import { TrainingModel } from '@model/training.model';

interface IState {
	training: TrainingModel | null;
	startTime: MomentInput | null;
	currentExerciseId: string | null;
	currentSeriesId: string | null;
}

const DEFAULT_STATE: IState = {
	training: null,
	startTime: null,
	currentSeriesId: null,
	currentExerciseId: null,
};

export const trainingPlay: Reducer<IState, DataAction> = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case TRAINING_PLAY_ACTIONS.SET_TRAINING:
			return { ...state, startTime: null, training: action.payload, currentSeriesId: null, currentExerciseId: null };
		case TRAINING_PLAY_ACTIONS.SET_SERIES:
			const { exerciseId, seriesId } = action.payload as ISetSeries;
			return { ...state, currentExerciseId: exerciseId, currentSeriesId: seriesId };
		default:
			return { ...state };
	}
};

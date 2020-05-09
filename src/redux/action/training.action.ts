import { TrainingModel } from '@model/training.model';
import { TrainingActions } from './training-exercise.action';
import { DataActionCreator } from '@model/data-action.model';

export const deleteTrainingByIdStart: DataActionCreator<string> = id => ({
	type: TrainingActions.DeleteTrainingByIdStart,
	payload: id,
});
export const deleteTrainingByIdSuccess: DataActionCreator<string> = id => ({
	type: TrainingActions.DeleteTrainingByIdSuccess,
	payload: id,
});
export const deleteTrainingByIdError: DataActionCreator<object> = error => ({
	type: TrainingActions.DeleteTrainingByIdError,
	payload: error,
});

export const updateTrainingStart: DataActionCreator<TrainingModel> = training => ({
	type: TrainingActions.UpdateTrainingStart,
	payload: training,
});
export const updateTrainingSuccess: DataActionCreator<TrainingModel> = training => ({
	type: TrainingActions.UpdateTrainingSuccess,
	payload: training,
});
export const updateTrainingError: DataActionCreator<object> = error => ({
	type: TrainingActions.UpdateTrainingError,
	payload: error,
});

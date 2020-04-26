import { ICreateTraining, TrainingModel } from '@model/training.model';
import { TrainingActions, TrainingExerciseAction } from './training-exercise.action';
import { DataActionCreator } from '@model/data-action.model';
import { MomentInput } from 'moment';

export type ChangeTrainingAction = TrainingExerciseAction<{ training: TrainingModel }>;
export const changeTraining = (training: TrainingModel): ChangeTrainingAction => ({
	type: TrainingActions.ChangeTraining,

	payload: { training },
});

export const fetchTrainingsByDateStart: DataActionCreator<MomentInput> = date => ({
	type: TrainingActions.FetchTrainingsByDateStart,
	payload: date,
});
export const fetchTrainingsByDateSuccess: DataActionCreator<TrainingModel[]> = trainings => ({
	type: TrainingActions.FetchTrainingByDateSuccess,
	payload: trainings,
});
export const fetchTrainingsByDateError: DataActionCreator<object> = error => ({
	type: TrainingActions.FetchTrainingByDateError,
	payload: error,
});

export const fetchTrainingByIdStart: DataActionCreator<MomentInput> = id => ({
	type: TrainingActions.FetchTrainingByIdStart,
	payload: id,
});
export const fetchTrainingByIdSuccess: DataActionCreator<TrainingModel | undefined> = (
	training: TrainingModel | undefined
) => ({
	type: TrainingActions.FetchTrainingByIdSuccess,
	payload: training,
});
export const fetchTrainingByIdError: DataActionCreator<object> = (error: object) => ({
	type: TrainingActions.FetchTrainingByIdError,
	payload: error,
});

export const createTrainingStart: DataActionCreator<ICreateTraining> = training => ({
	type: TrainingActions.CreateTrainingStart,
	payload: training,
});
export const createTrainingSuccess: DataActionCreator<TrainingModel> = training => ({
	type: TrainingActions.CreateTrainingSuccess,
	payload: training,
});
export const createTrainingError: DataActionCreator<object> = error => ({
	type: TrainingActions.CreateTrainingError,
	payload: error,
});

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

import { TrainingModel } from '@model/training.model';
import { MomentInput } from 'moment';
import { DataActionCreator } from '@model/data-action.model';
import { Action } from 'redux';

export enum CalendarTrainingModalActions {
	Toggle = 'CALENDAR/TRAINING_MODAL/TOGGLE_OPEN',
	UpdateTraining = 'CALENDAR/TRAINING_MODAL/SET_CURRENT_TRAINING',
	UpdateDate = 'CALENDAR/TRAINING_MODAL/UPDATE_DATE',
	CleanUp = 'CALENDAR/TRAINING_MODAL/CLEAN_UP',
}

export const toggleCalendarTrainingModalAction: DataActionCreator<boolean> = isOpen => ({
	type: CalendarTrainingModalActions.Toggle,
	payload: isOpen,
});

export const updateTrainingModalAction: DataActionCreator<TrainingModel | null> = training => ({
	type: CalendarTrainingModalActions.UpdateTraining,
	payload: training,
});

export const updateDateInTrainingModalAction: DataActionCreator<MomentInput | null> = date => ({
	type: CalendarTrainingModalActions.UpdateDate,
	payload: date,
});

export const cleanUpAction = (): Action => ({ type: CalendarTrainingModalActions.CleanUp });

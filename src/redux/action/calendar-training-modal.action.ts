import { Action } from 'redux';
import { TrainingModel } from '../../model/training.model';

export enum CalendarTrainingModalActions {
	Toggle = 'CALENDAR/TRAINING_MODAL/IS_OPEN',
	UpdateTraining = 'CALENDAR/TRAINING_MODAL/TRAINING',
	UpdateDate = 'CALENDAR/TRAINING_MODAL/UPDATE_DATE',

	CleanUp = 'CALENDAR/TRAINING_MODAL/CLEAN_UP',
}

export type CalendarTrainingModalAction<T extends Object = {}> = Action<CalendarTrainingModalActions> & { payload: T };

export type ToggleCalendarTrainingModalAction = CalendarTrainingModalAction<{ isOpen: boolean }>;
export const toggleCalendarTrainingModalAction = (isOpen: boolean): ToggleCalendarTrainingModalAction => ({
	type: CalendarTrainingModalActions.Toggle,

	payload: { isOpen },
});

export type UpdateTrainingAction = CalendarTrainingModalAction<{ training: TrainingModel | null }>;
export const updateTrainingModalAction = (training: TrainingModel | null): UpdateTrainingAction => ({
	type: CalendarTrainingModalActions.UpdateTraining,
	payload: { training },
});

export type UpdateDateInTrainingModalAction = CalendarTrainingModalAction<{ date: string | null }>;
export const updateDateInTrainingModalAction = (date: string | null): UpdateDateInTrainingModalAction => ({
	type: CalendarTrainingModalActions.UpdateDate,
	payload: { date },
});

export const cleanUpAction = (): CalendarTrainingModalAction => ({
	type: CalendarTrainingModalActions.CleanUp,
	payload: {},
});

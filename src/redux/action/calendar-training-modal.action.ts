import { Action } from 'redux';
import { TrainingModel } from '../../model/training.model';

export enum CalendarTrainingModalActions {
	Toggle = 'CALENDAR/TRAINING_MODAL/IS_OPEN',
	UpdateTraining = 'CALENDAR/TRAINING_MODAL/TRAINING',

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

export const cleanUpAction = (): CalendarTrainingModalAction => ({
	type: CalendarTrainingModalActions.CleanUp,
	payload: {},
});

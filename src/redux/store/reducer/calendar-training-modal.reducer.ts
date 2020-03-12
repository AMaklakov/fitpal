import { Action, Reducer } from 'redux';
import { TrainingModel } from '../../../model/training.model';
import {
	CalendarTrainingModalActions,
	ToggleCalendarTrainingModalAction,
	UpdateDateInTrainingModalAction,
	UpdateTrainingAction,
} from '../../action/calendar-training-modal.action';

interface IState {
	isOpen: boolean;
	training: TrainingModel | null;
	date: string | null;
}

const DEFAULT_STATE: IState = {
	isOpen: false,
	training: null,
	date: null,
};

export const calendarTrainingModal: Reducer<IState> = (
	state: IState = DEFAULT_STATE,
	action: Action<CalendarTrainingModalActions>
) => {
	switch (action.type) {
		case CalendarTrainingModalActions.Toggle:
			return toggleOpen(state, action as ToggleCalendarTrainingModalAction);

		case CalendarTrainingModalActions.UpdateTraining:
			return updateTraining(state, action as UpdateTrainingAction);

		case CalendarTrainingModalActions.CleanUp:
			return { ...DEFAULT_STATE };

		case CalendarTrainingModalActions.UpdateDate:
			const date = (action as UpdateDateInTrainingModalAction).payload.date;
			return { ...state, date };

		default:
			return state;
	}
};

const toggleOpen = (state: IState, action: ToggleCalendarTrainingModalAction): IState => ({
	...state,
	isOpen: action.payload.isOpen,
});

const updateTraining = (state: IState, action: UpdateTrainingAction): IState => ({
	...state,
	training: action.payload.training,
});

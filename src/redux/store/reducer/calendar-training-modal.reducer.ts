import { Reducer, Action } from 'redux';
import { TrainingModel } from '../../../model/training.model';
import {
	CalendarTrainingModalActions,
	ToggleCalendarTrainingModalAction,
	UpdateTrainingAction,
} from '../../action/calendar-training-modal.action';

interface IState {
	isOpen: boolean;
	training: TrainingModel | null;
}

const DEFAULT_STATE: IState = {
	isOpen: false,
	training: null,
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

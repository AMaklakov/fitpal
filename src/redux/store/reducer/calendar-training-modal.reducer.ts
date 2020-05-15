import { Action, Reducer } from 'redux';
import { TrainingModel } from '@model/training.model';
import { CalendarTrainingModalActions } from '@redux/action/calendar-training-modal.action';
import { MomentInput } from 'moment';
import { DataAction } from '@model/data-action.model';

interface IState {
	isOpen: boolean;
	training: TrainingModel | null;

	/**
	 * for creation training on concrete date. Do not use with training copy
	 */
	date: MomentInput | null;
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
			return { ...state, isOpen: (action as DataAction<boolean>).payload };

		case CalendarTrainingModalActions.UpdateTraining:
			return { ...state, training: (action as DataAction<TrainingModel | null>).payload };

		case CalendarTrainingModalActions.CleanUp:
			return { ...DEFAULT_STATE };

		case CalendarTrainingModalActions.UpdateDate:
			return { ...state, date: (action as DataAction<MomentInput | null>).payload };

		default:
			return state;
	}
};

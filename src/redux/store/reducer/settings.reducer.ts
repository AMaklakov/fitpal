import { Action, Reducer } from 'redux';
import { Languages } from '@i18n/index';
import { SettingsActions, UpdateLanguageAction } from '@redux/action/settings.action';

export interface ISettingsState {
	language: Languages;
}

const DEFAULT_STATE: ISettingsState = {
	language: Languages.Ru,
};

export const settings: Reducer<ISettingsState, Action<SettingsActions>> = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SettingsActions.UpdateLanguage:
			return updateLanguage(state, action as UpdateLanguageAction);

		default:
			return state;
	}
};

const updateLanguage = (state: ISettingsState, action: UpdateLanguageAction): ISettingsState => ({
	...state,
	language: action.payload.language,
});

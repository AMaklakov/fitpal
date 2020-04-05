import { Action } from 'redux';
import { Languages } from '../../i18n';

export enum SettingsActions {
	UpdateLanguage = 'Settings/Language',
}

export type SettingsAction<T extends Object = {}> = Action<SettingsActions> & { payload: T };

export type UpdateLanguageAction = SettingsAction<{ language: Languages }>;
export const updateLanguageAction = (language: Languages): UpdateLanguageAction => ({
	type: SettingsActions.UpdateLanguage,
	payload: { language },
});

import { Action, ActionCreator } from 'redux';

export interface DataAction<Payload = any> extends Action<string> {
	type: string;
	payload: Payload;
}

export type DataActionCreator<T = any> = ActionCreator<DataAction<T>>;

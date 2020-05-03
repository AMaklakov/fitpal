import { Action } from 'redux';

export interface DataAction<Payload = any> extends Action<string> {
	type: string;
	payload: Payload;
}

export type DataActionCreator<T = any> = (data: T, ...args: any[]) => DataAction<T>;

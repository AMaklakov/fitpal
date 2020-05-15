import { Action } from 'redux';

export interface DataAction<Payload = any> extends Action<string> {
	type: string;
	payload: Payload;
}

export type DataActionCreator<T = any> = (data: T, ...args: any[]) => DataAction<T>;

export const createFetchActions = <Payload1, Payload2, Payload3, Names extends string>([
	name1,
	name2,
	name3,
]: Names[]): [DataActionCreator<Payload1>, DataActionCreator<Payload2>, DataActionCreator<Payload3>] => [
	data => ({ type: name1, payload: data }),
	data => ({ type: name2, payload: data }),
	data => ({ type: name3, payload: data }),
];

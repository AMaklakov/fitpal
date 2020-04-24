import { Action } from 'redux';

export interface DataAction<Payload = any> extends Action<string> {
	type: string;
	payload: Payload;
}

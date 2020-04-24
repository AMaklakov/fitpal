<<<<<<< HEAD
import { Action, ActionCreator } from 'redux';
=======
import { Action } from 'redux';
>>>>>>> feature(http-requests): add covid saga

export interface DataAction<Payload = any> extends Action<string> {
	type: string;
	payload: Payload;
}
<<<<<<< HEAD

export type DataActionCreator<T = any> = ActionCreator<DataAction<T>>;
=======
>>>>>>> feature(http-requests): add covid saga

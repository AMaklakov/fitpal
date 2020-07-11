import { Reducer } from 'redux';
import { IFetchState } from '@model/fetch-state.model';
import { UserActions } from '@redux/action/user.action';
import { DataAction } from '@model/data-action.model';
import { setError, startLoading } from '@util/state.util';

export interface IAuthState extends IFetchState {
	isAuthorized: boolean;
}

export const DEFAULT_WEIGHT_STATE: IAuthState = {
	loading: false,
	error: null,

	isAuthorized: false,
};

export const authReducer: Reducer<IAuthState, DataAction> = (state = DEFAULT_WEIGHT_STATE, action) => {
	switch (action.type) {
		case UserActions.LoginStart:
			return { ...state, loading: true, isAuthorized: false };
		case UserActions.LoginSuccess:
			return { ...state, isAuthorized: true, loading: false, error: null };
		case UserActions.LoginError:
			return { ...state, isAuthorized: false, loading: false, error: action.payload };

		case UserActions.RegisterStart:
			return startLoading(state);
		case UserActions.RegisterSuccess:
			return setError(state, null);
		case UserActions.RegisterError:
			return setError(state, action.payload);

		default:
			return state;
	}
};

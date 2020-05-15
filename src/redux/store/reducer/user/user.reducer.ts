import { combineReducers } from 'redux';
import { IWeight, weightReducer } from '@redux/store/reducer/user/weight.reducer';
import { authReducer, IAuthState } from '@redux/store/reducer/user/auth.reducer';
import { IFetchState } from '@model/fetch-state.model';

interface IState {
	weightData: IWeight;
	auth: IAuthState & IFetchState;
}

export const user = combineReducers<IState>({
	weightData: weightReducer,
	auth: authReducer,
});

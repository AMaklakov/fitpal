import { combineReducers } from 'redux';
import { IWeight, weightReducer } from '@redux/store/reducer/user/weight.reducer';
import { authReducer, IAuthState } from '@redux/store/reducer/user/auth.reducer';
import { IFetchState } from '@model/fetch-state.model';
import { IRepetitionMaximum, repetitionMaximumReducer } from '@redux/store/reducer/user/repetition-maximum.reducer';

interface IState {
	weightData: IWeight;
	auth: IAuthState & IFetchState;
	repetitionMaximum: IRepetitionMaximum;
}

export const user = combineReducers<IState>({
	weightData: weightReducer,
	auth: authReducer,
	repetitionMaximum: repetitionMaximumReducer,
});

import { combineReducers } from 'redux';
import { IWeight, weightReducer } from '@redux/store/reducer/user/weight.reducer';

interface IState {
	weightData: IWeight;
}

export const user = combineReducers<IState>({
	weightData: weightReducer,
});

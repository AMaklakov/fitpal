import { combineReducers, createStore } from 'redux';
import exercise from './reducer/exercise.reducer';
import training from './reducer/training.reducer';

const combinedReducers = combineReducers({
	exercise,
	training,
});

const store = createStore(combinedReducers);

export type StoreModel = ReturnType<typeof combinedReducers>;

export default store;

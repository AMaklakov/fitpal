import { applyMiddleware, combineReducers, createStore } from 'redux';
import { calendarTrainingModal } from '@redux/store/reducer/calendar-training-modal.reducer';
import exercise from '@redux/store/reducer/exercise.reducer';
import training from '@redux/store/reducer/training.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { settings } from '@redux/store/reducer/settings.reducer';
import { user } from '@redux/store/reducer/user/user.reducer';
import { covid } from '@redux/store/reducer/covid.reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '@redux/sagas/root.saga';

const combinedReducers = combineReducers({
	exercise,
	training,
	settings,
	user,
	covid,

	calendarTrainingModal,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export type StoreModel = ReturnType<typeof combinedReducers>;

export default store;

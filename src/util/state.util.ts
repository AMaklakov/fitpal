import { IFetchState } from '@model/fetch-state.model';
import { PropType } from '@util/type.util';

export const startLoading = <State extends IFetchState>(state: State) => {
	return { ...state, loading: true };
};

export const setError = <State extends IFetchState>(state: State, error: PropType<IFetchState, 'error'>): State => {
	return { ...state, loading: false, error: error };
};

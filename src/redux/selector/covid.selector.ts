import { StoreModel } from '@redux/store';

export const getCovidConfirmed = (store: StoreModel): string | number => {
	const covidState = store.covid;

	if (covidState.loading) {
		return '...';
	}

	return covidState.confirmed;
};

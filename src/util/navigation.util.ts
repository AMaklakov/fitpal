import { NavigationActions, NavigationContainerComponent } from 'react-navigation';
import { Routes } from '@screen/navigator';

const config: { navigator?: NavigationContainerComponent } = {};

export const setNavigator = (nav?: NavigationContainerComponent | null) => {
	if (nav) {
		config.navigator = nav;
	}
};

export const navigate = (routeName: Routes, params?: object) => {
	if (config.navigator && routeName) {
		const action = NavigationActions.navigate({ routeName, params });
		config.navigator.dispatch(action);
	}
};

export const goBack = () => {
	if (config.navigator) {
		const action = NavigationActions.back({});
		config.navigator.dispatch(action);
	}
};

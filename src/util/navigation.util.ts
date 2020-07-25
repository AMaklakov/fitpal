import { Routes } from '@navigation/routes';
import { NavigationState } from '@react-navigation/routers';
import { NavigationContainerRef } from '@react-navigation/native';

const config: { navigator: NavigationContainerRef | null } = { navigator: null };

export const setNavigator = (nav: NavigationContainerRef | null) => {
	console.log(nav);
	config.navigator = nav;
};

export const navigate = (routeName: Routes, params?: object) => {
	if (routeName) {
		config.navigator?.navigate(routeName, params);
	}
};

export const goBack = () => config.navigator?.goBack();

export const getCurrentRoute = (state?: NavigationState): undefined | Routes =>
	state?.routes?.[state?.index]?.name as undefined | Routes;

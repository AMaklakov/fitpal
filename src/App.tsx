import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@redux/store';
import { Navigator } from '@screen/navigator';
import { Routes } from '@screen/routes';
import { SafeAreaView, StatusBar } from 'react-native';
import { changeLanguage } from '@i18n/index';
import { CalendarTrainingModal } from '@screen/calendar/calendar-training-modal';
import { Menu } from '@components/menu/menu';
import { NavigationActions, NavigationContainerComponent, NavigationRoute, NavigationState } from 'react-navigation';
import { UserWeightModal } from '@components/user-weight/user-weight.modal';
import { SpinnerModal } from '@components/progress-bars/spinner.modal';
import { setNavigator } from '@util/navigation.util';
import { Header } from '@components/header/header';
import { RepetitionMaxModal } from '@components/repetition-maximum/repetition-maximum.modal';
import { EditTrainingModal } from '@components/modals/edit-training-modal';

changeLanguage(store.getState().settings.language);

export const App = () => {
	const [isMenuOpen, changeIsMenuOpen] = useState<boolean>(false);
	const [navZone, setNavZone] = useState<Routes>(Routes.AuthZone);
	const [navRoute, setNavRoute] = useState<Routes>(Routes.Login);
	const navigatorRef = useRef<NavigationContainerComponent & { state: { nav: NavigationState } }>(null);

	useEffect(() => {
		setNavigator(navigatorRef.current);
	}, [navigatorRef]);

	const handleOpenMenu = useCallback(() => changeIsMenuOpen(true), []);
	const handleCloseMenu = useCallback(() => changeIsMenuOpen(false), []);

	const handleNavigate = useCallback(
		(routeName: Routes) => {
			navigatorRef.current?.dispatch(NavigationActions.navigate({ routeName }));

			handleCloseMenu();
		},
		[handleCloseMenu]
	);

	const handleSetNavigations = useCallback(
		(prevNavigationState: NavigationState, nextNavigationState: NavigationState) => {
			setNavZone(getCurrentRoute(nextNavigationState, true));
			setNavRoute(getCurrentRoute(nextNavigationState));
		},
		[]
	);

	return (
		<>
			<StatusBar barStyle="dark-content" />

			<SafeAreaView style={{ flex: 1 }}>
				<Provider store={store}>
					{navZone === Routes.AppZone && <Header onOpenMenu={handleOpenMenu} />}

					<Navigator ref={navigatorRef} onNavigationStateChange={handleSetNavigations} />

					<UserWeightModal />
					<CalendarTrainingModal />
					<SpinnerModal />
					<RepetitionMaxModal />
					<EditTrainingModal />

					<Menu isOpen={isMenuOpen} onCloseMenu={handleCloseMenu} navigate={handleNavigate} activeRoute={navRoute} />
				</Provider>
			</SafeAreaView>
		</>
	);
};

const getCurrentRoute = (nav?: NavigationState, isTopLevel?: boolean): Routes => {
	const newNav = nav?.routes[nav.index] as NavigationState | NavigationRoute;

	if (!isTopLevel && newNav?.routes) {
		return getCurrentRoute(newNav, false);
	}

	return (newNav as NavigationRoute)?.routeName as Routes;
};

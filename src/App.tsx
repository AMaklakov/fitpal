import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@redux/store';
import { Navigator, Routes } from '@screen/navigator';
import { SafeAreaView, StatusBar } from 'react-native';
import { changeLanguage } from '@i18n/index';
import { CalendarTrainingModal } from '@screen/calendar/calendar-training-modal';
import { Header } from '@components/header/header';
import { Menu } from '@components/menu/menu';
import { NavigationActions, NavigationContainerComponent, NavigationRoute, NavigationState } from 'react-navigation';
import { UserWeightModal } from '@components/user-weight/user-weight.modal';
import { SpinnerModal } from '@components/progress-bars/spinner.modal';
import { setNavigator } from '@util/navigation.util';

changeLanguage(store.getState().settings.language);

export const App = () => {
	const [isMenuOpen, changeIsMenuOpen] = useState();
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

	return (
		<>
			<StatusBar barStyle="dark-content" />

			<SafeAreaView style={{ flex: 1 }}>
				<Provider store={store}>
					<Header onOpenMenu={handleOpenMenu} />

					<Navigator ref={navigatorRef} />

					<UserWeightModal />
					<CalendarTrainingModal />
					<SpinnerModal />

					<Menu
						isOpen={isMenuOpen}
						onCloseMenu={handleCloseMenu}
						navigate={handleNavigate}
						activeRoute={getCurrentRoute(navigatorRef.current?.state?.nav)}
					/>
				</Provider>
			</SafeAreaView>
		</>
	);
};

const getCurrentRoute = (nav?: NavigationState): Routes => {
	const newNav = nav?.routes[nav.index] as NavigationState | NavigationRoute;

	if (newNav.routes) {
		return getCurrentRoute(newNav);
	}

	return (newNav as NavigationRoute).routeName as Routes;
};

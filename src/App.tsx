import React, { useRef, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@redux/store';
import AppNavigator, { Routes } from '@screen/navigator';
import { SafeAreaView, StatusBar } from 'react-native';
import { changeLanguage } from '@i18n/index';
import { CalendarTrainingModal } from '@screen/calendar/calendar-training-modal';
import { Header } from '@components/header/header';
import { Menu } from '@components/menu/menu';
import { NavigationActions, NavigationContainerComponent, NavigationState } from 'react-navigation';

changeLanguage(store.getState().settings.language);

export const App = () => {
	const [isMenuOpen, changeIsMenuOpen] = useState();
	const navigatorRef = useRef<NavigationContainerComponent & { state: { nav: NavigationState } }>(null);

	const handleNavigate = (routeName: Routes) => {
		navigatorRef.current?.dispatch(NavigationActions.navigate({ routeName }));

		handleCloseMenu();
	};

	const handleOpenMenu = () => changeIsMenuOpen(true);
	const handleCloseMenu = () => changeIsMenuOpen(false);

	return (
		<>
			<StatusBar barStyle="dark-content" />

			<SafeAreaView style={{ flex: 1 }}>
				<Provider store={store}>
					<Header onOpenMenu={handleOpenMenu} />

					<AppNavigator ref={navigatorRef} />

					<CalendarTrainingModal />

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

const getCurrentRoute = (nav?: NavigationState): Routes => nav?.routes[nav.index]?.routeName as Routes;

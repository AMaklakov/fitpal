import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@redux/store';
import { Routes, ROUTES_MAP } from '@navigation/routes';
import { SafeAreaView, StatusBar } from 'react-native';
import { changeLanguage } from '@i18n/index';
import { CalendarTrainingModal } from '@screen/calendar/calendar-training-modal';
import { Menu } from '@components/menu/menu';
import { UserWeightModal } from '@components/user-weight/user-weight.modal';
import { SpinnerModal } from '@components/progress-bars/spinner.modal';
import { getCurrentRoute, setNavigator } from '@util/navigation.util';
import { Header } from '@components/header/header';
import { RepetitionMaxModal } from '@components/repetition-maximum/repetition-maximum.modal';
import { EditTrainingModal } from '@components/modals/edit-training-modal';
import { RootNavigator } from '@navigation/root.navigator';
import { NavigationState } from '@react-navigation/routers';
import { NavigationContainerRef } from '@react-navigation/native';

changeLanguage(store.getState().settings.language);

export const App = () => {
	const [isMenuOpen, changeIsMenuOpen] = useState<boolean>(false);
	const [navZone, setNavZone] = useState<'APP' | 'AUTH'>('AUTH');
	const [navRoute, setNavRoute] = useState<Routes>(Routes.Login);
	const navigatorRef = useRef<NavigationContainerRef>(null);

	useEffect(() => {
		setNavigator(navigatorRef.current);
		const currentRoute = getCurrentRoute(navigatorRef.current?.getRootState());
		if (currentRoute) {
			setNavZone(ROUTES_MAP[currentRoute]);
			setNavRoute(currentRoute);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigatorRef.current]);

	const handleOpenMenu = useCallback(() => changeIsMenuOpen(true), []);
	const handleCloseMenu = useCallback(() => changeIsMenuOpen(false), []);

	const handleSetNavigations = useCallback((navigationState?: NavigationState) => {
		const currentRoute = getCurrentRoute(navigationState);
		if (currentRoute) {
			setNavZone(ROUTES_MAP[currentRoute]);
			setNavRoute(currentRoute);
		}
	}, []);

	return (
		<>
			<StatusBar barStyle="dark-content" />

			<SafeAreaView style={{ flex: 1 }}>
				<Provider store={store}>
					{navZone === 'APP' && <Header onOpenMenu={handleOpenMenu} />}

					<RootNavigator onStateChange={handleSetNavigations} navRef={navigatorRef} />

					<UserWeightModal />
					<CalendarTrainingModal />
					<SpinnerModal />
					<RepetitionMaxModal />
					<EditTrainingModal />

					<Menu isOpen={isMenuOpen} onCloseMenu={handleCloseMenu} activeRoute={navRoute} />
				</Provider>
			</SafeAreaView>
		</>
	);
};

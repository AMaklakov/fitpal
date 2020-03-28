import React from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import AppNavigator from 'screen/navigator';
import { SafeAreaView, StatusBar } from 'react-native';
import { changeLanguage, Languages } from 'i18n';
import { CalendarTrainingModal } from 'screen/calendar/calendar-training-modal';

changeLanguage(Languages.Ru);

export const App = () => {
	return (
		<>
			<StatusBar barStyle="dark-content" />

			<SafeAreaView style={{ flex: 1 }}>
				<Provider store={store}>
					<AppNavigator />

					<CalendarTrainingModal />
				</Provider>
			</SafeAreaView>
		</>
	);
};

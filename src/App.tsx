import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppNavigator from './screen/navigator';
import { SafeAreaView } from 'react-native';

const App = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Provider store={store}>
				<AppNavigator />
			</Provider>
		</SafeAreaView>
	);
};

export default App;

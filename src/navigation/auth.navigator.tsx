import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '@navigation/routes';
import { LoginScreen } from '@screen/auth/login/login.screen';
import { RegistrationScreen } from '@screen/auth/registration/registration.screen';

const Stack = createStackNavigator();

export const AuthStack = () => {
	return (
		<Stack.Navigator initialRouteName={Routes.Login} headerMode="none">
			<Stack.Screen name={Routes.Login} component={LoginScreen} />
			<Stack.Screen name={Routes.Registration} component={RegistrationScreen} />
		</Stack.Navigator>
	);
};

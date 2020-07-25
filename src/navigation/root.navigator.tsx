import React, { FC, Ref } from 'react';
import { AuthStack } from '@navigation/auth.navigator';
import { NavigationContainer, NavigationContainerRef, NavigationState } from '@react-navigation/native';
import { AppStack } from '@navigation/app.navigator';
import { isPresent } from '@util/type.util';
import { AuthLoadingScreen } from '@screen/auth/auth-loading/auth-loading.screen';
import { useSelector } from 'react-redux';
import { getIsAuthorized } from '@redux/selector/auth.selector';

interface IProps {
	onStateChange?: (state: NavigationState | undefined) => void;
	navRef?: Ref<NavigationContainerRef>;
}

export const RootNavigator: FC<IProps> = props => {
	const { onStateChange, navRef } = props;

	const isLoggedIn = useSelector(getIsAuthorized);

	if (!isPresent(isLoggedIn)) {
		return <AuthLoadingScreen />;
	}

	return (
		<NavigationContainer ref={navRef} onStateChange={onStateChange}>
			{isLoggedIn ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	);
};

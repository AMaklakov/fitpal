import React, { FC, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { getToken } from '@util/axios';
import { loginError, loginSuccess } from '@redux/action/user.action';
import { Dispatch } from 'redux';

interface IState {}

interface IDispatch {
	onLoginSuccess: (token: string) => void;
	onLoginError: () => void;
}

interface IProps {}

const AuthLoading: FC<IProps & IState & IDispatch> = ({ onLoginError, onLoginSuccess }) => {
	useEffect(() => {
		getToken().then(token => (token ? onLoginSuccess(token) : onLoginError()));
	}, [onLoginError, onLoginSuccess]);

	return (
		<View>
			<ActivityIndicator />
		</View>
	);
};

const mapStateToProps = (): IState => ({});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onLoginSuccess: token => dispatch(loginSuccess({ token })),
	onLoginError: () => dispatch(loginError({})),
});

export const AuthLoadingScreen = connect(mapStateToProps, mapDispatchToProps)(AuthLoading);

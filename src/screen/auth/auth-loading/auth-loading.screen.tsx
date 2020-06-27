import React, { FC, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { Routes } from '@screen/routes';
import { getToken } from '@util/axios';

interface IState {}

interface IDispatch {}

interface IProps extends NavigationPropsModel {}

const AuthLoading: FC<IProps & IState & IDispatch> = ({ navigation }) => {
	useEffect(() => {
		getToken().then(token => navigation.navigate(token ? Routes.AppZone : Routes.AuthZone));
	}, [navigation]);

	return (
		<View>
			<ActivityIndicator />
		</View>
	);
};

const mapStateToProps = (): IState => ({});

const mapDispatchToProps = (): IDispatch => ({});

export const AuthLoadingScreen = connect(mapStateToProps, mapDispatchToProps)(AuthLoading);

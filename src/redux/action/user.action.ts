import { BigSource } from 'big.js';
import { IWeight } from '@redux/store/reducer/user/weight.reducer';
import { DataActionCreator } from '@model/data-action.model';
import { ILoginRequestBody } from '@model/login-request-body';

export enum UserActions {
	SetModalVisible = 'USER/WEIGHT/CHANGE_USER_WEIGHT/SET_MODAL_VISIBLE',
	ChangeUserWeightStart = 'USER/WEIGHT/CHANGE_USER_WEIGHT/START',
	ChangeUserWeightSuccess = 'USER/WEIGHT/CHANGE_USER_WEIGHT/SUCCESS',
	ChangeUserWeightError = 'USER/WEIGHT/CHANGE_USER_WEIGHT/ERROR',

	LoginStart = 'USER/AUTH/LOGIN/START',
	LoginSuccess = 'USER/AUTH/LOGIN/SUCCESS',
	LoginError = 'USER/AUTH/LOGIN/ERROR',

	RegisterStart = 'USER/AUTH/REGISTER/START',
	RegisterSuccess = 'USER/AUTH/REGISTER/SUCCESS',
	RegisterError = 'USER/AUTH/REGISTER/ERROR',

	LogoutStart = 'USER/AUTH/LOGOUT/START',
	LogoutSuccess = 'USER/AUTH/LOGOUT/SUCCESS',
	LogoutError = 'USER/AUTH/LOGOUT/ERROR',
}

export const setWeightModalVisible = (visible?: boolean) => ({
	type: UserActions.SetModalVisible,
	payload: visible,
});

export const changeUserWeightStart: DataActionCreator<BigSource> = weight => ({
	type: UserActions.ChangeUserWeightStart,
	payload: weight,
});
export const changeUserWeightSuccess: DataActionCreator<Pick<IWeight, 'date' | 'weight'>> = userWeight => ({
	type: UserActions.ChangeUserWeightSuccess,
	payload: userWeight,
});
export const changeUserWeightError: DataActionCreator<object> = error => ({
	type: UserActions.ChangeUserWeightError,
	payload: error,
});

export const loginStart: DataActionCreator<ILoginRequestBody> = data => ({
	type: UserActions.LoginStart,
	payload: data,
});
export const loginSuccess: DataActionCreator<{ token: string }> = data => ({
	type: UserActions.LoginSuccess,
	payload: data,
});
export const loginError: DataActionCreator<object> = error => ({
	type: UserActions.LoginError,
	payload: error,
});

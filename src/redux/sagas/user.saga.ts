import { put } from 'redux-saga/effects';
import { axios, getToken, removeToken, setToken, setUserId } from '@util/axios';
import {
	loginError,
	loginSuccess,
	logoutError,
	logoutSuccess,
	registerError,
	registerSuccess,
} from '@redux/action/user.action';
import { DataAction } from '@model/data-action.model';
import { ILoginRequestBody } from '@model/login-request-body';
import { navigate } from '@util/navigation.util';
import { Routes } from '@screen/routes';
import { IRegisterRequestBody } from '@model/register-request-body.model';

export function* login(action: DataAction<ILoginRequestBody>) {
	try {
		const { data } = yield axios.post<{ user: ILoginRequestBody }, { token: string; user: object }>(`login`, {
			user: action.payload,
		});

		const token = data.token;
		yield setToken(token);

		const userId = data.user._id;
		yield setUserId(userId);

		navigate(Routes.AppZone);
		yield put(loginSuccess(data));
	} catch (e) {
		yield put(loginError(e));
	}
}

interface IRegisterRequest {
	user: IRegisterRequestBody;
}

interface IRegisterResponse {
	message?: string;
}

export function* register(action: DataAction<IRegisterRequestBody>) {
	try {
		const { data } = yield axios.post<IRegisterRequest, IRegisterResponse>(`register`, {
			user: action.payload,
		});

		navigate(Routes.Login);
		yield put(registerSuccess(data));
	} catch (e) {
		yield put(registerError(e?.response?.data?.message));
	}
}

export function* logout() {
	try {
		const token = yield getToken();

		const { data } = yield axios.post(`logout`, { token });
		yield removeToken();
		navigate(Routes.Login);

		yield put(logoutSuccess(data));
	} catch (e) {
		yield put(logoutError(e));
	}
}

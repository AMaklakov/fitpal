import { put } from 'redux-saga/effects';
import { axios, setToken } from '@util/axios';
import { loginError, loginSuccess } from '@redux/action/user.action';
import { DataAction } from '@model/data-action.model';
import { ILoginRequestBody } from '@model/login-request-body';
import { navigate } from '@util/navigation.util';
import { Routes } from '@screen/navigator';

export function* login(action: DataAction<ILoginRequestBody>) {
	try {
		const { data } = yield axios.post<{ user: ILoginRequestBody }, { token: string; user: object }>(`login`, {
			user: action.payload,
		});

		const token = data.token;
		yield setToken(token);

		navigate(Routes.AppZone);
		yield put(loginSuccess(data));
	} catch (e) {
		yield put(loginError(e));
	}
}

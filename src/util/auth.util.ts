import { isPresent } from '@util/type.util';
import { AUTH_VALID } from '@const/validation-const';

export const isEmail = (email: string): boolean => /^[\w-_0-9.]+@[\w-_0-9.]+(?:\.[\w0-9.]+)+$/i.test(email);
export const isValidEmailLength = (email: string): boolean => email.length >= AUTH_VALID.LOGIN.minLength && email.length <= AUTH_VALID.LOGIN.maxLength;

export const isPassword = (password: string): boolean => password.length >= AUTH_VALID.PASSWORD.minLength && password.length <= AUTH_VALID.PASSWORD.maxLength;

interface ILogin {
	login: string;
	password: string;
}

export const validateLogin = (obj: ILogin): true | string => {
	if (!obj || typeof obj !== 'object') {
		return 'Invalid data';
	}

	if (!isPresent(obj.login) && !isPresent(obj.password)) {
		return 'Fill in the data';
	}

	if (!isEmail(obj.login)) {
		return 'Invalid login data';
	}

	if (!isValidEmailLength(obj.login)) {
		return 'Invalid login length';
	}

	if (!isPassword(obj.password)) {
		return 'Invalid password length';
	}

	return true;
};

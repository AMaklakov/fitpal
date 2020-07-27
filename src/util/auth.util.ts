import { isPresent } from '@util/type.util';
import { AUTH_VALID } from '@const/validation-const';

export const isEmail = (email: string): boolean => /^[\w-_0-9.]+@[\w-_0-9.]+(?:\.[\w0-9.]+)+$/i.test(email);
export const isValidEmailLength = (email: string): boolean => email.length >= AUTH_VALID.LOGIN.minLength && email.length <= AUTH_VALID.LOGIN.maxLength;

export const isPassword = (password: string): boolean => password.length >= AUTH_VALID.PASSWORD.minLength && password.length <= AUTH_VALID.PASSWORD.maxLength;

interface ILogin {
	login: string;
	password: string;
}

export const getLoginInvalidMessage = (obj: ILogin): string => {
	if (!obj || typeof obj !== 'object' || (!isPresent(obj.login) && !isPresent(obj.password))) {
		return 'Passed data is invalid. Should be an obj and contain \'login\' and \'password\' fields';
	}

	if (!isEmail(obj.login)) {
		return 'Login is not an email';
	}

	if (!isValidEmailLength(obj.login)) {
		return 'Invalid login length';
	}

	if (!isPassword(obj.password)) {
		return `Password length should be between ${AUTH_VALID.PASSWORD.minLength} and ${AUTH_VALID.PASSWORD.maxLength} characters`;
	}

	return '';
};

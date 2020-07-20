import { validateLogin } from '@util/auth.util';
import faker from 'faker';
import { AUTH_VALID } from '@const/validation-const';

describe('util/auth/authValidate', () => {

	[0, '', NaN, null, undefined, {}, [], 1, true].forEach(data => it(`should return false if data: ${data}`, () => {
			expect(validateLogin(data as any)).toBe(null);
		}),
	);

	it('should be valid if login is email', () => {
		const data = {
			login: faker.internet.email(),
			password: faker.internet.password(12),
		};

		const value = validateLogin(data);
		expect(typeof value).toBe('string');
	});

	it('should be invalid if login length < ' + AUTH_VALID.LOGIN.minLength, () => {
		const data = {
			login: 'A@A.A',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = validateLogin(data);
		expect(typeof value).toBe('string');
	});

	it('should be valid if login length >=' + AUTH_VALID.LOGIN.minLength, () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength - 8, max: AUTH_VALID.LOGIN.maxLength - 8})) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = validateLogin(data);
		expect(value).toBe(true);
	});

	it('should be invalid if login length > ' + AUTH_VALID.PASSWORD.maxLength, () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.PASSWORD.maxLength + 1, max:AUTH_VALID.PASSWORD.maxLength + 30})) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = validateLogin(data);
		expect(typeof value).toBe('string');
	});

	it('should be valid if login length equal ' + AUTH_VALID.LOGIN.maxLength, () => {
		const data = {
			login: 'A'.repeat(AUTH_VALID.PASSWORD.maxLength - 8) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = validateLogin(data);
		expect(value).toBe(true);
	});

	it('should be valid if login length < ' + AUTH_VALID.LOGIN.maxLength, () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength - 8, max: AUTH_VALID.LOGIN.maxLength - 8})) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength + 1),
		};

		const value = validateLogin(data);
		expect(typeof value).toBe('string');
	});

	it('should be invalid if password length < ' + AUTH_VALID.PASSWORD.minLength, () => {
		const data = {
			login: getValidLogin(),
			password: faker.internet.password(faker.random.number({min: 0, max:AUTH_VALID.PASSWORD.minLength - 1})),
		};

		const value = validateLogin(data);
		expect(typeof value).toBe('string');
	});

	it('should be valid if password length = ' + AUTH_VALID.PASSWORD.minLength, () => {
		const data = {
			login: getValidLogin(),
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = validateLogin(data);
		expect(value).toBe(true);
	});

	it('should be valid if password length > ' + AUTH_VALID.PASSWORD.minLength + ' and <= ' + AUTH_VALID.PASSWORD.maxLength, () => {
		const data = {
			login: getValidLogin(),
			password: faker.internet.password(faker.random.number({min: AUTH_VALID.PASSWORD.minLength, max:AUTH_VALID.PASSWORD.maxLength})),
		};

		const value = validateLogin(data);
		expect(value).toBe(true);
	});

	it('should be invalid if password length = ' + AUTH_VALID.PASSWORD.maxLength, () => {
		const data = {
			login: getValidLogin(),
			password: faker.internet.password(AUTH_VALID.PASSWORD.maxLength),
		};

		const value = validateLogin(data);
		expect(typeof value).toBe('string');
	});

	it('should be invalid if password length > ' + AUTH_VALID.PASSWORD.maxLength, () => {
		const data = {
			login: getValidLogin(),
			password: faker.internet.password(AUTH_VALID.PASSWORD.maxLength + 1),
		};

		const value = validateLogin(data);
		expect(typeof value).toBe('string');
	});

});

function getValidLogin(): string {
	return 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength -8, max: AUTH_VALID.LOGIN.maxLength - 8})) + '@mail.ru'
}

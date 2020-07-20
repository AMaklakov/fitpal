import { validateLogin } from '@util/auth.util';
import faker from 'faker';
import { AUTH_VALID } from '@const/validation-const';

describe('util/auth/authValidate', () => {

	[0, '', NaN, null, undefined, {}, [], 1, true].forEach(data => it(`should return false if data: ${data}`, () => {
			expect(validateLogin(data as any)).toBe(false);
		}),
	);

	it('should be valid if login has @ or .', () => {
		const data = {
			login: faker.internet.email(),
			password: faker.internet.password(12),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be invalid if login length < 5', () => {
		const data = {
			login: 'A'.repeat(10) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be valid if login length > 4', () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength, max: AUTH_VALID.LOGIN.maxLength})) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});

	it('should be invalid if login length > 100', () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: 101, max:130})) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be valid if login length equal 100', () => {
		const data = {
			login: 'A'.repeat(100) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});

	it('should be valid if login length < 100', () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength, max: AUTH_VALID.LOGIN.maxLength})) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength + 1),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be invalid if password length < 6', () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength, max: AUTH_VALID.LOGIN.maxLength})) + '@mail.ru',
			password: faker.internet.password(faker.random.number({min: 0, max:5})),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be valid if password length = 6', () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength, max: AUTH_VALID.LOGIN.maxLength})) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});

	it('should be valid if password length = 7', () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength, max: AUTH_VALID.LOGIN.maxLength})) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength + 1),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});

	it('should be valid if password length > 5 and < 41', () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength, max: AUTH_VALID.LOGIN.maxLength})) + '@mail.ru',
			password: faker.internet.password(faker.random.number({min: 6, max:AUTH_VALID.PASSWORD.maxLength})),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});

	it('should be invalid if password length = 40', () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength, max: AUTH_VALID.LOGIN.maxLength})) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.maxLength),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be invalid if password length > 40', () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength, max: AUTH_VALID.LOGIN.maxLength})) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.maxLength + 1),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

});

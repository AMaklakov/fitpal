import { getLoginInvalidMessage } from '@util/auth.util';
import faker from 'faker';
import { AUTH_VALID } from '@const/validation-const';

describe('util/auth/authValidate', () => {

	[0, '', NaN, null, undefined, {}, [], 1, true].forEach(data => it(`should return false if data: ${data}`, () => {
			expect(typeof getLoginInvalidMessage(data as any)).toBe('string');
		}),
	);

	for (let i=0; i < 10; i++) {
		it('should be valid if login is email', () => {
			const data = {
				login: faker.internet.email(),
				password: faker.internet.password(12),
			};

			const value = getLoginInvalidMessage(data);
			expect(value).toBe('');
		});
	}

	it('should be invalid if login length < ' + AUTH_VALID.LOGIN.minLength, () => {
		const data = {
			login: 'A@A.A',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = getLoginInvalidMessage(data);
		expect(value.length).toBeGreaterThan(0);
	});

	it('should be valid if login length >=' + AUTH_VALID.LOGIN.minLength, () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength - 4, max: AUTH_VALID.LOGIN.maxLength - 4})) + '@A.A',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = getLoginInvalidMessage(data);
		expect(value).toBe('');
	});

	it('should be invalid if login length > ' + AUTH_VALID.PASSWORD.maxLength, () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.maxLength + 1, max:AUTH_VALID.LOGIN.maxLength + 30})) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = getLoginInvalidMessage(data);

		expect(value.length).toBeGreaterThan(0);
	});

	it('should be valid if login length equal ' + AUTH_VALID.LOGIN.maxLength, () => {
		const data = {
			login: 'A'.repeat(AUTH_VALID.PASSWORD.maxLength - 8) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = getLoginInvalidMessage(data);
		expect(value).toBe('');
	});

	it('should be valid if login length < ' + AUTH_VALID.LOGIN.maxLength, () => {
		const data = {
			login: 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength - 8, max: AUTH_VALID.LOGIN.maxLength - 8})) + '@mail.ru',
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength + 1),
		};

		const value = getLoginInvalidMessage(data);
		expect(value).toBe('');
	});

	it('should be invalid if password length < ' + AUTH_VALID.PASSWORD.minLength, () => {
		const data = {
			login: getValidLogin(),
			password: faker.internet.password(faker.random.number({min: 0, max:AUTH_VALID.PASSWORD.minLength - 1})),
		};

		const value = getLoginInvalidMessage(data);
		expect(value.length).toBeGreaterThan(0);
	});

	it('should be valid if password length = ' + AUTH_VALID.PASSWORD.minLength, () => {
		const data = {
			login: getValidLogin(),
			password: faker.internet.password(AUTH_VALID.PASSWORD.minLength),
		};

		const value = getLoginInvalidMessage(data);
		expect(value).toBe('');
	});

	it('should be valid if password length > ' + AUTH_VALID.PASSWORD.minLength + ' and <= ' + AUTH_VALID.PASSWORD.maxLength, () => {
		const data = {
			login: getValidLogin(),
			password: faker.internet.password(faker.random.number({min: AUTH_VALID.PASSWORD.minLength, max:AUTH_VALID.PASSWORD.maxLength})),
		};

		const value = getLoginInvalidMessage(data);
		expect(value).toBe('');
	});

	it('should be valid if password length = ' + AUTH_VALID.PASSWORD.maxLength, () => {
		const data = {
			login: getValidLogin(),
			password: faker.internet.password(AUTH_VALID.PASSWORD.maxLength),
		};

		const value = getLoginInvalidMessage(data);
		expect(value).toBe('');
	});

	it('should be invalid if password length > ' + AUTH_VALID.PASSWORD.maxLength, () => {
		const data = {
			login: getValidLogin(),
			password: faker.internet.password(AUTH_VALID.PASSWORD.maxLength + 1),
		};

		const value = getLoginInvalidMessage(data);
		expect(value.length).toBeGreaterThan(0);
	});

});

function getValidLogin(): string {
	return 'A'.repeat(faker.random.number({min: AUTH_VALID.LOGIN.minLength -4, max: AUTH_VALID.LOGIN.maxLength - 4})) + '@A.A'
}

import { validateLogin } from '@util/auth.util';
import faker from 'faker';

describe('util/auth/authValidate', () => {

	[0, '', NaN, null, undefined, {}, [], 1, true].forEach(data => it(`should return false if data: ${data}`, () => {
			expect(validateLogin(data as any)).toBe(false);
		}),
	);

	it('should be invalid if login length < 5', () => {
		const data = {
			login: '1243',
			password: faker.internet.password(12),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be invalid if login length > 100', () => {
		const data = {
			login: faker.lorem.words(120),
			password: faker.internet.password(12),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be invalid if password length < 6', () => {
		const data = {
			login: '1234',
			password: faker.internet.password(4),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be invalid if password length > 40', () => {
		const data = {
			login: '1234',
			password: faker.internet.password(41),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be valid if login contains @', () => {
		const data = {
			login: '1234@',
			password: faker.internet.password(41),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});

	it('should be valid if login contains .', () => {
		const data = {
			login: '1234@mail.ru',
			password: faker.internet.password(41),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});

	it('should be valid if login contains mail', () => {
		const data = {
			login: '1234@mail.ru',
			password: faker.internet.password(41),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});
});

import { validateLogin } from '@util/auth.util';
import faker from 'faker';

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
			login: faker.internet.password(faker.random.number({min: 0, max:4})),
			password: faker.internet.password(7),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be valid if login length > 4', () => {
		const data = {
			login: faker.internet.password(faker.random.number({min: 5, max:99})),
			password: faker.internet.password(7),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});

	it('should be invalid if login length > 100', () => {
		const data = {
			login: faker.internet.password(faker.random.number({min: 101, max:130})),
			password: faker.internet.password(7),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be valid if login length equal 100', () => {
		const data = {
			login: faker.internet.password(100),
			password: faker.internet.password(7),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});

	it('should be valid if login length < 100', () => {
		const data = {
			login: faker.internet.password(faker.random.number({min: 10, max:99})),
			password: faker.internet.password(7),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be invalid if password length < 6', () => {
		const data = {
			login: faker.internet.password(faker.random.number({min: 10, max:99})),
			password: faker.internet.password(faker.random.number({min: 0, max:5})),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be valid if password length = 6', () => {
		const data = {
			login: faker.internet.password(faker.random.number({min: 10, max:99})),
			password: faker.internet.password(6),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});

	it('should be valid if password length = 7', () => {
		const data = {
			login: faker.internet.password(faker.random.number({min: 10, max:99})),
			password: faker.internet.password(7),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});

	it('should be valid if password length > 5 and < 41', () => {
		const data = {
			login: faker.internet.password(faker.random.number({min: 10, max:99})),
			password: faker.internet.password(faker.random.number({min: 6, max:40})),
		};

		const value = validateLogin(data);
		expect(value).toBeTruthy();
	});

	it('should be invalid if password length = 40', () => {
		const data = {
			login: faker.internet.password(faker.random.number({min: 10, max:99})),
			password: faker.internet.password(40),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

	it('should be invalid if password length > 40', () => {
		const data = {
			login: faker.internet.password(faker.random.number({min: 10, max:99})),
			password: faker.internet.password(41),
		};

		const value = validateLogin(data);
		expect(value).toBeFalsy();
	});

});

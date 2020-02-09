import { isPositiveInteger } from '../../../src/util/string.util';

describe(`function: isInteger`, () => {
	it('should return false with empty input', () => {
		expect(isPositiveInteger('')).toBe(false);
	});

	it('should return true with 0', () => {
		expect(isPositiveInteger('0')).toBe(true);
	});

	it('should return true with 1', () => {
		expect(isPositiveInteger('1')).toBe(true);
	});

	it('should return false with 01', () => {
		expect(isPositiveInteger('01')).toBe(false);
	});

	it('should return true with 100', () => {
		expect(isPositiveInteger('100')).toBe(true);
	});

	it('should return true with -1', () => {
		expect(isPositiveInteger('-1')).toBe(false);
	});

	it('should return false with abcdef', () => {
		expect(isPositiveInteger('abcdef')).toBe(false);
	});

	it('should return false with !@#$%^&*()_+', () => {
		expect(isPositiveInteger('!@#$%^&*()_+')).toBe(false);
	});
});

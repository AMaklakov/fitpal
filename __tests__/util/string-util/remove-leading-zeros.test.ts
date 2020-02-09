import { removeLeadingZeros } from '../../../src/util/string.util';

describe(`function: removeLeadingZeros`, () => {
	it('should work with empty input', () => {
		expect(removeLeadingZeros('')).toBe('');
	});

	it('should return 0 if input is 0', () => {
		expect(removeLeadingZeros('0')).toBe('0');
	});

	it('should return 1 if input is 1', () => {
		expect(removeLeadingZeros('1')).toBe('1');
	});

	it('should return 1 if input is 01', () => {
		expect(removeLeadingZeros('01')).toBe('1');
	});

	it('should return 1 if input is 0000001', () => {
		expect(removeLeadingZeros('0000001')).toBe('1');
	});

	it('should return 0 if input is 000000', () => {
		expect(removeLeadingZeros('000000')).toBe('0');
	});

	['10', '100', '1000'].forEach(x => {
		it(`should return ${x} if input is ${x}`, () => {
			expect(removeLeadingZeros(x)).toBe(x);
		});
	});
});

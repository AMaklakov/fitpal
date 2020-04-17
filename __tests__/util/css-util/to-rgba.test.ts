import { toRgba } from '@util/css.util';
import { Colors } from '@css/colors.style';

describe('util/css.util/toRgba', () => {
	it('should work with HEX of 6 symbols, ex: #112233', () => {
		expect(toRgba('#F2F2F2' as Colors, 0)).toBe('rgba(242, 242, 242, 0)');
		expect(toRgba('#F2F2F2' as Colors, 0.3)).toBe('rgba(242, 242, 242, 0.3)');
		expect(toRgba('#F2F2F2' as Colors)).toBe('rgba(242, 242, 242, 0.5)');
	});

	it('should work with HEX of 3 symbols, ex: #123', () => {
		expect(toRgba('#ABC' as Colors, 0)).toBe('rgba(170, 187, 204, 0)');
		expect(toRgba('#ABC' as Colors, 0.3)).toBe('rgba(170, 187, 204, 0.3)');
		expect(toRgba('#ABC' as Colors)).toBe('rgba(170, 187, 204, 0.5)');
	});

	it('should NOT work with words, ex: "black"', () => {
		expect(() => toRgba('hello' as Colors, 0)).toThrow();
		expect(() => toRgba('black' as Colors, 0)).toThrow();
		expect(() => toRgba('#notWord' as Colors, 0)).toThrow();
		expect(() => toRgba('#1234' as Colors, 0)).toThrow();
		expect(() => toRgba('#12' as Colors, 0)).toThrow();
		expect(() => toRgba('#12345' as Colors, 0)).toThrow();
		expect(() => toRgba('#1234567' as Colors, 0)).toThrow();
		expect(() => toRgba('rgbaa(1,2,3,0.3)' as Colors, 0)).toThrow();
		expect(() => toRgba('rgbba(1,2,3,0.3)' as Colors, 0)).toThrow();
		// missed opacity here
		expect(() => toRgba('rgba(1,2,3)' as Colors, 0)).toThrow();
		// opacity is not expected here
		expect(() => toRgba('rgb(1,2,3,0.3)' as Colors, 0)).toThrow();
	});

	it('should work with rgb(), ex: "rgb(1, 2, 3)"', () => {
		expect(() => toRgba('rgb(24,39,54)' as Colors, 0)).not.toThrow();
		expect(() => toRgba('rgb(24, 39,54)' as Colors, 0)).not.toThrow();
		expect(() => toRgba('rgb(24, 39, 54)' as Colors, 0)).not.toThrow();

		expect(toRgba('rgb(24, 39, 54)' as Colors, 0)).toBe('rgba(24, 39, 54, 0)');
		expect(toRgba('rgb(24, 39, 54)' as Colors, 0.3)).toBe('rgba(24, 39, 54, 0.3)');
		expect(toRgba('rgb(24, 39, 54)' as Colors)).toBe('rgba(24, 39, 54, 0.5)');
	});

	it('should work with rgba(), ex: "rgba(1, 2, 3, 0.3)", just replacing the opacity', () => {
		expect(() => toRgba('rgba(131,174,200,0.5)' as Colors)).not.toThrow();
		expect(() => toRgba('rgba(131,174, 200, 0.5)' as Colors)).not.toThrow();
		expect(() => toRgba('rgba(131, 174, 200, 0.5)' as Colors)).not.toThrow();

		expect(toRgba('rgba(131, 174, 200, 0.5)' as Colors)).toBe('rgba(131, 174, 200, 0.5)');
		expect(toRgba('rgba(131, 174, 200, 0.5)' as Colors, 0)).toBe('rgba(131, 174, 200, 0)');
		expect(toRgba('rgba(131,174, 200, 0.5)' as Colors, 0.5)).toBe('rgba(131, 174, 200, 0.5)');
		expect(toRgba('rgba(131,174,200,0.5)' as Colors, 0.3)).toBe('rgba(131, 174, 200, 0.3)');
		expect(toRgba('rgba(131,174,200,0.5)' as Colors, 0.5)).toBe('rgba(131, 174, 200, 0.5)');
	});

	it('should take as opacity argument number in range: from 0 to 1', () => {
		expect(() => toRgba(Colors.Black, 0)).not.toThrow();
		expect(() => toRgba(Colors.Black, 0.3)).not.toThrow();
		expect(() => toRgba(Colors.Black, 1)).not.toThrow();

		expect(() => toRgba(Colors.Black, 1.1)).toThrow();
		expect(() => toRgba(Colors.Black, -0.3)).toThrow();
	});
});

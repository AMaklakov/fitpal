import { Colors } from '@css/colors.style';

const hex3Regex = /^#[0-9aAbBcCdDeEfF]{3}$/;
const hex6Regex = /^#[0-9aAbBcCdDeEfF]{6}$/;
const rgbRegex = /^rgb\(\d+,\s*\d+,\s*\d+\)$/;
const rgbaRegex = /^rgba\(\d+,\s*\d+,\s*\d+,\s*.+\)$/;

export const toRgba = (color: Colors, opacity: number = 0.5): string => {
	if (opacity < 0 || opacity > 1) {
		throw new Error(`opacity should be: 0 <= opacity <= 1`);
	}

	if (hex3Regex.test(color)) {
		const r = parseInt(color[1].repeat(2), 16);
		const g = parseInt(color[2].repeat(2), 16);
		const b = parseInt(color[3].repeat(2), 16);

		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	}

	if (hex6Regex.test(color)) {
		const r = parseInt(color.substr(1, 2), 16);
		const g = parseInt(color.substr(3, 2), 16);
		const b = parseInt(color.substr(5, 2), 16);

		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	}

	if (rgbRegex.test(color)) {
		const [r, g, b] = color
			.substring(color.indexOf('(') + 1, color.indexOf(')'))
			.split(',')
			.map(value => value.trim());

		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	}

	if (rgbaRegex.test(color)) {
		const [r, g, b] = color
			.substring(color.indexOf('(') + 1, color.indexOf(')'))
			.split(',')
			.map(value => value.trim());

		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	}

	throw new Error('Supports only hex ("#123" or "#123456"), rgb(1, 2, 3) and rgba(1, 2, 3, 0.3) formats');
};

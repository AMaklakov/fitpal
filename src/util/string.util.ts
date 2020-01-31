export const isInteger = (v: string): boolean => v === '0' || /^[1-9]+\d*$/.test(v);

export const removeLeadingZeros = (v: string): string => {
	while (v.length > 1 && v.charAt(0) === '0') {
		v = v.substring(1);
	}

	return v;
};

export const getNumbersInRangeOptions = (min: number, max: number, step: number = 1): string[] => {
	const arr = [];

	for (let i = min; i <= max; i += step) {
		arr.push(i.toString());
	}

	return arr;
};

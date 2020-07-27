import { removeSpacesAndLowercase } from '@util/string.util';

interface IArgs<T extends Object> {
	value: string;
	autocompleteList: T[];
	autocompleteField: keyof T;
	autocompleteType: 'substring' | 'starts-with';
}

export const autocomplete = <T extends Object>({
	value,
	autocompleteList,
	autocompleteField,
	autocompleteType,
}: IArgs<T>): T[] => {
	value = removeSpacesAndLowercase(value);

	return autocompleteList.filter(obj => {
		const field = obj[autocompleteField] as unknown;

		if (typeof field !== 'string') {
			throw new Error(`'obj[autocompleteField]' must be a string`);
		}

		const trimmedValue = removeSpacesAndLowercase(field);

		if (autocompleteType === 'substring') {
			return trimmedValue.includes(value);
		}

		if (autocompleteType === 'starts-with') {
			return trimmedValue.startsWith(value);
		}
	});
};

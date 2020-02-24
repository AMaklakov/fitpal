import { removeSpacesAndLowercase } from '../../util/string.util';

export const autocomplete = <T extends Object>({
	value,
	autocompleteList,
	autocompleteField,
}: {
	value: string;
	autocompleteList: T[];
	autocompleteField: keyof T;
}): T[] => {
	value = removeSpacesAndLowercase(value);

	return autocompleteList.filter(obj => {
		const field = obj[autocompleteField] as unknown;

		if (typeof field !== 'string') {
			throw new Error(`'obj[autocompleteField]' must be a string`);
		}

		return removeSpacesAndLowercase(field).includes(value);
	});
};

import { ISet } from '@model/training-exercise';
import { generateId } from '@util/uuid.util';

export const cloneSet = (s: ISet): ISet => {
	return { ...s };
};

export const cloneSetList = (list?: ISet[]): ISet[] => {
	return list ? list.map(s => cloneSet(s)) : [];
};

export const createEmptySet = (): ISet => ({
	_id: generateId(),
	repeats: 1,
	weight: 0,
});

import { IBaseTrainingExercise, ISet } from '@model/training-exercise';
import { cloneSet, cloneSetList, createEmptySet } from '@util/set.util';
import { generateId } from '@util/uuid.util';

export const addEmptySeries = (ex: IBaseTrainingExercise): IBaseTrainingExercise => {
	const series = cloneSetList(ex.seriesList);
	series.push(createEmptySet());

	return {
		...ex,
		seriesList: series,
	};
};

export const editSet = (set: ISet, ex: IBaseTrainingExercise): IBaseTrainingExercise => {
	const seriesList = ex.seriesList.reduce((buff: ISet[], s: ISet) => {
		if (s._id !== set._id) {
			return [...buff, cloneSet(s)];
		}

		return [...buff, cloneSet(set)];
	}, [] as ISet[]);

	return {
		...ex,
		seriesList,
	};
};

export const deleteSet = ({ _id: id }: ISet, ex: IBaseTrainingExercise): IBaseTrainingExercise => ({
	...ex,
	seriesList: ex.seriesList.filter(set => set._id !== id),
});

export const repeatLastSet = (ex: IBaseTrainingExercise): IBaseTrainingExercise => {
	const lastRepeat = cloneSet(ex.seriesList[ex.seriesList.length - 1]);
	lastRepeat._id = generateId();

	return {
		...ex,
		seriesList: [...ex.seriesList, lastRepeat],
	};
};

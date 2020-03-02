import { StoreModel } from '../store';
import { PropType } from '../../util/type.util';
import { ExerciseModel } from '@model/exercise.model';

export const getExerciseList = (store: StoreModel) => store?.exercise || [];

export const getExerciseById = (
	store: StoreModel,
	id: PropType<ExerciseModel, 'id'>
): ExerciseModel | undefined => {
	return store?.exercise?.find(e => e.id === id);
};

import { StoreModel } from '@redux/store';
import { PropType } from '@util/type.util';
import { ExerciseModel } from '@model/exercise.model';

export const getExerciseList = (store: StoreModel) => store?.exercise?.exercises || [];

export const getExerciseById = (store: StoreModel, id: PropType<ExerciseModel, '_id'>): ExerciseModel | undefined => {
	return store.exercise.exercises?.find(e => e._id === id);
};

import { StoreModel } from '../store';

export const getExerciseList = (store: StoreModel) => store?.exercise || [];

import { ExerciseModel } from '@model/exercise.model';

export const calcTotal = ({ series }: ExerciseModel): number => {
	return series.reduce((total, s) => (total += s.weight * s.repeats), 0);
};

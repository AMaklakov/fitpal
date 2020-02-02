import { TrainingExerciseModel } from '@model/training.model';

export const calcTotal = ({ seriesList }: TrainingExerciseModel): number => {
	return seriesList?.reduce((total, s) => (total += s.weight * s.repeats), 0);
};

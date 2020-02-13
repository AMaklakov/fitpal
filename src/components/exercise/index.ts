import { TrainingExerciseModel, TrainingModel } from '@model/training.model';

export const calcTotal = ({ seriesList }: TrainingExerciseModel): number => {
	return seriesList?.reduce((total, s) => (total += s.weight * s.repeats), 0);
};

export const calculateTrainingTotal = (training: TrainingModel) =>
	training.exerciseList.reduce((buff, ex) => buff + calcTotal(ex), 0);

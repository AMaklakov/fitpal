import { TrainingExerciseModel } from '../model/training.model';
import { cloneSeriesList } from './series.util';

type ICloneTrainingExercise = {
	(ex: TrainingExerciseModel): TrainingExerciseModel;
	(ex: Partial<TrainingExerciseModel>): Partial<TrainingExerciseModel>;
};
// @ts-ignore
export const cloneTrainingExercise: ICloneTrainingExercise = ex => {
	return {
		...ex,
		seriesList: cloneSeriesList(ex?.seriesList),
	};
};

export const cloneTrainingExerciseList = (list?: TrainingExerciseModel[]): TrainingExerciseModel[] => {
	return list ? list.map(ex => cloneTrainingExercise(ex)) : [];
};

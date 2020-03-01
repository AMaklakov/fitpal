import { isTrainingValid, TrainingModel } from '../../model/training.model';
import { PropType } from '../../util/type.util';
import { TrainingActions, TrainingExerciseAction } from './training-exercise.action';
import { Alert } from 'react-native';
import { generateId } from '../../util/uuid.util';

export type ChangeTrainingAction = TrainingExerciseAction<{ training: TrainingModel }>;
export const changeTraining = (training: TrainingModel): ChangeTrainingAction => ({
	type: TrainingActions.ChangeTraining,

	payload: { training },
});

export type DeleteTrainingAction = TrainingExerciseAction<{
	trainingId: PropType<TrainingModel, 'id'>;
}>;
export const deleteTrainingById = (
	trainingId: PropType<TrainingModel, 'id'>
): DeleteTrainingAction => ({
	type: TrainingActions.DeleteTrainingById,

	payload: { trainingId },
});

export type CreateTrainingAction = TrainingExerciseAction<{ training: TrainingModel }>;
export const createTrainingAction = (
	training: Partial<TrainingModel>
): CreateTrainingAction | undefined => {
	const tempTraining: TrainingModel = { ...training, id: generateId() } as TrainingModel;

	if (!isTrainingValid(tempTraining)) {
		Alert.alert(`Training you want to save is not valid!`);
		return;
	}

	return {
		type: TrainingActions.CreateTraining,

		payload: { training: tempTraining },
	};
};

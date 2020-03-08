import { isTrainingValid, TrainingModel } from '../../model/training.model';
import { PropType } from '../../util/type.util';
import { TrainingActions, TrainingExerciseAction } from './training-exercise.action';
import { Dispatch } from 'redux';
import { generateId } from '../../util/uuid.util';
import { Alert } from 'react-native';

export type ChangeTrainingAction = TrainingExerciseAction<{ training: TrainingModel }>;
export const changeTraining = (training: TrainingModel): ChangeTrainingAction => ({
	type: TrainingActions.ChangeTraining,

	payload: { training },
});

export type DeleteTrainingAction = TrainingExerciseAction<{
	trainingId: PropType<TrainingModel, 'id'>;
}>;
export const deleteTrainingByIdAction = (trainingId: PropType<TrainingModel, 'id'>): DeleteTrainingAction => ({
	type: TrainingActions.DeleteTrainingById,

	payload: { trainingId },
});

export type CreateTrainingAction = TrainingExerciseAction<{ training: TrainingModel }>;
export const createTrainingAction = (training: TrainingModel): CreateTrainingAction => ({
	type: TrainingActions.CreateTraining,

	payload: { training },
});

export const checkAndCreateTraining = (dispatch: Dispatch, training: Partial<TrainingModel>) => {
	const tempTraining: TrainingModel = { ...training, id: generateId() } as TrainingModel;

	if (!isTrainingValid(tempTraining)) {
		Alert.alert(`Training you want to save is not valid!`);
		return;
	}

	dispatch(createTrainingAction(tempTraining));
};

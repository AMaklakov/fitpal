import React, { useState } from 'react';
import { CreateExerciseScreenProps } from './types';
import { CreateExercise } from './create-exercise';
import { connect } from 'react-redux';
import { PropType } from '../../util/type.util';
import { TrainingExerciseModel, TrainingModel } from '../../model/training.model';
import { Action, Dispatch } from 'redux';
import {
	createTrainingExerciseByTrainingId,
	editTrainingExerciseByTrainingId,
} from '../../redux/action/training-exercise.action';
import { StoreModel } from '../../redux/store';
import { getExerciseList } from '../../redux/selector/exercise.selector';

const createEmptyTrainingExercise = () => (({ seriesList: [] } as unknown) as TrainingExerciseModel);

const Screen = (props: CreateExerciseScreenProps) => {
	const { navigation, saveAction, editAction, exerciseList } = props;

	const id = navigation.getParam('trainingId');
	const trainingExercise = navigation.getParam('trainingExercise');

	const [exercise, setExercise] = useState<TrainingExerciseModel>(trainingExercise ?? createEmptyTrainingExercise());

	const onSave = () => {
		trainingExercise ? editAction(id, exercise) : saveAction(id, exercise);

		goBack();
	};

	const goBack = () => navigation.goBack();

	return (
		<CreateExercise
			onSave={onSave}
			exerciseList={exerciseList}
			onCancel={goBack}
			trainingExercise={exercise}
			setTrainingExercise={setExercise}
		/>
	);
};

const mapStateToProps = (store: StoreModel): Pick<CreateExerciseScreenProps, 'exerciseList'> => ({
	exerciseList: getExerciseList(store),
});

const mapDispatchToProps = (
	dispatch: Dispatch<Action>
): Pick<CreateExerciseScreenProps, 'saveAction' | 'editAction'> => ({
	saveAction: (trainingId: PropType<TrainingModel, 'id'>, exercise: TrainingExerciseModel) => {
		dispatch(createTrainingExerciseByTrainingId(trainingId, exercise));
	},

	editAction: (trainingId: PropType<TrainingModel, 'id'>, exercise: TrainingExerciseModel) => {
		dispatch(editTrainingExerciseByTrainingId(trainingId, exercise));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);

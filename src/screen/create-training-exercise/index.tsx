import React, { useState } from 'react';
import { CreateExerciseScreenProps } from './types';
import CreateExercise from './create-exercise';
import { connect } from 'react-redux';
import { PropType } from '../../util/type.util';
import { TrainingExerciseModel, TrainingModel } from '@model/training.model';
import { Action, Dispatch } from 'redux';
import { createTrainingExerciseByTrainingId } from '../../redux/action/training.action';
import { StoreModel } from '../../redux/store';
import { getExerciseList } from '../../redux/selector/exercise.selector';
import { Routes } from '../navigator';

const Screen = (props: CreateExerciseScreenProps) => {
	const { navigation, saveAction, exerciseList } = props;
	const id = navigation.getParam('trainingId');

	const [exercise, setExercise] = useState<TrainingExerciseModel>({} as TrainingExerciseModel);

	const onSave = () => {
		saveAction(id, exercise);

		goBack();
	};

	const goBack = () => navigation.navigate(Routes.Training);

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
): Pick<CreateExerciseScreenProps, 'saveAction'> => ({
	saveAction: (trainingId: PropType<TrainingModel, 'id'>, exercise: TrainingExerciseModel) => {
		dispatch(createTrainingExerciseByTrainingId(trainingId, exercise));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);

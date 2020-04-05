import React, { useState } from 'react';
import { CreateExercise } from './create-exercise';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { PropType } from '@util/type.util';
import { TrainingModel } from '@model/training.model';
import { Action, Dispatch } from 'redux';
import {
	createTrainingExerciseByTrainingId,
	editTrainingExerciseByTrainingId,
} from '@redux/action/training-exercise.action';
import { StoreModel } from '@redux/store';
import { getExerciseList } from '@redux/selector/exercise.selector';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { ExerciseModel } from '@model/exercise.model';
import { createEmptyTrainingExercise } from '@util/training-exercise.util';
import { IBaseTrainingExercise } from '@model/training-exercise';
import { BigSource } from 'big.js';

interface IState {
	exerciseList: ExerciseModel[];
	userWeight: BigSource;
}

interface IDispatch {
	saveAction: (trainingId: string, exercise: IBaseTrainingExercise) => void;
	editAction: (trainingId: string, exercise: IBaseTrainingExercise) => void;
}

interface IProps extends NavigationPropsModel {}

const Screen = (props: IProps & IState & IDispatch) => {
	const { navigation, saveAction, editAction, exerciseList, userWeight } = props;

	const id = navigation.getParam('trainingId');
	const trainingExercise = navigation.getParam('trainingExercise');

	const [exercise, setExercise] = useState<IBaseTrainingExercise>(
		trainingExercise ?? createEmptyTrainingExercise(userWeight)
	);

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
			userWeight={userWeight}
		/>
	);
};

const mapStateToProps: MapStateToProps<IState, IProps, StoreModel> = (store: StoreModel): IState => ({
	exerciseList: getExerciseList(store),
	userWeight: store.user.weightData.weight,
});

const mapDispatchToProps: MapDispatchToProps<IDispatch, IProps> = (dispatch: Dispatch<Action>): IDispatch => ({
	saveAction: (trainingId: PropType<TrainingModel, 'id'>, exercise: IBaseTrainingExercise) => {
		dispatch(createTrainingExerciseByTrainingId(trainingId, exercise));
	},

	editAction: (trainingId: PropType<TrainingModel, 'id'>, exercise: IBaseTrainingExercise) => {
		dispatch(editTrainingExerciseByTrainingId(trainingId, exercise));
	},
});

export const CreateTrainingExerciseScreen = connect<IState, IDispatch, IProps, StoreModel>(
	mapStateToProps,
	mapDispatchToProps
)(Screen);

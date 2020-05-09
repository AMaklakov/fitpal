import React, { useEffect, useState } from 'react';
import { CreateExercise } from './create-exercise';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
	createTrainingExerciseByTrainingId,
	editTrainingExerciseByTrainingId,
} from '@redux/action/training-exercise.action';
import { StoreModel } from '@redux/store';
import { getExerciseList } from '@redux/selector/exercise.selector';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { ExerciseModel } from '@model/exercise.model';
import { createEmptyTrainingExercise, validateTrainingExercise } from '@util/training-exercise.util';
import { IBaseTrainingExercise } from '@model/training-exercise';
import { BigSource } from 'big.js';
import { fetchExercisesStart } from '@redux/action/exercise.action';

interface IState {
	exerciseList: ExerciseModel[];
	userWeight: BigSource;
}

interface IDispatch {
	saveAction: (trainingId: string, exercise: IBaseTrainingExercise) => void;
	editAction: (trainingId: string, exercise: IBaseTrainingExercise) => void;
	onFetchExercises: () => void;
}

interface IProps extends NavigationPropsModel {}

const Screen = (props: IProps & IState & IDispatch) => {
	const { navigation, saveAction, editAction, exerciseList, userWeight, onFetchExercises } = props;

	const id = navigation.getParam('trainingId');
	const trainingExercise = navigation.getParam('trainingExercise');
	const [disabledSave, changeDisabledSave] = useState(true);

	useEffect(() => {
		if (exerciseList.length === 0) {
			onFetchExercises();
		}
	}, [onFetchExercises, exerciseList]);

	const [exercise, setExercise] = useState<IBaseTrainingExercise>(
		trainingExercise ?? createEmptyTrainingExercise(userWeight)
	);

	const handleSetExercise = (e: IBaseTrainingExercise) => {
		setExercise(e);
		changeDisabledSave(!e.exerciseId);
	};

	const onSave = () => {
		if (disabledSave) {
			return;
		}

		const isValid = validateTrainingExercise(exercise);
		if (!isValid) {
			changeDisabledSave(true);
			return;
		}

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
			setTrainingExercise={handleSetExercise}
			userWeight={userWeight}
			disabledSave={disabledSave}
		/>
	);
};

const mapStateToProps: MapStateToProps<IState, IProps, StoreModel> = (store: StoreModel): IState => ({
	exerciseList: getExerciseList(store),
	userWeight: store.user.weightData.weight,
});

const mapDispatchToProps: MapDispatchToProps<IDispatch, IProps> = (dispatch: Dispatch<Action>): IDispatch => ({
	saveAction: (trainingId: string, exercise: IBaseTrainingExercise) => {
		dispatch(createTrainingExerciseByTrainingId(trainingId, exercise));
	},

	editAction: (trainingId: string, exercise: IBaseTrainingExercise) => {
		dispatch(editTrainingExerciseByTrainingId(trainingId, exercise));
	},
	onFetchExercises: () => dispatch(fetchExercisesStart(null)),
});

export const CreateTrainingExerciseScreen = connect<IState, IDispatch, IProps, StoreModel>(
	mapStateToProps,
	mapDispatchToProps
)(Screen);

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CreateExercise } from './create-exercise';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { editTrainingExerciseByTrainingId, TRAINING_ACTION_CREATORS } from '@redux/action/training-exercise.action';
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
	onSave: (trainingId: string, exercise: IBaseTrainingExercise) => void;
	editAction: (trainingId: string, exercise: IBaseTrainingExercise) => void;
	onFetchExercises: () => void;
}

interface IProps extends NavigationPropsModel {}

const Screen = (props: IProps & IState & IDispatch) => {
	const { navigation, onSave, editAction, exerciseList, userWeight, onFetchExercises } = props;

	const id: string = useMemo(() => navigation.getParam('trainingId'), [navigation]);
	const trainingExercise = useMemo(() => navigation.getParam('trainingExercise'), [navigation]);
	const [disabledSave, setDisabledSave] = useState(true);

	useEffect(() => {
		if (exerciseList.length === 0) {
			onFetchExercises();
		}
	}, [onFetchExercises, exerciseList]);

	const [exercise, setExercise] = useState<IBaseTrainingExercise>(
		trainingExercise ?? createEmptyTrainingExercise(userWeight)
	);

	const handleSetExercise = useCallback((e: IBaseTrainingExercise) => {
		setExercise(e);
		setDisabledSave(!e.exerciseId);
	}, []);

	const goBack = useCallback(() => navigation.goBack(), [navigation]);

	const handleSave = useCallback(() => {
		if (disabledSave) {
			return;
		}

		const isValid = validateTrainingExercise(exercise);
		if (!isValid) {
			setDisabledSave(true);
			return;
		}

		trainingExercise ? editAction(id, exercise) : onSave(id, exercise);
	}, [disabledSave, editAction, exercise, id, onSave, trainingExercise]);

	return (
		<CreateExercise
			onSave={handleSave}
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
	onSave: (trainingId: string, exercise: IBaseTrainingExercise) => {
		dispatch(TRAINING_ACTION_CREATORS.EXERCISE.ADD.START({ trainingId, exercise }));
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

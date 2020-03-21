import React, { useState } from 'react';
import { CreateExercise } from './create-exercise';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { PropType } from '../../util/type.util';
import { TrainingExerciseModel, TrainingModel } from '../../model/training.model';
import { Action, Dispatch } from 'redux';
import {
	createTrainingExerciseByTrainingId,
	editTrainingExerciseByTrainingId,
} from '../../redux/action/training-exercise.action';
import { StoreModel } from '../../redux/store';
import { getExerciseList } from '../../redux/selector/exercise.selector';
import { NavigationPropsModel } from '../../model/navigation-props.model';
import { ExerciseModel } from '../../model/exercise.model';

interface IState {
	exerciseList: ExerciseModel[];
}

interface IDispatch {
	saveAction: (trainingId: string, exercise: TrainingExerciseModel) => void;
	editAction: (trainingId: string, exercise: TrainingExerciseModel) => void;
}

interface IProps extends NavigationPropsModel {}

const createEmptyTrainingExercise = () => (({ seriesList: [] } as unknown) as TrainingExerciseModel);

const Screen = (props: IProps & IState & IDispatch) => {
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

const mapStateToProps: MapStateToProps<IState, IProps, StoreModel> = (store: StoreModel): IState => ({
	exerciseList: getExerciseList(store),
});

const mapDispatchToProps: MapDispatchToProps<IDispatch, IProps> = (dispatch: Dispatch<Action>): IDispatch => ({
	saveAction: (trainingId: PropType<TrainingModel, 'id'>, exercise: TrainingExerciseModel) => {
		dispatch(createTrainingExerciseByTrainingId(trainingId, exercise));
	},

	editAction: (trainingId: PropType<TrainingModel, 'id'>, exercise: TrainingExerciseModel) => {
		dispatch(editTrainingExerciseByTrainingId(trainingId, exercise));
	},
});

export default connect<IState, IDispatch, IProps, StoreModel>(mapStateToProps, mapDispatchToProps)(Screen);

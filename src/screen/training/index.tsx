import React, { useCallback, useEffect } from 'react';
import { Training } from './training';
import { StoreModel } from '@redux/store';
import { getTrainingById } from '@redux/selector/training.selector';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Routes } from '@screen/navigator';
import { getExerciseList } from '@redux/selector/exercise.selector';
import { Dispatch } from 'redux';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { ExerciseModel } from '@model/exercise.model';
import { TrainingModel } from '@model/training.model';
import { IBaseTrainingExercise } from '@model/training-exercise';
import { MomentInput } from 'moment';
import { setRepetitionMaximumExercise, setWeightModalVisible } from '@redux/action/user.action';
import { fetchExercisesStart } from '@redux/action/exercise.action';
import { IRemoveExerciseStart, TRAINING_ACTION_CREATORS } from '@redux/action/training-exercise.action';

interface IState {
	training?: TrainingModel;
	exercises: ExerciseModel[];
	lastUserUpdatedWeight: MomentInput;
}

interface IDispatch {
	onRemoveTrainingExercise: (data: IRemoveExerciseStart) => void;
	onShowWeightModal: () => void;
	onUpdateTraining: (training: TrainingModel) => void;
	fetchTrainingById: (id: string | undefined) => void;
	onGoBack: () => void;
	onFetchExercises: () => void;
	onCalcRM: (e: IBaseTrainingExercise) => void;
}

interface IProps extends NavigationPropsModel {}

const Screen = (props: IProps & IState & IDispatch) => {
	const { training, navigation, exercises, onRemoveTrainingExercise, lastUserUpdatedWeight, onShowWeightModal } = props;
	const { onUpdateTraining, fetchTrainingById, onGoBack, onFetchExercises, onCalcRM } = props;

	useEffect(() => {
		fetchTrainingById(navigation?.state?.params?.trainingId);
	}, [fetchTrainingById, navigation]);

	useEffect(() => {
		if (!exercises.length) {
			onFetchExercises();
		}
	}, [exercises, onFetchExercises]);

	const addExerciseAction = (trainingExercise?: IBaseTrainingExercise) => {
		navigation.navigate({
			routeName: Routes.CreateTrainingExercise,
			params: {
				trainingId: training?._id,
				trainingExercise,
			},
		});
	};

	const removeExerciseAction = useCallback(
		(ex: IBaseTrainingExercise) => {
			if (!training) {
				return;
			}

			onRemoveTrainingExercise({ trainingId: training._id, exerciseId: ex._id });
		},
		[onRemoveTrainingExercise, training]
	);

	const handleUpdateTrainingName = useCallback(
		(name: string) => onUpdateTraining({ ...(training as TrainingModel), name }),
		[onUpdateTraining, training]
	);

	return (
		<Training
			training={training}
			canEdit={true}
			onAddExercise={addExerciseAction}
			removeExercise={removeExerciseAction}
			onUpdateTrainingName={handleUpdateTrainingName}
			changeTraining={onUpdateTraining}
			exercises={exercises}
			lastUserUpdatedWeight={lastUserUpdatedWeight}
			onShowWeightModal={onShowWeightModal}
			onGoBack={onGoBack}
			onCalcRM={onCalcRM}
		/>
	);
};

const mapStateToProps: MapStateToProps<IState, IProps, StoreModel> = (store: StoreModel, ownProps: IProps): IState => ({
	training: getTrainingById(store, ownProps?.navigation?.state?.params?.trainingId),
	exercises: getExerciseList(store),
	lastUserUpdatedWeight: store.user.weightData.date,
});

const mapDispatchToProps: MapDispatchToProps<IDispatch, IProps> = (dispatch: Dispatch, ownProups): IDispatch => ({
	onRemoveTrainingExercise: data => dispatch(TRAINING_ACTION_CREATORS.EXERCISE.REMOVE.START(data)),
	onShowWeightModal: () => dispatch(setWeightModalVisible(true)),
	onGoBack: () => ownProups.navigation.navigate(Routes.Calendar),
	onUpdateTraining: (training: TrainingModel) => dispatch(TRAINING_ACTION_CREATORS.UPDATE.START(training)),
	fetchTrainingById: (id: string | undefined) => dispatch(TRAINING_ACTION_CREATORS.FETCH_BY_ID.START(id)),
	onFetchExercises: () => dispatch(fetchExercisesStart(null)),
	onCalcRM: e => dispatch(setRepetitionMaximumExercise(e)),
});

export const TrainingScreen = connect<IState, IDispatch, IProps, StoreModel>(
	mapStateToProps,
	mapDispatchToProps
)(Screen);

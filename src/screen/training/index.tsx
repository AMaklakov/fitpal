import React, { useCallback, useEffect } from 'react';
import { Training } from './training';
import { StoreModel } from '@redux/store';
import { getTrainingById } from '@redux/selector/training.selector';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Routes } from '@screen/navigator';
import { getExerciseList } from '@redux/selector/exercise.selector';
import { Dispatch } from 'redux';
import { deleteTrainingExerciseByTrainingId } from '@redux/action/training-exercise.action';
import { fetchTrainingByIdStart, updateTrainingStart } from '@redux/action/training.action';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { ExerciseModel } from '@model/exercise.model';
import { TrainingModel } from '@model/training.model';
import { IBaseTrainingExercise } from '@model/training-exercise';
import { MomentInput } from 'moment';
import { setWeightModalVisible } from '@redux/action/user.action';
import { fetchExercisesStart } from '@redux/action/exercise.action';

interface IState {
	training?: TrainingModel;
	exercises: ExerciseModel[];
	lastUserUpdatedWeight: MomentInput;
}

interface IDispatch {
	onRemoveTrainingExercise: (e: IBaseTrainingExercise, trainingId: string) => void;
	onShowWeightModal: () => void;
	onUpdateTraining: (training: TrainingModel) => void;
	fetchTrainingById: (id: string | undefined) => void;
	onGoBack: () => void;
	onFetchExercises: () => void;
}

interface IProps extends NavigationPropsModel {}

const Screen = (props: IProps & IState & IDispatch) => {
	const {
		training,
		navigation,
		exercises,
		onRemoveTrainingExercise,
		lastUserUpdatedWeight,
		onShowWeightModal,
		onUpdateTraining,
		fetchTrainingById,
		onGoBack,
		onFetchExercises,
	} = props;

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

	const removeExerciseAction = (trainingExercise: IBaseTrainingExercise) => {
		if (!training) {
			return;
		}

		onRemoveTrainingExercise(trainingExercise, training._id);
	};

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
		/>
	);
};

const mapStateToProps: MapStateToProps<IState, IProps, StoreModel> = (store: StoreModel, ownProps: IProps): IState => ({
	training: getTrainingById(store, ownProps?.navigation?.state?.params?.trainingId),
	exercises: getExerciseList(store),
	lastUserUpdatedWeight: store.user.weightData.date,
});

const mapDispatchToProps: MapDispatchToProps<IDispatch, IProps> = (dispatch: Dispatch, ownProups): IDispatch => ({
	onRemoveTrainingExercise: (e: IBaseTrainingExercise, trainingId: string) => {
		dispatch(deleteTrainingExerciseByTrainingId(trainingId, e));
	},
	onShowWeightModal: () => dispatch(setWeightModalVisible(true)),
	onGoBack: () => ownProups.navigation.navigate(Routes.Calendar),
	onUpdateTraining: (training: TrainingModel) => dispatch(updateTrainingStart(training)),
	fetchTrainingById: (id: string | undefined) => dispatch(fetchTrainingByIdStart(id)),
	onFetchExercises: () => dispatch(fetchExercisesStart(null)),
});

export const TrainingScreen = connect<IState, IDispatch, IProps, StoreModel>(
	mapStateToProps,
	mapDispatchToProps
)(Screen);

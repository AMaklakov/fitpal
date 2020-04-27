import React, { useCallback, useEffect } from 'react';
import { Training } from './training';
import { StoreModel } from '@redux/store';
import { getTrainingById } from '@redux/selector/training.selector';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Routes } from '@screen/navigator';
import { getExerciseList } from '@redux/selector/exercise.selector';
import { Dispatch } from 'redux';
import { deleteTrainingExerciseByTrainingId } from '@redux/action/training-exercise.action';
import { PropType } from '@util/type.util';
import { fetchTrainingByIdStart, updateTrainingStart } from '@redux/action/training.action';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { ExerciseModel } from '@model/exercise.model';
import { TrainingModel } from '@model/training.model';
import { IBaseTrainingExercise } from '@model/training-exercise';
import { MomentInput } from 'moment';
import { setWeightModalVisible } from '@redux/action/user.action';

interface IState {
	training?: TrainingModel;
	exercises: ExerciseModel[];
	lastUserUpdatedWeight: MomentInput;
}

interface IDispatch {
	onRemoveTrainingExercise: (e: IBaseTrainingExercise, trainingId: PropType<TrainingModel, 'id'>) => void;
	onShowWeightModal: () => void;
	onUpdateTraining: (training: TrainingModel) => void;
	fetchTrainingById: (id: string | undefined) => void;
	onGoBack: () => void;
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
	} = props;

	useEffect(() => {
		fetchTrainingById(navigation?.state?.params?.trainingId);
	}, [fetchTrainingById, navigation]);

	const addExerciseAction = (trainingExercise?: IBaseTrainingExercise) => {
		navigation.navigate({
			routeName: Routes.CreateTrainingExercise,
			params: {
				trainingId: training?.id,
				trainingExercise,
			},
		});
	};

	const removeExerciseAction = (trainingExercise: IBaseTrainingExercise) => {
		if (!training) {
			return;
		}

		onRemoveTrainingExercise(trainingExercise, training.id);
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
	onRemoveTrainingExercise: (e: IBaseTrainingExercise, trainingId: PropType<TrainingModel, 'id'>) => {
		dispatch(deleteTrainingExerciseByTrainingId(trainingId, e));
	},
	onShowWeightModal: () => dispatch(setWeightModalVisible(true)),
	onGoBack: () => ownProups.navigation.navigate(Routes.Calendar),
	onUpdateTraining: (training: TrainingModel) => dispatch(updateTrainingStart(training)),
	fetchTrainingById: (id: string | undefined) => dispatch(fetchTrainingByIdStart(id)),
});

export const TrainingScreen = connect<IState, IDispatch, IProps, StoreModel>(
	mapStateToProps,
	mapDispatchToProps
)(Screen);

import React from 'react';
import { Training } from './training';
import { StoreModel } from '@redux/store';
import { getTrainingById } from '@redux/selector/training.selector';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Routes } from '@screen/navigator';
import { getExerciseList } from '@redux/selector/exercise.selector';
import { Dispatch } from 'redux';
import { deleteTrainingExerciseByTrainingId } from '@redux/action/training-exercise.action';
import { PropType } from '@util/type.util';
import { changeTraining } from '@redux/action/training.action';
import { TrainingExerciseModel, TrainingModel } from '@model/training.model';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { ExerciseModel } from '@model/exercise.model';

interface IState {
	training?: TrainingModel;
	exercises: ExerciseModel[];
}

interface IDispatch {
	onRemoveTrainingExercise: (e: TrainingExerciseModel, trainingId: PropType<TrainingModel, 'id'>) => void;
	onChangeTraining: (training: TrainingModel) => void;
}

interface IProps extends NavigationPropsModel {}

const Screen = (props: IProps & IState & IDispatch) => {
	const { training, navigation, exercises, onRemoveTrainingExercise, onChangeTraining } = props;

	const addExerciseAction = (trainingExercise?: TrainingExerciseModel) => {
		navigation.navigate({
			routeName: Routes.CreateTrainingExercise,
			params: {
				trainingId: training?.id,
				trainingExercise,
			},
		});
	};

	const removeExerciseAction = (trainingExercise: TrainingExerciseModel) => {
		if (!training) {
			return;
		}

		onRemoveTrainingExercise(trainingExercise, training.id);
	};

	const handleUpdateTrainingName = (name: string) => {
		onChangeTraining({
			...(training as TrainingModel),
			name,
		});
	};

	return (
		<Training
			training={training}
			canEdit={true}
			addExerciseAction={addExerciseAction}
			removeExercise={removeExerciseAction}
			onUpdateTrainingName={handleUpdateTrainingName}
			changeTraining={onChangeTraining}
			exercises={exercises}
		/>
	);
};

const mapStateToProps: MapStateToProps<IState, IProps, StoreModel> = (store: StoreModel, ownProps: IProps): IState => ({
	training: getTrainingById(store, ownProps?.navigation?.state?.params?.trainingId),
	exercises: getExerciseList(store),
});

const mapDispatchToProps: MapDispatchToProps<IDispatch, IProps> = (dispatch: Dispatch): IDispatch => ({
	onRemoveTrainingExercise: (e: TrainingExerciseModel, trainingId: PropType<TrainingModel, 'id'>) => {
		dispatch(deleteTrainingExerciseByTrainingId(trainingId, e));
	},

	onChangeTraining: (training: TrainingModel) => dispatch(changeTraining(training)),
});

export const TrainingScreen = connect<IState, IDispatch, IProps, StoreModel>(
	mapStateToProps,
	mapDispatchToProps
)(Screen);

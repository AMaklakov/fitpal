import React from 'react';
import Training from './training';
import { TrainingScreenProps } from './types';
import { StoreModel } from '../../redux/store';
import { getCurrentDate } from '../../util/date.util';
import { getTrainingByDate } from '../../redux/selector/training.selector';
import { connect } from 'react-redux';
import { Routes } from '../navigator';
import { getExerciseList } from '../../redux/selector/exercise.selector';
import { TrainingExerciseModel, TrainingModel } from '@model/training.model';
import { Dispatch } from 'redux';
import { deleteTrainingExerciseByTrainingId } from '../../redux/action/training.action';
import { PropType } from '../../util/type.util';

const Screen = (props: TrainingScreenProps) => {
	const { training, navigation, exercises, dispatchRemoveTrainingExercise } = props;

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

		dispatchRemoveTrainingExercise(trainingExercise, training.id);
	};

	return (
		<Training
			training={training}
			canEdit={true}
			addExerciseAction={addExerciseAction}
			removeExercise={removeExerciseAction}
			exercises={exercises}
		/>
	);
};

const mapStateToProps = (
	store: StoreModel
): Pick<TrainingScreenProps, 'training' | 'exercises'> => ({
	training: getTrainingByDate(store, getCurrentDate()),
	exercises: getExerciseList(store),
});

const mapDispatchToProps = (
	dispatch: Dispatch
): Pick<TrainingScreenProps, 'dispatchRemoveTrainingExercise'> => ({
	dispatchRemoveTrainingExercise: (
		e: TrainingExerciseModel,
		trainingId: PropType<TrainingModel, 'id'>
	) => dispatch(deleteTrainingExerciseByTrainingId(trainingId, e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);

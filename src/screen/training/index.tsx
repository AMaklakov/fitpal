import React from 'react';
import Training from './training';
import { TrainingScreenProps } from './types';
import { StoreModel } from '../../redux/store';
import { getCurrentDate } from '../../util/date.util';
import { getTrainingByDate } from '../../redux/selector/training.selector';
import { connect } from 'react-redux';
import { Routes } from '../navigator';
import { getExerciseList } from '../../redux/selector/exercise.selector';

const Screen = (props: TrainingScreenProps) => {
	const { training, navigation, exercises } = props;

	const addExerciseAction = () => {
		navigation.navigate({
			routeName: Routes.CreateTrainingExercise,
			params: { trainingId: training?.id },
		});
	};

	return (
		<Training
			training={training}
			canEdit={true}
			addExerciseAction={addExerciseAction}
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

export default connect(mapStateToProps)(Screen);

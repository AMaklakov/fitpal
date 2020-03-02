import React from 'react';
import ExerciseList from './exercise-list';
import { Routes } from '../navigator';
import { ExerciseListScreenProps } from './types';
import { StoreModel } from '../../redux/store';
import { getExerciseList } from '../../redux/selector/exercise.selector';
import { connect } from 'react-redux';
import { ExerciseModel } from '@model/exercise.model';

const Component = (props: ExerciseListScreenProps) => {
	const { navigation, exerciseList = [] } = props;

	const goToCreateExercise = () => {
		// TODO create later
		navigation.navigate(Routes.Home);
	};

	const handleExercisePress = (exercise: ExerciseModel) => {};

	return (
		<ExerciseList
			exerciseList={exerciseList}
			goToCreateExercise={goToCreateExercise}
			onExercisePress={handleExercisePress}
		/>
	);
};

const mapStateToProps = (store: StoreModel) => {
	return {
		exerciseList: getExerciseList(store),
	};
};

export default connect(mapStateToProps)(Component);

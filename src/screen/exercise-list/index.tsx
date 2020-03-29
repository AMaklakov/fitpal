import React from 'react';
import ExerciseList from './exercise-list';
import { Routes } from '../navigator';
import { ExerciseListScreenProps } from './types';
import { StoreModel } from '../../redux/store';
import { getExerciseList } from '../../redux/selector/exercise.selector';
import { connect } from 'react-redux';
import { ExerciseModel } from '../../model/exercise.model';

const Component = (props: ExerciseListScreenProps) => {
	const { navigation, exerciseList = [] } = props;

	const goToCreateExercise = () => {
		navigation.navigate(Routes.ExerciseCreate);
	};

	const handleExercisePress = (exercise: ExerciseModel) => {
		navigation.navigate(Routes.Exercise, {
			exerciseId: exercise.id,
		});
	};

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

export const ExerciseListScreen = connect(mapStateToProps)(Component);

import React from 'react';
import ExerciseList from './exercise-list';
import { connect } from 'react-redux';
import { StoreModel } from '../../redux/store';
import { getExerciseList } from '../../redux/selector/exercise.selector';
import { Routes } from '../navigator';
import { ExerciseListScreenProps } from './types';

const Component = (props: ExerciseListScreenProps) => {
	const { navigation, exerciseList = [] } = props;

	const goToCreateExercise = () => {
		// TODO create later
		navigation.navigate(Routes.Home);
	};

	return <ExerciseList exerciseList={exerciseList} goToCreateExercise={goToCreateExercise} />;
};

const mapStateToProps = (store: StoreModel) => {
	return {
		exerciseList: getExerciseList(store),
	};
};

export default connect(mapStateToProps)(Component);

import React from 'react';
import { Routes } from '@screen/navigator';
import { StoreModel } from '@redux/store';
import { getExerciseList } from '@redux/selector/exercise.selector';
import { connect } from 'react-redux';
import { ExerciseModel } from '@model/exercise.model';
import { NavigationPropsModel } from '@model/navigation-props.model';
import ExerciseList from '@screen/exercise-list/exercise-list';

interface IState {
	exerciseList: ExerciseModel[];
}

interface IProps extends NavigationPropsModel {}

const Component = (props: IProps & IState) => {
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

const mapStateToProps = (store: StoreModel): IState => {
	return {
		exerciseList: getExerciseList(store),
	};
};

export const ExerciseListScreen = connect(mapStateToProps)(Component);

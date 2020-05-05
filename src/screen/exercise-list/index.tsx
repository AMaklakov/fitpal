import React, { FC, useCallback, useEffect } from 'react';
import { Routes } from '@screen/navigator';
import { ExerciseModel } from '@model/exercise.model';
import { NavigationPropsModel } from '@model/navigation-props.model';
import ExerciseList from '@screen/exercise-list/exercise-list';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { StoreModel } from '@redux/store';
import { getExerciseList } from '@redux/selector/exercise.selector';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchExercisesStart } from '@redux/action/exercise.action';

interface IDispatch {
	onFetch: () => void;
}

interface IState {
	isLoading: boolean;
	exerciseList: ExerciseModel[];
}

interface IProps extends NavigationPropsModel {}

const Component: FC<IProps & IState & IDispatch> = props => {
	const { navigation, exerciseList = [], onFetch, isLoading } = props;
	const { t } = useTranslation();

	useEffect(() => {
		onFetch();
	}, [onFetch]);

	const goToCreateExercise = useCallback(() => {
		navigation.navigate(Routes.ExerciseCreate);
	}, [navigation]);

	const handleExercisePress = useCallback(
		(exercise: ExerciseModel) => {
			navigation.navigate(Routes.Exercise, {
				exerciseId: exercise._id,
			});
		},
		[navigation]
	);

	if (isLoading) {
		return (
			<View>
				<Text>{t('Loading...')}</Text>
			</View>
		);
	}

	return (
		<ExerciseList
			exerciseList={exerciseList}
			goToCreateExercise={goToCreateExercise}
			onExercisePress={handleExercisePress}
		/>
	);
};

const mapStateToProps = (store: StoreModel): IState => ({
	exerciseList: getExerciseList(store),
	isLoading: store.exercise.loading,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onFetch: () => dispatch(fetchExercisesStart(null)),
});

export const ExerciseListScreen = connect(mapStateToProps, mapDispatchToProps)(Component);

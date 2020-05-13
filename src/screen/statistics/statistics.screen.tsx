import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { StoreModel } from '@redux/store';
import { ICreateTraining, TrainingModel } from '@model/training.model';
import { IFetchByDateRange, TRAINING_ACTION_CREATORS } from '@redux/action/training-exercise.action';
import { ExerciseModel } from '@model/exercise.model';
import { selectLastDays } from '@redux/selector/training.selector';
import { H1 } from '@components/heading/h1';
import { useTranslation } from 'react-i18next';
import { LastDaysStatistics } from '@screen/statistics/components/last-days';
import { CompactTrainingView } from '@screen/statistics/components/compact-training-view';
import { EXERCISE_ACTION_CREATORS } from '@redux/action/exercise.action';

interface IDispatch {
	onFetch: (data: IFetchByDateRange) => void;
	onCreateTraining: (training: ICreateTraining) => void;
	onFetchExercises: () => void;
}

interface IState {
	trainings: TrainingModel[];
	exercises: ExerciseModel[];
	isFetchingExercises: boolean;
}

interface IProps {}

type ModeType = 'lastDays' | 'week';

const Statistics = (props: IProps & IState & IDispatch) => {
	const { trainings, exercises, onFetch, onFetchExercises, isFetchingExercises } = props;
	const { t } = useTranslation();

	const [mode] = useState<ModeType>('lastDays');
	const [currentTraining, setCurrentTraining] = useState<TrainingModel | null>(null);

	useEffect(() => {
		if (!exercises.length && !isFetchingExercises) {
			onFetchExercises();
		}
	}, [exercises, isFetchingExercises, onFetchExercises]);

	const handleShowTraining = useCallback((t: TrainingModel) => setCurrentTraining(t), []);

	return (
		<View style={styles.wrapper}>
			<H1 text={t('Statistics')} />

			{mode === 'lastDays' && (
				<LastDaysStatistics
					trainings={trainings}
					daysCount={10}
					onFetch={onFetch}
					onShowTraining={handleShowTraining}
				/>
			)}

			{currentTraining && <CompactTrainingView training={currentTraining} exercises={exercises} />}
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
});

const mapStateToProps: MapStateToPropsParam<IState, IProps, StoreModel> = state => {
	return {
		trainings: selectLastDays(state, 10),
		exercises: state.exercise.exercises,
		isFetchingExercises: state.exercise.loading,
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatch, IProps> = dispatch => {
	return {
		onFetch: data => dispatch(TRAINING_ACTION_CREATORS.FETCH_BY_DATE_RANGE.START(data)),
		onCreateTraining: training => dispatch(TRAINING_ACTION_CREATORS.CREATE.START(training)),
		onFetchExercises: () => dispatch(EXERCISE_ACTION_CREATORS.FETCH.START(null)),
	};
};

export const StatisticsScreen = connect(mapStateToProps, mapDispatchToProps)(Statistics);

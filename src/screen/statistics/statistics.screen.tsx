import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { StoreModel } from '@redux/store';
import { ICreateTraining, TrainingModel } from '@model/training.model';
import { IFetchByDateRange, TRAINING_ACTION_CREATORS } from '@redux/action/training-exercise.action';
import { ExerciseModel } from '@model/exercise.model';
import { selectByDates, selectLastDays } from '@redux/selector/training.selector';
import { H1 } from '@components/heading/h1';
import { useTranslation } from 'react-i18next';
import { LastDaysStatistics } from '@screen/statistics/components/last-days';
import { CompactTrainingView } from '@screen/statistics/components/compact-training-view';
import { EXERCISE_ACTION_CREATORS } from '@redux/action/exercise.action';
import { WeeklyChart } from '@screen/statistics/components/weekly-chart';
import { Moment } from 'moment';
import { SelectInput } from '@components/select-input';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { Routes } from '@screen/routes';

interface IDispatch {
	onFetch: (data: IFetchByDateRange) => void;
	onCreateTraining: (training: ICreateTraining) => void;
	onFetchExercises: () => void;
}

interface IState {
	trainings: TrainingModel[];
	exercises: ExerciseModel[];
	isFetchingExercises: boolean;

	trainingsByDates: (start: Moment, end: Moment) => TrainingModel[];
}

interface IProps extends NavigationPropsModel {}

type ModeType = 'lastDays' | 'weekly';

const Statistics = (props: IProps & IState & IDispatch) => {
	const { trainings, exercises, onFetch, onFetchExercises, isFetchingExercises, trainingsByDates, navigation } = props;
	const { t } = useTranslation();

	const [mode, setMode] = useState<ModeType>('weekly');
	const [currentTraining, setCurrentTraining] = useState<TrainingModel | null>(null);

	useEffect(() => {
		if (!exercises.length && !isFetchingExercises) {
			onFetchExercises();
		}
	}, [exercises, isFetchingExercises, onFetchExercises]);

	const selectItems = useMemo<Array<{ label: string; value: ModeType }>>(
		() => [
			{
				label: t('Weekly'),
				value: 'weekly',
			},
			{
				label: t('Last 10 days'),
				value: 'lastDays',
			},
		],
		[t]
	);

	const handleShowTraining = useCallback((t: TrainingModel | null) => setCurrentTraining(t), []);

	const handleSelectMode = useCallback((value: ModeType | null) => {
		setMode(value || 'weekly');
		setCurrentTraining(null);
	}, []);

	const handleNavigateToTraining = useCallback(
		(id: string) => navigation.navigate(Routes.Training, { trainingId: id }),
		[navigation]
	);

	const handleNavigateToExercise = useCallback(
		(id: string) => navigation.navigate(Routes.Exercise, { exerciseId: id }),
		[navigation]
	);

	return (
		<ScrollView style={styles.wrapper}>
			<View style={styles.headerWrapper}>
				<H1 text={t('Statistics')} style={styles.h1} />

				<View style={styles.inputWrapper}>
					<SelectInput items={selectItems} onChange={handleSelectMode} value={mode} placeholder={{}} />
				</View>
			</View>

			{mode === 'lastDays' && (
				<LastDaysStatistics
					trainings={trainings}
					daysCount={10}
					onFetch={onFetch}
					onShowTraining={handleShowTraining}
				/>
			)}
			{mode === 'weekly' && (
				<WeeklyChart trainingsByDates={trainingsByDates} onFetch={onFetch} onShowTraining={handleShowTraining} />
			)}

			{currentTraining && (
				<View style={styles.trainingWrapper}>
					<CompactTrainingView
						training={currentTraining}
						exercises={exercises}
						onTrainingHeadingPress={handleNavigateToTraining}
						onExerciseNamePress={handleNavigateToExercise}
					/>
				</View>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	h1: {
		textAlign: 'left',
	},
	headerWrapper: {
		marginVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	inputWrapper: {
		minWidth: '40%',
	},
	trainingWrapper: {
		paddingHorizontal: 20,
	},
});

const mapStateToProps: MapStateToPropsParam<IState, IProps, StoreModel> = state => {
	return {
		trainingsByDates: (start, end) => selectByDates(state, start, end),
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

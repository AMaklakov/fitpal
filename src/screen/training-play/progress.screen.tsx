import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Timer } from '@components/timer/timer';
import { Button } from '@components/button/button';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { StoreModel } from '@redux/store';
import { TrainingModel } from '@model/training.model';
import { ExerciseModel } from '@model/exercise.model';
import { Dispatch } from 'redux';
import { ISetSeries, TRAINING_PLAY_ACTION_CREATORS } from '@redux/action/training-play.action';
import first from 'lodash/first';
import { IBaseTrainingExercise, ISeries } from '@model/training-exercise';
import { isPresent } from '@util/type.util';
import { ShowCurrentSeries } from '@screen/training-play/components/show-current-series';
import { Routes } from '@screen/navigator';
import { DEFAULT_REST_TIMER_SECONDS } from '@const/app.const';

interface IProps extends NavigationPropsModel {}

interface IState {
	training: TrainingModel | null;
	exercises: ExerciseModel[];
	currentSeriesId: string | null;
	currentExerciseId: string | null;
}

interface IDispatch {
	onSetSeries: (data: ISetSeries) => void;
}

const Progress: FC<IProps & IState & IDispatch> = props => {
	const { training, exercises, navigation, currentSeriesId, onSetSeries, currentExerciseId } = props;
	const { t } = useTranslation();

	const goBack = useCallback(() => navigation.goBack(), [navigation]);

	useEffect(() => {
		if (!training || !training.exerciseList.length) {
			goBack();
		}
	}, [goBack, training]);

	useEffect(() => {
		if (!currentSeriesId || !currentExerciseId) {
			const firstEx = first(training?.exerciseList);
			onSetSeries({
				exerciseId: firstEx?._id ?? null,
				seriesId: first(firstEx?.seriesList)?._id ?? null,
			});
		}
	}, [currentExerciseId, currentSeriesId, onSetSeries, training]);
	const currentExercise = useMemo(() => training?.exerciseList.find(x => x._id === currentExerciseId), [
		currentExerciseId,
		training,
	]);
	const currentSeries = useMemo(() => currentExercise?.seriesList.find(x => x._id === currentSeriesId), [
		currentExercise,
		currentSeriesId,
	]);

	const [isEnded, setIsEnded] = useState(false);
	const [isOpenRestTimer, setIsOpenRestTimer] = useState(false);
	const handleTimerEnd = useCallback(() => setIsEnded(true), []);

	const handleOpenModal = useCallback(() => {
		setIsEnded(false);
		setIsOpenRestTimer(true);
	}, []);

	const handelCloseModal = useCallback(() => {
		setIsOpenRestTimer(false);
	}, []);

	const handleFinishSeries = useCallback(() => {
		handelCloseModal();

		if (!training || !currentExercise || !currentSeries) {
			return;
		}

		const [nextExerciseId, nextSeriesId] = getNextSeries(training, currentExercise, currentSeries);
		if (!isPresent(nextExerciseId) && !isPresent(nextSeriesId)) {
			navigation.navigate(Routes.TrainingPlayResult);
		}
		onSetSeries({ exerciseId: nextExerciseId ?? null, seriesId: nextSeriesId ?? null });
	}, [currentExercise, currentSeries, handelCloseModal, navigation, onSetSeries, training]);

	if (!training || !currentExercise || !currentSeries || !currentExerciseId || !currentSeriesId) {
		return null;
	}

	return (
		<View style={styles.wrapper}>
			<View style={styles.fullHeight}>
				<ShowCurrentSeries
					exercises={exercises}
					training={training}
					currentExerciseId={currentExerciseId}
					currentSeriesId={currentSeriesId}
				/>
				<View style={styles.buttonsWrapper}>
					<Button solidType="gray" title={t('Skip')} />
					<Button title={t('Finish Series')} onPress={handleOpenModal} />
				</View>
			</View>

			<Overlay isVisible={isOpenRestTimer}>
				<View style={styles.modalWrapper}>
					<Timer time={DEFAULT_REST_TIMER_SECONDS} onEnd={handleTimerEnd}>
						{isEnded && <Button title={t('Continue')} onPress={handleFinishSeries} />}
						{!isEnded && <Button solidType="gray" title={t('Skip')} onLongPress={handleFinishSeries} />}
					</Timer>
				</View>
			</Overlay>
		</View>
	);
};

// TODO add unit tests for it
const getNextSeries = (
	training: TrainingModel,
	exercise: IBaseTrainingExercise,
	series: ISeries
): [string | undefined, string | undefined] => {
	const nextExerciseIndex = training?.exerciseList.findIndex(x => x._id === exercise._id) + 1;
	const nextSeriesIndex = exercise.seriesList.findIndex(x => x._id === series._id) + 1;
	const nextExercise = training.exerciseList[nextExerciseIndex];
	const nextSeries = exercise.seriesList[nextSeriesIndex];
	return nextSeries ? [exercise._id, nextSeries._id] : [nextExercise?._id, nextExercise?.seriesList?.[0]?._id];
};

const styles = StyleSheet.create({
	wrapper: {
		margin: 10,
		flex: 1,
	},
	fullHeight: {
		flex: 1,
	},
	modalWrapper: {
		minWidth: '80%',
	},
	buttonsWrapper: {
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

const mapStateToProps = (store: StoreModel): IState => ({
	training: store.trainingPlay.training,
	exercises: store.exercise.exercises,
	currentSeriesId: store.trainingPlay.currentSeriesId,
	currentExerciseId: store.trainingPlay.currentExerciseId,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onSetSeries: (data: ISetSeries) => dispatch(TRAINING_PLAY_ACTION_CREATORS.SET_SERIES(data)),
});

export const TrainingPlayProgressScreen = connect(mapStateToProps, mapDispatchToProps)(Progress);

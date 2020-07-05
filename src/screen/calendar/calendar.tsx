import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { getToday } from '@util/date.util';
import moment, { Moment, MomentInput } from 'moment';
import { TrainingModel } from '@model/training.model';
import { NavigationPropsModel } from '@model/navigation-props.model';
import {
	toggleCalendarTrainingModalAction,
	updateDateInTrainingModalAction,
	updateTrainingModalAction,
} from '@redux/action/calendar-training-modal.action';
import { TrainingListMinimalView } from '@components/training-minimal-view/training-list-minimal-view';
import { CalendarStrip, IMarkedDate } from '@components/calendar/calendar-strip';
import { getTrainingListByDate, selectByDates } from '@redux/selector/training.selector';
import { StoreModel } from '@redux/store';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';
import { Colors, PALETTE_COLORS } from '@css/colors.style';
import { H2 } from '@components/heading/h2';
import { Routes } from '@screen/routes';
import { Button } from '@components/button/button';
import { TRAINING_ACTION_CREATORS } from '@redux/action/training-exercise.action';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Calendar as CalendarMonth } from '@components/calendar/calendar';
import { fetchExercisesStart } from '@redux/action/exercise.action';
import { getExerciseList } from '@redux/selector/exercise.selector';
import { ExerciseModel } from '@model/exercise.model';
import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';
import { TRAINING_PLAY_ACTION_CREATORS } from '@redux/action/training-play.action';

interface IDispatch {
	fetchTrainingListByDateRange: (startDate: Moment, endDate: Moment) => void;
	deleteTrainingById: (trainingId: string) => void;
	openTrainingModal: (training?: TrainingModel, date?: MomentInput) => void;
	onFetchExercises: () => void;
	onSetTrainingPlayId: (training: TrainingModel) => void;
	onEditTraining: (training: TrainingModel) => void;
}

interface IState {
	selectTrainingListByDate: (date: Moment) => TrainingModel[];
	selectTrainingListByDateRange: (startDate: Moment, endDate: Moment) => TrainingModel[];
	isFetching: boolean;
	hasErrors: boolean;
}

interface IProps extends NavigationPropsModel {
	exercises: ExerciseModel[];
}

type ICalendarTypes = 'strip' | 'month';

const Calendar = (props: IProps & IState & IDispatch) => {
	const { navigation, fetchTrainingListByDateRange, deleteTrainingById, openTrainingModal } = props;
	const { selectTrainingListByDate, onFetchExercises, exercises, isFetching, hasErrors } = props;
	const { selectTrainingListByDateRange, onSetTrainingPlayId, onEditTraining } = props;
	const { t } = useTranslation();

	const [selectedDate, setSelectedDate] = useState(getToday());
	const [trainingToDelete, setTrainingToDelete] = useState<TrainingModel | undefined>();
	const trainingList = useMemo(() => selectTrainingListByDate(selectedDate), [selectTrainingListByDate, selectedDate]);
	const [calendarType, setCalendarType] = useState<ICalendarTypes>('strip');

	const [viewedStartDate, setViewedStartDate] = useState(moment());
	const trainingsInDateRange = useMemo(() => {
		const unit = calendarType === 'strip' ? 'week' : 'month';
		return selectTrainingListByDateRange(viewedStartDate.clone().startOf(unit), viewedStartDate.clone().endOf(unit));
	}, [calendarType, selectTrainingListByDateRange, viewedStartDate]);
	const [markedDates, setMarkedDates] = useState<Array<IMarkedDate>>([]);
	useEffect(() => {
		const newMarkedDates = uniq(trainingsInDateRange.map(x => x.date)).map<IMarkedDate>(date => ({
			date: moment(date),
			dots: trainingsInDateRange
				.filter(x => x.date === date)
				.map(x => ({
					color: x.color || PALETTE_COLORS[0],
				})),
		}));

		if (!isEqual(markedDates, newMarkedDates)) {
			setMarkedDates(newMarkedDates);
		}
	}, [markedDates, trainingsInDateRange]);

	useEffect(() => {
		const unit = calendarType === 'strip' ? 'week' : 'month';
		const [startDate, endDate] = [viewedStartDate.clone().startOf(unit), viewedStartDate.clone().endOf(unit)];
		fetchTrainingListByDateRange(startDate, endDate);
	}, [calendarType, fetchTrainingListByDateRange, viewedStartDate]);

	useEffect(() => {
		if (exercises.length === 0 && !isFetching && !hasErrors) {
			onFetchExercises();
		}
	}, [onFetchExercises, exercises, isFetching, hasErrors]);

	const handleOpenDeleteDialog = useCallback((training: TrainingModel) => setTrainingToDelete(training), []);
	const handleCloseDeleteDialog = useCallback(() => setTrainingToDelete(undefined), []);
	const handleConfirmDelete = useCallback(() => {
		handleCloseDeleteDialog();
		if (trainingToDelete) {
			deleteTrainingById(trainingToDelete._id);
		}
	}, [deleteTrainingById, handleCloseDeleteDialog, trainingToDelete]);

	const handleChangeSelectedDate = useCallback((date: MomentInput) => setSelectedDate(moment(date)), []);

	const handleOnTrainingTouch = useCallback(
		(training: TrainingModel) => navigation.navigate(Routes.Training, { trainingId: training?._id }),
		[navigation]
	);

	const handleCopyTraining = useCallback((training: TrainingModel) => openTrainingModal(training), [openTrainingModal]);

	const handleCreateTraining = useCallback(() => openTrainingModal(undefined, selectedDate), [
		openTrainingModal,
		selectedDate,
	]);

	const handleCalendarSwipeUp = useCallback(() => {
		if (calendarType === 'month') {
			setCalendarType('strip');
		}
	}, [calendarType]);

	const handleCalendarSwipeDown = useCallback(() => {
		if (calendarType === 'strip') {
			setCalendarType('month');
		}
	}, [calendarType]);

	const handleExercisePress = useCallback(
		(id: string) => {
			navigation.navigate(Routes.Exercise, { exerciseId: id });
		},
		[navigation]
	);

	const handleChangeViewedWeek = useCallback((weekStart: Moment) => setViewedStartDate(weekStart), []);
	const handleMonthChange = useCallback((month: Moment) => setViewedStartDate(month), []);

	const handleStartTraining = useCallback(
		(training: TrainingModel) => {
			// TODO check training exercises lengths and series
			onSetTrainingPlayId(training);
			navigation.navigate(Routes.TrainingPlayDetails);
		},
		[navigation, onSetTrainingPlayId]
	);

	const handleOpenEditDialog = useCallback((training: TrainingModel) => onEditTraining(training), [onEditTraining]);

	return (
		<View style={styles.wrapper}>
			<GestureRecognizer onSwipeDown={handleCalendarSwipeDown} onSwipeUp={handleCalendarSwipeUp}>
				{calendarType === 'strip' && (
					<CalendarStrip
						selectedDate={selectedDate}
						changeSelectedDate={handleChangeSelectedDate}
						onWeekChange={handleChangeViewedWeek}
						markedDates={markedDates}
					/>
				)}
				{calendarType === 'month' && (
					<CalendarMonth
						selectedDate={selectedDate}
						onDateChange={handleChangeSelectedDate}
						onMonthChanged={handleMonthChange}
						customMarkedDates={markedDates}
					/>
				)}
			</GestureRecognizer>

			<View style={styles.wrapper}>
				<TrainingListMinimalView
					onCopy={handleCopyTraining}
					onDelete={handleOpenDeleteDialog}
					onEdit={handleOpenEditDialog}
					trainingList={trainingList}
					exercises={exercises}
					onTrainingPress={handleOnTrainingTouch}
					onTrainingStart={handleStartTraining}
					onExercisePress={handleExercisePress}
				/>
			</View>

			<View>
				<Modal isVisible={!!trainingToDelete}>
					<View style={styles.modal}>
						<H2
							style={styles.h2}
							text={t('Are you sure want to delete |item| ?', { item: trainingToDelete?.name || '' })}
						/>

						<View style={styles.buttonWrapper}>
							<Button type="clear" title={t('Delete')} onPress={handleConfirmDelete} titleStyle={styles.redText} />
							<Button solidType="gray" title={t('Cancel')} onPress={handleCloseDeleteDialog} />
						</View>
					</View>
				</Modal>
			</View>

			<View style={styles.buttonContainer}>
				<Button solidType="purple" title={t('Add training +')} onPress={handleCreateTraining} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	modal: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: Colors.White,
	},
	h2: {
		paddingBottom: 24,
	},
	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	wrapper: {
		flex: 1,
	},
	buttonContainer: {
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	redText: {
		color: Colors.LightRed,
	},
});

const mapStateToProps: MapStateToPropsParam<IState, IProps, StoreModel> = state => {
	return {
		selectTrainingListByDate: (date: Moment) => getTrainingListByDate(state, date),
		selectTrainingListByDateRange: (startDate: Moment, endDate: Moment) => selectByDates(state, startDate, endDate),
		exercises: getExerciseList(state),
		isFetching: state.exercise.loading,
		hasErrors: !!state.exercise.error,
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatch, IProps> = dispatch => {
	return {
		fetchTrainingListByDateRange: (startDate: Moment, endDate: Moment) =>
			dispatch(TRAINING_ACTION_CREATORS.FETCH_BY_DATE_RANGE.START({ startDate, endDate })),
		deleteTrainingById: (trainingId: string) => dispatch(TRAINING_ACTION_CREATORS.DELETE.START(trainingId)),
		openTrainingModal: (training?: TrainingModel, date?: MomentInput) => {
			dispatch(updateTrainingModalAction(training ?? null));
			dispatch(updateDateInTrainingModalAction(date ?? null));
			dispatch(toggleCalendarTrainingModalAction(true));
		},
		onFetchExercises: () => dispatch(fetchExercisesStart(null)),
		onSetTrainingPlayId: training => dispatch(TRAINING_PLAY_ACTION_CREATORS.SET_TRAINING(training)),
		onEditTraining: training => dispatch(TRAINING_ACTION_CREATORS.SET_TO_UPDATE(training?._id)),
	};
};

export const CalendarScreen = connect(mapStateToProps, mapDispatchToProps)(Calendar);

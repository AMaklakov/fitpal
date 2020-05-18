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
import { CalendarStrip } from '@components/calendar/calendar-strip';
import { getTrainingListByDate } from '@redux/selector/training.selector';
import { StoreModel } from '@redux/store';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';
import { Colors } from '@css/colors.style';
import { H2 } from '@components/heading/h2';
import { Routes } from '@screen/navigator';
import { Button } from '@components/button/button';
import { TRAINING_ACTION_CREATORS } from '@redux/action/training-exercise.action';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Calendar as CalendarMonth } from '@components/calendar/calendar';

interface IDispatch {
	fetchTrainingListByDate: (date: Moment) => void;
	deleteTrainingById: (trainingId: string) => void;
	openTrainingModal: (training?: TrainingModel, date?: MomentInput) => void;
}

interface IState {
	selectTrainingListByDate: (date: Moment) => TrainingModel[] | undefined;
}

interface IProps extends NavigationPropsModel {}

type ICalendarTypes = 'strip' | 'month';

const Calendar = (props: IProps & IState & IDispatch) => {
	const {
		navigation,
		fetchTrainingListByDate,
		deleteTrainingById,
		openTrainingModal,
		selectTrainingListByDate,
	} = props;
	const { t } = useTranslation();

	const [selectedDate, setSelectedDate] = useState(getToday());
	const [trainingToDelete, setTrainingToDelete] = useState<TrainingModel | undefined>();
	const trainingList = useMemo(() => selectTrainingListByDate(selectedDate), [selectTrainingListByDate, selectedDate]);
	const [calendarType, setCalendarType] = useState<ICalendarTypes>('strip');

	useEffect(() => {
		fetchTrainingListByDate(selectedDate);
	}, [fetchTrainingListByDate, selectedDate]);

	const handleOpenDeleteTrainingConfirm = useCallback((training: TrainingModel) => setTrainingToDelete(training), []);

	const handleCloseDeleteTrainingConfirm = useCallback(() => setTrainingToDelete(undefined), []);

	const handleChangeSelectedDate = useCallback((date: MomentInput) => setSelectedDate(moment(date)), []);

	const handleOnTrainingTouch = useCallback(
		(training: TrainingModel) => navigation.navigate(Routes.Training, { trainingId: training?._id }),
		[navigation]
	);

	const handleCopyTraining = useCallback((training: TrainingModel) => openTrainingModal(training), [openTrainingModal]);

	const handleDeleteTraining = useCallback((training: TrainingModel) => deleteTrainingById(training._id), [
		deleteTrainingById,
	]);

	const deleteTraining = useCallback(() => {
		if (trainingToDelete) {
			handleDeleteTraining(trainingToDelete);
		}

		handleCloseDeleteTrainingConfirm();
	}, [handleCloseDeleteTrainingConfirm, handleDeleteTraining, trainingToDelete]);

	const handleCreateTraining = useCallback(() => openTrainingModal(undefined, selectedDate), [
		openTrainingModal,
		selectedDate,
	]);

	const handleChangeCalendarType = useCallback(
		() => setCalendarType(type => (type === 'strip' ? 'month' : 'strip')),
		[]
	);

	return (
		<View style={styles.wrapper}>
			<GestureRecognizer onSwipeDown={handleChangeCalendarType}>
				{calendarType === 'strip' && (
					<CalendarStrip selectedDate={selectedDate} changeSelectedDate={handleChangeSelectedDate} />
				)}
				{calendarType === 'month' && (
					<CalendarMonth selectedDate={selectedDate} onDateChange={handleChangeSelectedDate} />
				)}
			</GestureRecognizer>

			<View style={styles.wrapper}>
				<TrainingListMinimalView
					onCopy={handleCopyTraining}
					onDelete={handleOpenDeleteTrainingConfirm}
					trainingList={trainingList}
					onTrainingPress={handleOnTrainingTouch}
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
							<Button type="clear" title={t('Delete')} onPress={deleteTraining} titleStyle={styles.redText} />
							<Button title={t('Hide modal')} onPress={handleCloseDeleteTrainingConfirm} />
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
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginBottom: 15,
	},
	redText: {
		color: Colors.LightRed,
	},
});

const mapStateToProps: MapStateToPropsParam<IState, IProps, StoreModel> = state => {
	return {
		selectTrainingListByDate: (date: Moment) => getTrainingListByDate(state, date),
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatch, IProps> = dispatch => {
	return {
		fetchTrainingListByDate: (date: Moment) => dispatch(TRAINING_ACTION_CREATORS.FETCH_BY_DATE.START(date)),
		deleteTrainingById: (trainingId: string) => dispatch(TRAINING_ACTION_CREATORS.DELETE.START(trainingId)),
		openTrainingModal: (training?: TrainingModel, date?: MomentInput) => {
			dispatch(updateTrainingModalAction(training ?? null));
			dispatch(updateDateInTrainingModalAction(date ?? null));
			dispatch(toggleCalendarTrainingModalAction(true));
		},
	};
};

export const CalendarScreen = connect(mapStateToProps, mapDispatchToProps)(Calendar);

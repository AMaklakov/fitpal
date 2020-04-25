import React, { useEffect, useMemo, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { formatDate, getToday } from '@util/date.util';
import moment, { Moment } from 'moment';
import { PropType } from '@util/type.util';
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
import { deleteTrainingByIdAction, fetchTrainingsByDateStart } from '@redux/action/training.action';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';
import { Colors } from '@css/colors.style';
import { H2 } from '@components/heading/h2';
import { Routes } from '@screen/navigator';

interface IDispatch {
	fetchTrainingListByDate: (date: Moment) => void;
	deleteTrainingById: (trainingId: PropType<TrainingModel, 'id'>) => void;
	openTrainingModal: (training?: TrainingModel, date?: string) => void;
}

interface IState {
	selectTrainingListByDate: (date: Moment) => TrainingModel[] | undefined;
}

interface IProps extends NavigationPropsModel {}

const Calendar = (props: IProps & IState & IDispatch) => {
	const {
		navigation,
		fetchTrainingListByDate,
		deleteTrainingById,
		openTrainingModal,
		selectTrainingListByDate,
	} = props;
	const { t } = useTranslation();

	const [selectedDate, changeSelectedDate] = useState(getToday());
	const [trainingToDelete, changeTrainingToDelete] = useState<TrainingModel | undefined>();
	const trainingList = useMemo(() => selectTrainingListByDate(selectedDate), [selectTrainingListByDate, selectedDate]);

	useEffect(() => {
		fetchTrainingListByDate(selectedDate);
	}, [fetchTrainingListByDate, selectedDate]);

	const handleOpenDeleteTrainingConfirm = (training: TrainingModel) => {
		changeTrainingToDelete(training);
	};

	const handleCloseDeleteTrainingConfirm = () => {
		changeTrainingToDelete(undefined);
	};

	const deleteTraining = () => {
		if (trainingToDelete) {
			handleDeleteTraining(trainingToDelete);
		}

		handleCloseDeleteTrainingConfirm();
	};

	const handleChangeSelectedDate = (date: moment.Moment) => {
		changeSelectedDate(date);
	};

	const handleOnTrainingTouch = (training: TrainingModel) => {
		navigation.navigate(Routes.Training, {
			trainingId: training?.id,
		});
	};

	const handleCopyTraining = (training: TrainingModel) => {
		openTrainingModal(training);
	};

	const handleDeleteTraining = (training: TrainingModel) => {
		deleteTrainingById(training.id);
	};

	const handleCreateTraining = () => {
		openTrainingModal(undefined, formatDate(selectedDate));
	};

	return (
		<View style={styles.wrapper}>
			<CalendarStrip selectedDate={selectedDate} changeSelectedDate={handleChangeSelectedDate} />

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
							<Button color={Colors.LightRed} title={t('Delete')} onPress={deleteTraining} />
							<Button title={t('Hide modal')} onPress={handleCloseDeleteTrainingConfirm} />
						</View>
					</View>
				</Modal>
			</View>

			<View style={styles.buttonContainer}>
				<Button title={t('Add training +')} onPress={handleCreateTraining} />
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
	},
	wrapper: {
		flex: 1,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		height: 50,
	},
});

const mapStateToProps: MapStateToPropsParam<IState, IProps, StoreModel> = state => {
	return {
		selectTrainingListByDate: (date: Moment) => getTrainingListByDate(state, date),
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatch, IProps> = dispatch => {
	return {
		fetchTrainingListByDate: (date: Moment) => dispatch(fetchTrainingsByDateStart(date)),
		deleteTrainingById: (trainingId: PropType<TrainingModel, 'id'>) => dispatch(deleteTrainingByIdAction(trainingId)),
		openTrainingModal: (training?: TrainingModel, date?: string) => {
			dispatch(updateTrainingModalAction(training ?? null));
			dispatch(updateDateInTrainingModalAction(date ?? null));
			dispatch(toggleCalendarTrainingModalAction(true));
		},
	};
};

export const CalendarScreen = connect(mapStateToProps, mapDispatchToProps)(Calendar);

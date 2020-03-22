import React, { useMemo, useState } from 'react';
import { Button, View } from 'react-native';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { DEFAULT_DATE_FORMAT, formatDate, getToday } from '../../util/date.util';
import moment from 'moment';
import { PropType } from '../../util/type.util';
import { TrainingModel } from '../../model/training.model';
import { NavigationPropsModel } from '../../model/navigation-props.model';
import {
	toggleCalendarTrainingModalAction,
	updateDateInTrainingModalAction,
	updateTrainingModalAction,
} from '../../redux/action/calendar-training-modal.action';
import { TrainingListMinimalView } from '../../components/training-minimal-view/training-list-minimal-view';
import { CalendarStrip } from '../../components/calendar/calendar-strip';
import { Routes } from '../navigator';
import { getTrainingListByDate } from '../../redux/selector/training.selector';
import { StoreModel } from '../../redux/store';
import { deleteTrainingByIdAction } from '../../redux/action/training.action';
import { useTranslation } from 'react-i18next';

interface IDispatchToProps {
	deleteTrainingById: (trainingId: PropType<TrainingModel, 'id'>) => void;
	openTrainingModal: (training?: TrainingModel, date?: string) => void;
}

interface IStateToProps {
	fetchTrainingListByDate: (date: string) => TrainingModel[] | undefined;
}

interface IProps extends NavigationPropsModel {}

const Calendar = (props: IProps & IStateToProps & IDispatchToProps) => {
	const { navigation, fetchTrainingListByDate, deleteTrainingById, openTrainingModal } = props;
	const { t } = useTranslation();

	const [selectedDate, changeSelectedDate] = useState(getToday());
	const trainingList = useMemo(() => fetchTrainingListByDate(formatDate(selectedDate, DEFAULT_DATE_FORMAT)), [
		fetchTrainingListByDate,
		selectedDate,
	]);

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
		openTrainingModal(undefined, formatDate(selectedDate, DEFAULT_DATE_FORMAT));
	};

	return (
		<View>
			<CalendarStrip selectedDate={selectedDate} changeSelectedDate={handleChangeSelectedDate} />

			<TrainingListMinimalView
				onCopy={handleCopyTraining}
				onDelete={handleDeleteTraining}
				trainingList={trainingList}
				onTrainingPress={handleOnTrainingTouch}
			/>

			<Button title={t('Add training +')} onPress={handleCreateTraining} />
		</View>
	);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps: MapStateToPropsParam<IStateToProps, IProps, StoreModel> = (state, ownProps) => {
	return {
		fetchTrainingListByDate: (date: string) => getTrainingListByDate(state, date),
	};
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapDispatchToProps: MapDispatchToPropsParam<IDispatchToProps, IProps> = (dispatch, ownProps) => {
	return {
		deleteTrainingById: (trainingId: PropType<TrainingModel, 'id'>) => dispatch(deleteTrainingByIdAction(trainingId)),
		openTrainingModal: (training?: TrainingModel, date?: string) => {
			dispatch(updateTrainingModalAction(training ?? null));
			dispatch(updateDateInTrainingModalAction(date ?? null));
			dispatch(toggleCalendarTrainingModalAction(true));
		},
	};
};

export const CalendarScreen = connect(mapStateToProps, mapDispatchToProps)(Calendar);

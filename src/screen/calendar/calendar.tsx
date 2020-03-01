import React, { useMemo, useState } from 'react';
import { Alert, Button, View } from 'react-native';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { CalendarStrip } from '../../components/calendar/calendar-strip';
import { DEFAULT_DATE_FORMAT, formatDate, getToday } from '../../util/date.util';
import moment from 'moment';
import { TrainingModel } from '@model/training.model';
import { StoreModel } from '../../redux/store';
import { getTrainingListByDate } from '../../redux/selector/training.selector';
import { TrainingListMinimalView } from '../../components/training-minimal-view/training-list-minimal-view';
import { Routes } from '../navigator';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { PropType } from '../../util/type.util';
import {
	createTrainingAction,
	deleteTrainingById as deleteTrainingByIdAction,
} from '../../redux/action/training.action';

interface IDispatchToProps {
	deleteTrainingById: (trainingId: PropType<TrainingModel, 'id'>) => void;
	createTrainingByDate: (training: Partial<TrainingModel>) => void;
}

interface IStateToProps {
	fetchTrainingListByDate: (date: string) => TrainingModel[] | undefined;
}

interface IProps extends NavigationPropsModel {}

const Calendar = (props: IProps & IStateToProps & IDispatchToProps) => {
	const { navigation, fetchTrainingListByDate, deleteTrainingById, createTrainingByDate } = props;

	const [selectedDate, changeSelectedDate] = useState(getToday());
	const trainingList = useMemo(
		() => fetchTrainingListByDate(formatDate(selectedDate, DEFAULT_DATE_FORMAT)),
		[fetchTrainingListByDate, selectedDate]
	);

	const handleChangeSelectedDate = (date: moment.Moment) => {
		changeSelectedDate(date);
	};

	const handleOnTrainingTouch = (training: TrainingModel) => {
		navigation.navigate(Routes.Training, {
			trainingId: training?.id,
		});
	};

	const handleCopyTraining = (training: TrainingModel) => {};

	const handleDeleteTraining = (training: TrainingModel) => {
		deleteTrainingById(training.id);
	};

	const handleCreateTraining = () => {
		Alert.prompt('Enter training name', undefined, (name: string) => {
			const training: Partial<TrainingModel> = {
				name,
				exerciseList: [],
				date: formatDate(selectedDate, DEFAULT_DATE_FORMAT),
			};

			createTrainingByDate(training);
		});
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

			<Button title="Add training +" onPress={handleCreateTraining} />
		</View>
	);
};

const mapStateToProps: MapStateToPropsParam<IStateToProps, IProps, StoreModel> = (
	state,
	ownProps
) => {
	return {
		fetchTrainingListByDate: (date: string) => getTrainingListByDate(state, date),
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatchToProps, IProps> = (
	dispatch,
	ownProps
) => {
	return {
		deleteTrainingById: (trainingId: PropType<TrainingModel, 'id'>) =>
			dispatch(deleteTrainingByIdAction(trainingId)),
		createTrainingByDate: (training: Partial<TrainingModel>) => {
			const action = createTrainingAction(training);

			if (action) {
				dispatch(action);
			}
		},
	};
};

export const CalendarScreen = connect(mapStateToProps, mapDispatchToProps)(Calendar);

import React, { useMemo, useState } from 'react';
import { Button, View } from 'react-native';
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

interface IDispatchToProps {}

interface IStateToProps {
	fetchTrainingListByDate: (date: string) => TrainingModel[] | undefined;
}

interface IProps extends NavigationPropsModel {}

const Calendar = (props: IProps & IStateToProps & IDispatchToProps) => {
	const { navigation, fetchTrainingListByDate } = props;

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

	return (
		<View>
			<CalendarStrip selectedDate={selectedDate} changeSelectedDate={handleChangeSelectedDate} />

			<TrainingListMinimalView
				trainingList={trainingList}
				onTrainingPress={handleOnTrainingTouch}
			/>

			<Button title="Add training +" onPress={() => {}} />
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
	return {};
};

export const CalendarScreen = connect(mapStateToProps, mapDispatchToProps)(Calendar);

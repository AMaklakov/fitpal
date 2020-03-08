import React, { useMemo, useState } from 'react';
import { Button, DatePickerIOS, Modal, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect, MapDispatchToPropsParam } from 'react-redux';
import { H1 } from '../../components/heading/h1';
import StringInput from '../../components/string-input/string-input';
import { TrainingModel } from '../../model/training.model';
import {
	cleanUpAction,
	toggleCalendarTrainingModalAction,
} from '../../redux/action/calendar-training-modal.action';
import { StoreModel } from '../../redux/store/index';
import { CALENDAR_DATE_FORMAT, formatDate, getToday } from '../../util/date.util';
import moment from 'moment';
import { checkAndCreateTraining } from '../../redux/action/training.action';

interface IStateProps {
	isOpen: boolean;
	training: TrainingModel | null;
}

interface IDispatchToProps {
	closeModal: () => void;
	cleanUp: () => void;
	copyTraining: (training: Partial<TrainingModel>) => void;
}

const CalendarTraining = (props: IStateProps & IDispatchToProps) => {
	const { isOpen, training, copyTraining, cleanUp } = props;

	const [name, changeName] = useState(`${training?.name ?? 'Новая тренировка'} - COPY`);
	const [date, changeDate] = useState<Date>(moment(training?.date ?? getToday()).toDate());

	const isSaveDisabled = useMemo(() => !name || !date, [name, date]);

	const handleSaveTraining = () => {
		if (isSaveDisabled) {
			return;
		}

		const newTraining: Partial<TrainingModel> = {
			name: name,
			date: formatDate(date, CALENDAR_DATE_FORMAT),
			exerciseList: training ? [...training.exerciseList.map(e => ({ ...e }))] : [],
		};

		copyTraining(newTraining);
		cleanUp();
	};

	return (
		<Modal visible={isOpen}>
			<SafeAreaView>
				<H1 text={'Скопировать тренировку'} />

				<Text>Training name</Text>
				<StringInput value={name} onTextChange={changeName} />

				<Text>Training date</Text>
				<DatePickerIOS date={date} onDateChange={changeDate} />

				<Button title={'Cancel'} onPress={cleanUp} />
				<Button disabled={isSaveDisabled} title={'Save Exercise'} onPress={handleSaveTraining} />
			</SafeAreaView>
		</Modal>
	);
};

const mapStateToProps = (state: StoreModel): IStateProps => {
	return {
		isOpen: state.calendarTrainingModal.isOpen,
		training: state.calendarTrainingModal.training,
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatchToProps, {}> = dispatch => {
	return {
		closeModal: () => dispatch(toggleCalendarTrainingModalAction(false)),
		copyTraining: (training: Partial<TrainingModel>) => checkAndCreateTraining(dispatch, training),
		cleanUp: () => dispatch(cleanUpAction()),
	};
};

export const CalendarTrainingModal = connect(mapStateToProps, mapDispatchToProps)(CalendarTraining);

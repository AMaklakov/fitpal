import React, { useEffect, useMemo, useState } from 'react';
import { Button, DatePickerIOS, Modal, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect, MapDispatchToPropsParam } from 'react-redux';
import { H1 } from '../../components/heading/h1';
import StringInput from '../../components/string-input/string-input';
import { TrainingModel } from '../../model/training.model';
import { cleanUpAction, toggleCalendarTrainingModalAction } from '../../redux/action/calendar-training-modal.action';
import { StoreModel } from '../../redux/store';
import { DEFAULT_DATE_FORMAT, defaultStringToDate, formatDate, getToday } from '../../util/date.util';
import { checkAndCreateTraining } from '../../redux/action/training.action';
import { cloneTrainingExerciseList } from '../../util/training-exercise.util';

interface IStateProps {
	isOpen: boolean;
	training: TrainingModel | null;
	storeDate: string | null;
}

interface IDispatchToProps {
	closeModal: () => void;
	cleanUp: () => void;
	createTraining: (training: Partial<TrainingModel>) => void;
}

const DEFAULT_TRAINING_NAME = 'Новая тренировка';

const CalendarTraining = (props: IStateProps & IDispatchToProps) => {
	const { isOpen, training, createTraining, cleanUp, storeDate } = props;

	const [name, changeName] = useState(DEFAULT_TRAINING_NAME);
	const [date, changeDate] = useState<Date>(getToday().toDate());

	useEffect(() => {
		const newName = training ? `${training.name} - COPY` : DEFAULT_TRAINING_NAME;
		let newDate = storeDate ? defaultStringToDate(storeDate) : getToday().toDate();

		if (training) {
			newDate = defaultStringToDate(training.date);
		}

		changeName(newName);
		changeDate(newDate);
	}, [storeDate, training]);

	const isSaveDisabled = useMemo(() => !name || !date, [name, date]);

	const handleSaveTraining = () => {
		if (isSaveDisabled) {
			return;
		}

		const newTraining: Partial<TrainingModel> = {
			name: name,
			date: formatDate(date, DEFAULT_DATE_FORMAT),
			exerciseList: cloneTrainingExerciseList(training?.exerciseList),
		};

		createTraining(newTraining);
		cleanUp();
	};

	const handleCancelPress = () => {
		cleanUp();
	};

	return (
		<Modal visible={isOpen}>
			<SafeAreaView>
				<H1 text={'Скопировать тренировку'} />

				<Text>Training name</Text>
				<StringInput value={name} onTextChange={changeName} />

				{!!training && <Text>Training date</Text>}
				{!!training && <DatePickerIOS date={date} onDateChange={changeDate} />}

				<Button title={'Cancel'} onPress={handleCancelPress} />
				<Button disabled={isSaveDisabled} title={'Save Training'} onPress={handleSaveTraining} />
			</SafeAreaView>
		</Modal>
	);
};

const mapStateToProps = (state: StoreModel): IStateProps => {
	return {
		isOpen: state.calendarTrainingModal.isOpen,
		training: state.calendarTrainingModal.training,
		storeDate: state.calendarTrainingModal.date,
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatchToProps, {}> = dispatch => {
	return {
		closeModal: () => dispatch(toggleCalendarTrainingModalAction(false)),
		createTraining: (training: Partial<TrainingModel>) => checkAndCreateTraining(dispatch, training),
		cleanUp: () => dispatch(cleanUpAction()),
	};
};

export const CalendarTrainingModal = connect(mapStateToProps, mapDispatchToProps)(CalendarTraining);

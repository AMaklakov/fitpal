import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect, MapDispatchToPropsParam } from 'react-redux';
import { H1 } from '../../components/heading/h1';
import StringInput from '../../components/string-input/string-input';
import { TrainingModel } from '../../model/training.model';
import { cleanUpAction, toggleCalendarTrainingModalAction } from '../../redux/action/calendar-training-modal.action';
import { StoreModel } from '../../redux/store';
import { convertStringToMoment, DateFormatEnum, formatDate, getToday } from '../../util/date.util';
import { checkAndCreateTraining } from '../../redux/action/training.action';
import { cloneTrainingExerciseList } from '../../util/training-exercise.util';
import { DatepickerInput } from '../../components/inputs/datepicker/datepicker';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

interface IStateProps {
	isOpen: boolean;
	training: TrainingModel | null;
	dateFromStore: string | null;
}

interface IDispatchToProps {
	closeModal: () => void;
	cleanUp: () => void;
	createTraining: (training: Partial<TrainingModel>) => void;
}

const CalendarTraining = (props: IStateProps & IDispatchToProps) => {
	const { isOpen, training, createTraining, cleanUp, dateFromStore } = props;
	const { t } = useTranslation();

	const DEFAULT_TRAINING_NAME = t('New training');

	const [name, changeName] = useState(DEFAULT_TRAINING_NAME);
	const [date, changeDate] = useState<moment.Moment>(getToday());

	useEffect(() => {
		let newName = DEFAULT_TRAINING_NAME;
		let newDate = dateFromStore ? convertStringToMoment(dateFromStore) : getToday();

		if (training) {
			newName = `${training.name} - COPY`;
			newDate = convertStringToMoment(training.date);
		}

		changeName(newName);
		changeDate(newDate);
	}, [isOpen, dateFromStore, training, DEFAULT_TRAINING_NAME]);

	const isSaveDisabled = useMemo(() => !name || !date, [name, date]);

	const handleSaveTraining = () => {
		if (isSaveDisabled) {
			return;
		}

		const newTraining: Partial<TrainingModel> = {
			name: name,
			date: formatDate(date, DateFormatEnum.Default),
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
				<H1 text={training ? t('Copy training') : t('Create training')} />

				<Text>{t('Training name')}</Text>
				<StringInput value={name} onTextChange={changeName} />

				{!!training && <Text>{t('Training date')}</Text>}
				{!!training && <DatepickerInput date={date} onDateChange={changeDate} minDate={getToday()} />}

				<Button title={t('Cancel')} onPress={handleCancelPress} />
				<Button disabled={isSaveDisabled} title={t('Save')} onPress={handleSaveTraining} />
			</SafeAreaView>
		</Modal>
	);
};

const mapStateToProps = (state: StoreModel): IStateProps => {
	return {
		isOpen: state.calendarTrainingModal.isOpen,
		training: state.calendarTrainingModal.training,
		dateFromStore: state.calendarTrainingModal.date,
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

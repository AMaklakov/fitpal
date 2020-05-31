import React, { useEffect, useMemo, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect, MapDispatchToPropsParam } from 'react-redux';
import { H1 } from '@components/heading/h1';
import { StringInputWithValidation } from '@components/inputs/string-input/string-input';
import { ICreateTraining, TrainingModel } from '@model/training.model';
import { cleanUpAction, toggleCalendarTrainingModalAction } from '@redux/action/calendar-training-modal.action';
import { StoreModel } from '@redux/store';
import { convertStringToMoment, DateFormatEnum, getToday } from '@util/date.util';
import { cloneTrainingExerciseList } from '@util/training-exercise.util';
import moment, { Moment, MomentInput } from 'moment';
import { useTranslation } from 'react-i18next';
import { Colors } from '@css/colors.style';
import { TRAINING_TITLE_MAXLENGTH, TRAINING_TITLE_MINLENGTH } from '@const/validation-const';
import { IErrors } from '@components/with-validation/with-validation';
import { Button } from '@components/button/button';
import { TRAINING_ACTION_CREATORS } from '@redux/action/training-exercise.action';
import { DatepickerInput } from '@inputs/datepicker/datepicker';
import { FontSizes, Fonts } from '@css/fonts';

interface IStateProps {
	isOpen: boolean;
	training: TrainingModel | null;
	dateFromStore: MomentInput | null;
	createTrainingError: null | string | object;
}

interface IDispatchToProps {
	closeModal: () => void;
	cleanUp: () => void;
	createTraining: (training: ICreateTraining) => void;
}

const CalendarTraining = (props: IStateProps & IDispatchToProps) => {
	const { isOpen, training, createTraining, cleanUp, dateFromStore, createTrainingError } = props;
	const { t } = useTranslation();

	const DEFAULT_TRAINING_NAME = t('New training');

	const [name, setName] = useState(DEFAULT_TRAINING_NAME);
	const [hasNameErrors, setHasNameErrors] = useState(false);
	const [date, setDate] = useState<Moment>(getToday());

	useEffect(() => {
		let newName = DEFAULT_TRAINING_NAME;
		let newDate = dateFromStore ? convertStringToMoment(dateFromStore, DateFormatEnum.Calendar) : getToday();

		if (training) {
			newName = `${training.name} - COPY`;
			newDate = moment(training.date);
		}

		setName(newName);
		setDate(newDate);
	}, [isOpen, dateFromStore, training, DEFAULT_TRAINING_NAME]);

	const isSaveDisabled = useMemo(() => !name || !date || hasNameErrors, [name, date, hasNameErrors]);

	const handleSaveTraining = () => {
		if (isSaveDisabled) {
			return;
		}

		const newTraining: ICreateTraining = {
			name: name,
			date: date,
			exerciseList: cloneTrainingExerciseList(training?.exerciseList),
		};

		createTraining(newTraining);
	};

	const handleCancelPress = () => {
		cleanUp();
	};

	const handleChangeName = (name: string, errors?: IErrors) => {
		setName(name);
		setHasNameErrors(!!errors);
	};

	return (
		<Modal visible={isOpen}>
			<SafeAreaView style={styles.wrapper}>
				<H1 text={t(training ? 'Copy training' : 'Create training')} wrapperStyle={styles.h1} />

				<StringInputWithValidation
					label={t('Training name')}
					value={name}
					onChange={handleChangeName}
					maxLength={[TRAINING_TITLE_MAXLENGTH, t('Max length is |len|', { len: TRAINING_TITLE_MAXLENGTH })]}
					minLength={[TRAINING_TITLE_MINLENGTH, t('Min length is |len|', { len: TRAINING_TITLE_MINLENGTH })]}
				/>

				<View style={styles.calendarButton}>
					{!!training && <Text style={styles.asLabel}>{t('Training date')}</Text>}
					{!!training && <DatepickerInput date={date} onDateChange={setDate} minDate={getToday()} />}
				</View>

				{createTrainingError && (
					<View>
						<Text style={styles.errorText}>{createTrainingError.toString()}</Text>
					</View>
				)}

				<View style={styles.buttonsWrapper}>
					<Button solidType="gray" title={t('Cancel')} onPress={handleCancelPress} />
					<Button disabled={isSaveDisabled} title={t('Save')} onPress={handleSaveTraining} />
				</View>
			</SafeAreaView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 10,
	},
	errorText: {
		color: Colors.LightRed,
		fontSize: FontSizes.Paragraph,
	},
	buttonsWrapper: {
		paddingTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	h1: {
		marginVertical: 15,
	},
	calendarButton: {
		paddingHorizontal: 12,
		marginTop: 12,
	},
	asLabel: {
		marginBottom: 2,
		fontSize: 14,
		fontFamily: Fonts.Kelson,
		fontWeight: 'normal',
		color: Colors.Primary,
	},
});

const mapStateToProps = (state: StoreModel): IStateProps => {
	return {
		isOpen: state.calendarTrainingModal.isOpen,
		training: state.calendarTrainingModal.training,
		dateFromStore: state.calendarTrainingModal.date,
		createTrainingError: state.training.error,
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatchToProps, {}> = dispatch => {
	return {
		closeModal: () => dispatch(toggleCalendarTrainingModalAction(false)),
		createTraining: (training: ICreateTraining) => dispatch(TRAINING_ACTION_CREATORS.CREATE.START(training)),
		cleanUp: () => dispatch(cleanUpAction()),
	};
};

export const CalendarTrainingModal = connect(mapStateToProps, mapDispatchToProps)(CalendarTraining);

import React from 'react';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { DateFormatEnum } from '../../../util/date.util';

type DatepickerType = 'date' | 'datetime' | 'time';

interface IProps {
	/**
	 * 'date' by default
	 */
	type?: DatepickerType;
	date: moment.Moment;
	onDateChange: (value: moment.Moment) => void;

	minDate?: moment.Moment;
	maxDate?: moment.Moment;

	placeholder?: string;
	format?: DateFormatEnum;

	confirmText?: string;
	cancelText?: string;
}

export const DatepickerInput = (props: IProps) => {
	const {
		onDateChange,
		type = 'date',
		date,
		placeholder,
		format = DateFormatEnum.Default,
		minDate,
		maxDate,
		cancelText = 'Cancel',
		confirmText = 'Confirm',
	} = props;

	const handleOnDateChange = (dateString: string, dateObj: Date) => onDateChange(moment(dateObj));

	return (
		<DatePicker
			style={styles.wrapper}
			date={date}
			mode={type}
			placeholder={placeholder}
			format={format}
			minDate={minDate ? minDate.toDate() : undefined}
			maxDate={maxDate ? maxDate.toDate() : undefined}
			confirmBtnText={confirmText}
			cancelBtnText={cancelText}
			customStyles={{
				dateIcon: styles.dateIcon,
				dateInput: styles.dateInput,
			}}
			onDateChange={handleOnDateChange}
		/>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		width: 200,
	},
	dateIcon: {
		position: 'absolute',
		left: 0,
		top: 4,
		marginLeft: 0,
	},
	dateInput: {
		marginLeft: 36,
	},
});

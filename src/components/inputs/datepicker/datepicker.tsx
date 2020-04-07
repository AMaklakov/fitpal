import React from 'react';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { DateFormatEnum } from '../../../util/date.util';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
	color?: string;
	size?: number;
}

export const DatepickerInput = (props: IProps) => {
	const {
		onDateChange,
		type = 'date',
		color = '#000',
		size = 24,
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
			iconComponent={<Icon style={styles.dateIcon} name="calendar" size={size} color={color} />}
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
		width: 140,
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 15,
		padding: 5,
		marginTop: 12,
		marginBottom: 24,
	},
	dateIcon: {
		position: 'absolute',
		left: 8,
		top: 8,
		marginLeft: 0,
	},
	dateInput: {
		marginLeft: 36,
		borderWidth: 0,
	},
});

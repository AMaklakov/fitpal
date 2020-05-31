import React, { useCallback, useMemo } from 'react';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { StyleSheet, View } from 'react-native';
import { DateFormatEnum } from '@util/date.util';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fonts, FontSizes } from '@css/fonts';
import { Colors } from '@css/colors.style';

type DatepickerType = 'date' | 'datetime' | 'time';

interface IProps {
	date: moment.Moment;
	onDateChange: (value: moment.Moment) => void;

	/**
	 * 'date' by default
	 */
	type?: DatepickerType;
	minDate?: moment.Moment;
	maxDate?: moment.Moment;
	placeholder?: string;
	format?: DateFormatEnum;
	confirmText?: string;
	cancelText?: string;
	color?: string;
	size?: number;
	themeType?: 'dark' | 'light';
}

export const DatepickerInput = (props: IProps) => {
	const { onDateChange, date, placeholder, format = DateFormatEnum.Default, minDate, maxDate, color } = props;
	const { type = 'date', size = FontSizes.H1  } = props;
	const { cancelText = 'Cancel', confirmText = 'Confirm', themeType = 'dark' } = props;

	const isDark = useMemo(() => themeType === 'dark', [themeType]);

	const handleOnDateChange = useCallback((dateString: string, dateObj: Date) => onDateChange(moment(dateObj)), [
		onDateChange,
	]);

	return (
		<DatePicker
			style={[styles.wrapper, isDark && styles.darkWrapper]}
			date={date}
			mode={type}
			placeholder={placeholder}
			format={format}
			minDate={minDate ? minDate.toDate() : undefined}
			maxDate={maxDate ? maxDate.toDate() : undefined}
			iconComponent={
				<View style={[styles.dateIconWrapper, isDark && styles.darkDateIconWrapper]}>
					<Icon color={color ?? (themeType === 'dark' ? Colors.White : Colors.Darkgray)} size={size} name="calendar" />
				</View>
			}
			confirmBtnText={confirmText}
			cancelBtnText={cancelText}
			customStyles={{
				dateInput: styles.dateInput,
				dateText: styles.dateText,
			}}
			onDateChange={handleOnDateChange}
		/>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		minWidth: 160,
		borderWidth: 1,
		borderColor: Colors.Primary,
		borderRadius: 8,
	},
	dateIconWrapper: {
		width: 36,
		height: '100%',
		position: 'absolute',
		left: 0,
		borderTopStartRadius: 6,
		borderBottomStartRadius: 6,
		backgroundColor: Colors.LightGrey,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dateInput: {
		marginLeft: 36,
		borderWidth: 0,
	},
	dateText: {
		fontFamily: Fonts.Kelson,
		fontSize: 18,
	},

	// dark theme
	darkWrapper: {
		borderColor: Colors.Darkgray,
	},
	darkDateIconWrapper: {
		backgroundColor: Colors.Darkgray,
	},
});

import React, { FC, useCallback } from 'react';
import { Calendar as CalendarMonth, CalendarBaseProps, CalendarMarkingProps, DateObject } from 'react-native-calendars';
import moment, { MomentInput } from 'moment';
import { DateFormatEnum, formatDate } from '@util/date.util';
import { Colors } from '@css/colors.style';
import { Fonts, FontSizes } from '@css/fonts';
import { toRgba } from '@util/css.util';

interface IProps {
	selectedDate: MomentInput;
	onDateChange: (date: MomentInput) => void;
}

export const Calendar: FC<CalendarMarkingProps & CalendarBaseProps & IProps> = props => {
	const { onDateChange, selectedDate, ...rest } = props;

	const handleDateChange = useCallback(
		(date: DateObject) => onDateChange(moment(date.dateString, DateFormatEnum.Calendar)),
		[onDateChange]
	);

	return (
		<CalendarMonth
			firstDay={1}
			current={moment(selectedDate).toDate()}
			onDayPress={handleDateChange}
			theme={{
				selectedDayBackgroundColor: toRgba(Colors.LightGrey, 0.3),
				selectedDayTextColor: Colors.Purple,
				todayTextColor: Colors.LightBlue,
				arrowColor: Colors.Darkgray,
				monthTextColor: Colors.Darkgray,

				// textDayFontFamily: Fonts.Kelson,
				textMonthFontFamily: Fonts.KelsonBold,

				textMonthFontWeight: 'bold',
				textMonthFontSize: FontSizes.H3,
				textDayFontSize: FontSizes.Medium,
				textDayHeaderFontSize: FontSizes.Small,
			}}
			markedDates={{
				[formatDate(selectedDate)]: {
					selected: true,
					disableTouchEvent: true,
				},
			}}
			{...rest}
		/>
	);
};

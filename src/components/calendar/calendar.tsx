import React, { FC, useCallback, useEffect, useMemo } from 'react';
import {
	Calendar as CalendarMonth,
	CalendarBaseProps,
	CalendarDot,
	DateObject,
	LocaleConfig,
	MultiDotMarking,
} from 'react-native-calendars';
import moment, { Moment, MomentInput } from 'moment';
import { DateFormatEnum, formatDate } from '@util/date.util';
import { Colors } from '@css/colors.style';
import { Fonts, FontSizes } from '@css/fonts';
import { toRgba } from '@util/css.util';
import { IMarkedDate } from '@components/calendar/calendar-strip';
import merge from 'lodash/merge';
import ruLocale from '@i18n/calendar/ru-locale.json';
import { useTranslation } from 'react-i18next';

LocaleConfig.locales.ru = ruLocale;
LocaleConfig.locales.en = LocaleConfig.locales[''];

interface IProps {
	selectedDate: MomentInput;
	onDateChange: (date: MomentInput) => void;
	customMarkedDates?: Array<IMarkedDate>;
	onMonthChanged?: (date: Moment) => void;
}

export const Calendar: FC<CalendarBaseProps & IProps> = props => {
	const { onDateChange, selectedDate, customMarkedDates, onMonthChanged, ...rest } = props;
	const {
		i18n: { language },
	} = useTranslation();

	const handleDateChange = useCallback(
		(date: DateObject) => onDateChange(moment(date.dateString, DateFormatEnum.Calendar)),
		[onDateChange]
	);

	useEffect(() => {
		LocaleConfig.defaultLocale = language;
	}, [language]);

	const markedDates = useMemo<{ [date: string]: MultiDotMarking }>(() => {
		return (customMarkedDates ?? [])
			.map(x => {
				const dots: CalendarDot[] = x.dots.map<CalendarDot>((dot, index) => ({
					key: index.toString(),
					color: dot.color,
				}));
				return { date: x.date, dots };
			})
			.reduce(
				(buff, { date, dots }) => {
					return { ...buff, [formatDate(date)]: merge(buff[formatDate(date)], { dots }) };
				},
				{
					[formatDate(selectedDate)]: {
						selected: true,
						disableTouchEvent: true,
						dots: [],
					},
				}
			);
	}, [customMarkedDates, selectedDate]);

	const handleMonthChanged = useCallback(
		(date: DateObject) => {
			onMonthChanged?.(moment(date.dateString, DateFormatEnum.Calendar));
		},
		[onMonthChanged]
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
			markingType="multi-dot"
			markedDates={markedDates}
			onMonthChange={handleMonthChanged}
			{...rest}
		/>
	);
};

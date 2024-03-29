import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import StripCalendar from 'react-native-calendar-strip';
import { StyleSheet } from 'react-native';
import { getToday } from '@util/date.util';
import { Colors } from '@css/colors.style';
import moment, { Moment, MomentInput } from 'moment';
import { toRgba } from '@util/css.util';
import { Fonts, FontSizes } from '@css/fonts';
import { useTranslation } from 'react-i18next';

export interface IMarkedDate {
	date: Moment;
	dots: Array<{ color: string }>;
}

interface CalendarStripProps {
	selectedDate: Moment;
	changeSelectedDate: (selectedDate: MomentInput) => void;
	markedDates?: IMarkedDate[];
	onWeekChange?: (weekStart: Moment) => void;
}

const Strip = (StripCalendar as unknown) as FC<any>;
export const CalendarStrip = (props: CalendarStripProps) => {
	const { selectedDate = getToday(), changeSelectedDate, markedDates, onWeekChange } = props;
	const [currentWeek, setCurrentWeek] = useState<string>(selectedDate.clone().toISOString());
	const ref = useRef<{ updateWeekView: (date: Moment) => void; state: { numVisibleDays: number } }>(null);
	const {
		i18n: { language },
	} = useTranslation();

	// TODO replace this workaround when version of CalendarStrip is stable
	useEffect(() => {
		const isAbleToRender = !!ref.current?.state?.numVisibleDays;
		if (markedDates && markedDates?.length > 0 && isAbleToRender) {
			ref.current?.updateWeekView(moment(currentWeek));
		}
	}, [currentWeek, markedDates]);

	const customDatesStyles = useMemo(
		() => [
			{
				startDate: moment(),
				dateNameStyle: { color: Colors.White },
				dateNumberStyle: { color: Colors.White },
				dateContainerStyle: { backgroundColor: toRgba(Colors.Red, 0.5) },
			},
		],
		[]
	);

	const daySelectionAnimation = useMemo<any>(
		() => ({
			type: 'background',
			duration: 200,
			highlightColor: Colors.Purple,
		}),
		[]
	);

	const handleWeekChange = useCallback(
		(weekStart: Moment) => {
			setCurrentWeek(weekStart.clone().toISOString());
			onWeekChange?.(weekStart);
		},
		[onWeekChange]
	);

	return (
		<Strip
			ref={ref}
			selectedDate={selectedDate.toDate()}
			onDateSelected={changeSelectedDate}
			style={styles.calendar}
			calendarHeaderStyle={styles.headingText}
			dateNumberStyle={styles.dateNumberStyle}
			dateNameStyle={{ color: Colors.Primary }}
			highlightDateNumberStyle={{ color: Colors.White }}
			highlightDateNameStyle={{ color: Colors.White }}
			weekendDateNameStyle={{ color: Colors.White }}
			calendarAnimation={null}
			daySelectionAnimation={daySelectionAnimation}
			customDatesStyles={customDatesStyles}
			markedDates={markedDates}
			onWeekChanged={handleWeekChange}
			locale={{ name: language, config: moment.localeData(language) }}
		/>
	);
};

const styles = StyleSheet.create({
	headingText: {
		color: Colors.Primary,
		fontSize: FontSizes.Big,
		fontFamily: Fonts.KelsonBold,
	},
	calendar: {
		minHeight: 100,
		paddingVertical: 10,
		marginHorizontal: 5,
		backgroundColor: Colors.Lightgray,
		color: Colors.White,
		fontFamily: Fonts.KelsonBold,
	},
	dateNumberStyle: {
		color: Colors.Primary,
		fontSize: FontSizes.Medium,
	},
});

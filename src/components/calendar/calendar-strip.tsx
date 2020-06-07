import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import StripCalendar from 'react-native-calendar-strip';
import { StyleSheet } from 'react-native';
import { getToday } from '@util/date.util';
import { Colors } from '@css/colors.style';
import moment, { Moment, MomentInput } from 'moment';
import { toRgba } from '@util/css.util';
import { Fonts, FontSizes } from '@css/fonts';

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
	const [currentWeek, setCurrentWeek] = useState<Moment>(selectedDate.clone());
	const ref = useRef<{ updateWeekView: (date: Moment) => void }>(null);

	useEffect(() => {
		if (markedDates && markedDates?.length > 0) {
			ref.current?.updateWeekView(currentWeek);
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
			setCurrentWeek(weekStart);
			onWeekChange?.(weekStart);
		},
		[onWeekChange]
	);

	return (
		<Strip
			ref={ref}
			startingDate={moment().startOf('week')}
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

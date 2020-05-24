import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Strip from 'react-native-calendar-strip';
import { getToday } from '../../util/date.util';
import { Colors } from '../../css/colors.style';
import moment from 'moment';
import { toRgba } from '@util/css.util';

const styles = StyleSheet.create({
	headingText: {
		color: Colors.Primary,
		paddingTop: 10,
		paddingBottom: 0,
		fontSize: 32,
		fontFamily: 'kerson-bold',
	},
	calendar: {
		minHeight: 160,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: Colors.Lightgray,
		color: Colors.White,
		fontFamily: 'kerson-bold',
	},
	dateNumberStyle: {
		color: Colors.Primary,
		fontSize: 16,
	},
});

interface CalendarStripProps {
	selectedDate: moment.Moment;
	changeSelectedDate: (selectedDate: moment.Moment) => void;
}

export const CalendarStrip = (props: CalendarStripProps) => {
	const { selectedDate = getToday(), changeSelectedDate } = props;

	const customDatesStyles = useMemo(
		() => [
			{
				startDate: moment(),
				dateNameStyle: { color: Colors.White },
				dateNumberStyle: { color: Colors.White },
				dateContainerStyle: { backgroundColor: toRgba(Colors.Red, 0.5) },
			} as any,
		],
		[]
	);

	const daySelectionAnimation = useMemo(
		() =>
			({
				type: 'background',
				duration: 200,
				highlightColor: Colors.Purple,
			} as any),
		[]
	);

	return (
		<View>
			<Strip
				style={styles.calendar}
				calendarHeaderStyle={styles.headingText}
				dateNumberStyle={styles.dateNumberStyle}
				dateNameStyle={{ color: Colors.Primary }}
				highlightDateNumberStyle={{ color: Colors.White }}
				highlightDateNameStyle={{ color: Colors.White }}
				weekendDateNameStyle={{ color: Colors.White }}
				selectedDate={(selectedDate as unknown) as Date}
				onDateSelected={changeSelectedDate as any}
				calendarAnimation={{ type: 'sequence', duration: 30 }}
				daySelectionAnimation={daySelectionAnimation}
				customDatesStyles={customDatesStyles}
			/>
		</View>
	);
};

import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Strip from 'react-native-calendar-strip';
import { getToday } from '../../util/date.util';
import { Colors } from '../../css/colors.style';
import moment from 'moment';
import { toRgba } from '@util/css.util';
import { Fonts } from '@css/fonts';

const styles = StyleSheet.create({
	headingText: {
		color: Colors.Primary,
		paddingTop: 10,
		paddingBottom: 0,
		fontSize: 32,
		fontFamily: Fonts.KelsonBold,
	},
	calendar: {
		minHeight: 160,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: Colors.Lightgray,
		color: Colors.White,
		fontFamily: Fonts.KelsonBold,
	},
	dateNumberStyle: {
		color: Colors.Primary,
		fontSize: 16,
	},
});

interface CalendarStripProps {
	selectedDate: moment.Moment;
	changeSelectedDate: (selectedDate: moment.MomentInput) => void;
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
			},
		],
		[]
	);

	const daySelectionAnimation = useMemo<any>(
		() =>
			({
				type: 'background',
				duration: 200,
				highlightColor: Colors.Purple,
			}),
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
				selectedDate={selectedDate.toDate()}
				onDateSelected={changeSelectedDate}
				calendarAnimation={{ type: 'sequence', duration: 30 }}
				daySelectionAnimation={daySelectionAnimation}
				customDatesStyles={customDatesStyles}
			/>
		</View>
	);
};

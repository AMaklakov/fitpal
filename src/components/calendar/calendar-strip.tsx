import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Strip from 'react-native-calendar-strip';
import { getToday } from '../../util/date.util';
import { Colors } from '../../css/colors.style';
import moment from 'moment';

const styles = StyleSheet.create({
	headingText: {
		// backgroundColor: 'pink',
	},
	calendar: {
		height: 100,
		paddingTop: 10,
		paddingBottom: 10,
	},
});

interface CalendarStripProps {
	selectedDate: moment.Moment;
	changeSelectedDate: (selectedDate: moment.Moment) => void;
}

export const CalendarStrip = (props: CalendarStripProps) => {
	const { selectedDate = getToday(), changeSelectedDate } = props;

	const daySelectionAnimation = useMemo(
		() =>
			({
				type: 'border',
				duration: 200,
				borderWidth: 1,
				borderHighlightColor: Colors.LightBlue,
			} as any),
		[]
	);

	return (
		<View>
			<Strip
				style={styles.calendar}
				selectedDate={(selectedDate as unknown) as Date}
				onDateSelected={changeSelectedDate as any}
				calendarAnimation={{ type: 'sequence', duration: 50 }}
				daySelectionAnimation={daySelectionAnimation}
			/>
		</View>
	);
};

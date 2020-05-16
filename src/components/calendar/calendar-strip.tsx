import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Strip from 'react-native-calendar-strip';
import { getToday } from '../../util/date.util';
import { Colors } from '../../css/colors.style';
import moment from 'moment';
import { colors } from 'react-native-elements';

const styles = StyleSheet.create({
	headingText: {
		// backgroundColor: 'pink',
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
		fontFamily: 'kerson-bold'
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
				borderWidth: 2,
				borderHighlightColor: Colors.Purple,
			} as any),
		[]
	);

	return (
		<View>
			<Strip
				style={styles.calendar}
				calendarHeaderStyle={styles.headingText}
				dateNumberStyle={{color: Colors.Primary}}
				dateNameStyle={{color: Colors.Primary}}
				selectedDate={(selectedDate as unknown) as Date}
				onDateSelected={changeSelectedDate as any}
				calendarAnimation={{ type: 'sequence', duration: 50 }}
				daySelectionAnimation={daySelectionAnimation}
			/>
		</View>
	);
};

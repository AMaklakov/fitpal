import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getToday } from '../../util/date.util';

interface IProps {}

export const CalendarWrapper = (props: IProps) => {
	const today = useMemo(() => getToday().toDate(), []);

	const {} = props;

	return (
		<View>
			<Calendar firstDay={1} current={today} />
		</View>
	);
};

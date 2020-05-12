import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native';
import { TrainingModel } from '@model/training.model';
import { calculateTrainingTotal } from '@util/training-exercise.util';
import moment from 'moment';
import { Colors } from '@css/colors.style';
import { IFetchByDateRange } from '@redux/action/training-exercise.action';
import { DateFormatEnum, formatDate } from '@util/date.util';

const DAYS_COUNT = 10;

interface IProps {
	daysCount: number;
	trainings: TrainingModel[];

	onFetch: (data: IFetchByDateRange) => void;
}

export const LastDaysStatistics = (props: IProps) => {
	const { trainings, daysCount = DAYS_COUNT, onFetch } = props;

	useEffect(() => {
		onFetch({
			startDate: moment().subtract(daysCount - 1, 'days'),
			endDate: moment(),
		});
	}, [daysCount, onFetch]);

	const tickValues = useMemo(() => {
		const data = [];

		for (let i = 0; i < daysCount; i++) {
			data.push(moment().subtract(i, 'days'));
		}

		return data.reverse();
	}, [daysCount]);

	// useEffect(() => {
	// 	if (trainings.length < 10) {
	// 		const newTrainings = createFakeTrainings(moment().subtract(10, 'days'), moment(), exercises, 1);
	// 		newTrainings.forEach(t => onCreateTraining(t));
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [exercises, onCreateTraining]);

	const dataList = useMemo(() => {
		return trainings.map(t => ({
			x: moment(t.date).toDate(),
			y: +calculateTrainingTotal(t).toFixed(),
			name: t._id,
			color: Colors.LightGreen,
		}));
	}, [trainings]);

	return (
		<View style={styles.wrapper}>
			<VictoryChart scale={{ x: 'time' }} domainPadding={10}>
				<VictoryBar
					style={{
						data: {
							fill: ({ datum }) => datum.color,
							fillOpacity: 0.7,
						},
					}}
					cornerRadius={{
						top: 6,
						bottom: 6,
					}}
					barWidth={15}
					events={[
						{
							target: 'data',
							eventHandlers: {
								onPressIn: () => [
									{
										target: 'data',
										mutation: props => ({ style: { ...props.style, fillOpacity: 1 } }),
									},
								],
							},
						},
					]}
					labels={({ datum }) => datum.y}
					data={dataList}
				/>

				<VictoryAxis
					tickFormat={date => formatDate(date, DateFormatEnum.DayOfWeek)}
					tickCount={daysCount}
					tickValues={tickValues}
					style={{ axis: { stroke: 0 } }}
				/>
			</VictoryChart>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
});

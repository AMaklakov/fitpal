import React, { useCallback, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native';
import { TrainingModel } from '@model/training.model';
import { calculateTrainingTotal } from '@util/training-exercise.util';
import moment from 'moment';
import { Colors } from '@css/colors.style';
import { IFetchByDateRange } from '@redux/action/training-exercise.action';
import { DateFormatEnum, formatDate } from '@util/date.util';

const DAYS_COUNT = 10;
const DEFAULT_OPACITY = 0.6;

interface IProps {
	daysCount: number;
	trainings: TrainingModel[];

	onFetch: (data: IFetchByDateRange) => void;
	onShowTraining: (training: TrainingModel) => void;
}

export const LastDaysStatistics = (props: IProps) => {
	const { trainings, daysCount = DAYS_COUNT, onFetch, onShowTraining } = props;

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
		return trainings
			.filter(t => calculateTrainingTotal(t).gt(0))
			.map(t => ({
				x: moment(t.date)
					.startOf('day')
					.toDate(),
				y: +calculateTrainingTotal(t).toFixed(),
				name: t._id,
				training: t,
				color: Colors.LightGreen,
			}));
	}, [trainings]);

	const handleShowTraining = useCallback(({ datum }) => onShowTraining(datum?.training), []);

	return (
		<View>
			<VictoryChart
				scale={{ x: 'time' }}
				domainPadding={10}
				events={[
					{
						childName: 'Bar',
						target: 'data',
						eventHandlers: {
							onPressIn: (_, data) => [
								{
									childName: 'Bar',
									target: 'data',
									eventKey: 'all',
									mutation: props => ({
										style: { ...props.style, fillOpacity: DEFAULT_OPACITY, fill: props.datum.color },
									}),
								},
								{
									childName: 'Bar',
									target: 'data',
									mutation: props => ({ style: { ...props.style, fillOpacity: 1, fill: Colors.LightBlue } }),
									callback: () => handleShowTraining(data),
								},
							],
						},
					},
				]}>
				<VictoryBar
					name="Bar"
					style={{
						data: {
							fill: ({ datum }) => datum.color,
							fillOpacity: DEFAULT_OPACITY,
						},
					}}
					cornerRadius={{
						top: 6,
						bottom: 6,
					}}
					barWidth={15}
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

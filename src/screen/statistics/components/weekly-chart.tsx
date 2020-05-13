import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native';
import { TrainingModel } from '@model/training.model';
import { calculateTrainingTotal } from '@util/training-exercise.util';
import moment, { Moment } from 'moment';
import { Colors } from '@css/colors.style';
import { IFetchByDateRange } from '@redux/action/training-exercise.action';
import { DateFormatEnum, formatDate } from '@util/date.util';
import { Button } from 'react-native-elements';
import { ChevronLeftIcon } from '@icons/chevron-left.icon';
import { ChevronRightIcon } from '@icons/chevron-right.icon';
import { toRgba } from '@util/css.util';

const DEFAULT_OPACITY = 0.6;
const DAYS_COUNT = 7;

interface IProps {
	trainingsByDates: (start: Moment, end: Moment) => TrainingModel[];
	onFetch: (data: IFetchByDateRange) => void;
	onShowTraining: (training: TrainingModel | null) => void;
}

export const WeeklyChart = (props: IProps) => {
	const { trainingsByDates, onFetch, onShowTraining } = props;

	const [currentWeekStart] = useState(moment().startOf('week'));
	const [currentDate, setCurrentDate] = useState(moment());
	const [externalMutations, setExtiernalMutations] = useState();

	useEffect(() => {
		onFetch({
			startDate: currentDate.clone().startOf('week'),
			endDate: currentDate.clone().endOf('week'),
		});
	}, [currentDate, onFetch]);

	const tickValues = useMemo(() => getArrayWeekDates(currentDate), [currentDate]);

	const dataList = useMemo(() => {
		const startDate = currentDate.clone().startOf('week');
		const endDate = currentDate.clone().endOf('week');

		return trainingsByDates(startDate, endDate).map(t => ({
			x: moment(t.date).startOf('day'),
			y: +calculateTrainingTotal(t).toFixed(),
			name: t._id,
			training: t,
			color: Colors.LightGreen,
		}));
	}, [currentDate, trainingsByDates]);

	const handleShowTraining = useCallback(({ datum }) => onShowTraining(datum?.training), [onShowTraining]);

	const handleResetExternalMutations = useCallback(() => setExtiernalMutations(undefined), []);
	const handleSetExternalMutations = useCallback(() => {
		setExtiernalMutations([
			{
				childName: 'Bar',
				target: 'data',
				eventKey: 'all',
				mutation: props => ({
					style: { ...props.style, fillOpacity: DEFAULT_OPACITY, fill: props.datum.color },
				}),
				callback: handleResetExternalMutations,
			},
		]);
	}, [handleResetExternalMutations]);

	const handleLeftPress = useCallback(() => {
		setCurrentDate(prev => prev.clone().subtract(1, 'week'));
		handleSetExternalMutations();
		onShowTraining(null);
	}, [handleSetExternalMutations, onShowTraining]);

	const handleRightPress = useCallback(() => {
		const weekStart = currentDate.clone().startOf('week');

		if (currentWeekStart.isSame(weekStart)) {
			return;
		}

		setCurrentDate(prev => prev.clone().add(1, 'week'));
		handleSetExternalMutations();
		onShowTraining(null);
	}, [currentDate, currentWeekStart, handleSetExternalMutations, onShowTraining]);

	return (
		<View style={styles.wrapper}>
			<Button
				type="clear"
				icon={<ChevronLeftIcon />}
				onPress={handleLeftPress}
				style={[styles.arrowButton, styles.arrowLeftBorder]}
			/>

			<VictoryChart
				width={CHART_WIDTH}
				scale={{ x: 'time' }}
				externalEventMutations={externalMutations}
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
					tickCount={DAYS_COUNT}
					tickValues={tickValues}
					style={{ axis: { stroke: 0 } }}
				/>
			</VictoryChart>

			<Button
				type="clear"
				icon={<ChevronRightIcon />}
				onPress={handleRightPress}
				style={[styles.arrowButton, styles.arrowRightBorder]}
				disabled={currentDate
					.clone()
					.startOf('week')
					.isSame(currentWeekStart)}
			/>
		</View>
	);
};

const getArrayWeekDates = (day: Moment): Moment[] => {
	const emptyArray = Array(DAYS_COUNT).fill('');
	return emptyArray.map((_, i) => {
		const weekStart = day.clone().startOf('week');
		return weekStart.add(i, 'days');
	});
};

const SCREEN_WIDTH = Dimensions.get('screen').width;
const CHART_WIDTH = SCREEN_WIDTH > 350 ? SCREEN_WIDTH - 100 : 250;

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	arrowButton: {
		width: 50,
		flex: 1,
		justifyContent: 'center',
		backgroundColor: toRgba(Colors.LightGrey, 0.4),
	},
	arrowLeftBorder: {
		borderTopStartRadius: 10,
		borderBottomStartRadius: 10,
	},
	arrowRightBorder: {
		borderTopEndRadius: 10,
		borderBottomEndRadius: 10,
	},
});

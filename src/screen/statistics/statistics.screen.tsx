import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { StoreModel } from '@redux/store';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryZoomContainer } from 'victory-native';
import { TrainingModel } from '@model/training.model';
import { calculateTrainingTotal } from '@util/training-exercise.util';
import { DateFormatEnum, formatDate } from '@util/date.util';
import moment from 'moment';

interface IDispatch {}

interface IState {
	trainings: TrainingModel[];
}

interface IProps {}

const domain: { x: [Date, Date] } = {
	x: [
		moment()
			.startOf('week')
			.subtract(6, 'hours')
			.toDate(),
		moment()
			.endOf('week')
			.add(6, 'hours')
			.toDate(),
	],
};

const Statistics = (props: IProps & IState & IDispatch) => {
	const { trainings } = props;

	const dataList = useMemo(() => {
		return trainings.map(t => ({
			x: moment(t.date).toDate(),
			y: +calculateTrainingTotal(t).toFixed(),
			name: t._id,
			color:
				'#' +
				calculateTrainingTotal(t)
					.toString()
					.substr(-3, 3),
		}));
	}, [trainings]);

	return (
		<View style={styles.wrapper}>
			<VictoryChart
				scale={{ x: 'time' }}
				containerComponent={<VictoryZoomContainer allowZoom={false} zoomDomain={domain} />}
				domainPadding={40}>
				<VictoryBar
					style={{
						data: {
							fill: ({ datum }) => datum.color,
							fillOpacity: 0.7,
						},
					}}
					barWidth={15}
					cornerRadius={3}
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
				<VictoryAxis tickFormat={date => formatDate(date, DateFormatEnum.DD_MMM)} />
			</VictoryChart>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
});

const mapStateToProps: MapStateToPropsParam<IState, IProps, StoreModel> = state => {
	return {
		trainings: state.training.trainings,
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatch, IProps> = () => {
	return {};
};

export const StatisticsScreen = connect(mapStateToProps, mapDispatchToProps)(Statistics);

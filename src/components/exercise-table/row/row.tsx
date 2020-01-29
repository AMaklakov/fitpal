import { RowModel } from './types';
import React from 'react';
import { Text, View } from 'react-native';
import style from './styles';
import { calcTotal } from './index';

const Row = (props: RowModel) => {
	const { exercise } = props;

	return (
		<View style={style.row}>
			<Text>{exercise.name}</Text>

			<View style={style.table}>
				<View style={style.tableHeading}>
					<Text>№</Text>
					<Text>🔁</Text>
					<Text>🏋</Text>
				</View>

				{exercise.series.map((s, index) => (
					<View key={index} style={style.tableBody}>
						<Text>{s.sequenceNumber}</Text>
						<Text>{s.repeats}</Text>
						<Text>{s.weight} кг</Text>
					</View>
				))}
			</View>

			<Text>{calcTotal(exercise)} кг</Text>
		</View>
	);
};

export default Row;

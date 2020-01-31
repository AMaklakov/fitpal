import { RowModel } from './types';
import React from 'react';
import { Text, View } from 'react-native';
import style from './styles';
import { calcTotal } from './index';

const Exercise = (props: RowModel) => {
	const { exercise } = props;

	return (
		<View>
			<Text style={style.h2}>{exercise.name}</Text>

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

			<Text style={style.total}>Итого: {calcTotal(exercise)} кг</Text>
		</View>
	);
};

export default Exercise;

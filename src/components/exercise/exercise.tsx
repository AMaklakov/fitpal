import { TrainingExerciseProps } from './types';
import React from 'react';
import { Text, View } from 'react-native';
import style from './styles';
import { calcTotal } from './index';
import H2 from '../heading/h2';

const TrainingExercise = (props: TrainingExerciseProps) => {
	const { trainingExercise, exerciseList } = props;
	const { exerciseId, seriesList } = trainingExercise;

	return (
		<View>
			<H2 text={exerciseList?.find(e => e.id === exerciseId)?.name || ''} />

			<View style={style.table}>
				<View style={style.tableHeading}>
					<Text>№</Text>
					<Text>🔁</Text>
					<Text>🏋</Text>
				</View>

				{seriesList.map((s, index) => (
					<View key={index} style={style.tableBody}>
						<Text>{s.sequenceNumber}</Text>
						<Text>{s.repeats}</Text>
						<Text>{s.weight} кг</Text>
					</View>
				))}
			</View>

			<Text style={style.total}>Итого: {calcTotal(trainingExercise)} кг</Text>
		</View>
	);
};

export default TrainingExercise;

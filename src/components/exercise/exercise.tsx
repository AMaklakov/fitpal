import { TrainingExerciseProps } from './types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import style from './styles';
import { calcTotal } from './index';
import { H2 } from '../heading/h2';
import { useTranslation } from 'react-i18next';

const TrainingExercise = (props: TrainingExerciseProps) => {
	const { trainingExercise, exerciseList, onLongPress, onPress } = props;
	const { exerciseId, seriesList } = trainingExercise;
	const { t } = useTranslation();

	const onLongPressAction = () => onLongPress && onLongPress(trainingExercise);
	const onPressAction = () => onPress && onPress(trainingExercise);

	return (
		<TouchableOpacity activeOpacity={1} onLongPress={onLongPressAction} onPress={onPressAction} style={style.wrapper}>
			<View style={style.innerWrapper}>
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
							<Text>
								{s.weight} {t('Kg')}
							</Text>
						</View>
					))}
				</View>

				<Text style={style.total}>{t('Total |num| kilos', { num: calcTotal(trainingExercise) })}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default TrainingExercise;

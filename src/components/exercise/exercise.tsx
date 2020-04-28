import { TrainingExerciseProps } from './types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import style from './styles';
import { H2 } from '../heading/h2';
import { useTranslation } from 'react-i18next';
import { calcTotal } from '@util/training-exercise.util';
import { ISeries } from '@model/training-exercise';
import { Colors } from '@css/colors.style';
import { WeightIcon } from '@icons/weight.icon';
import { CounterIcon } from '@icons/counter.icon';
import { HashtagIcon } from '@icons/hashtag.icon';

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
						<HashtagIcon color={Colors.White} />
						<CounterIcon color={Colors.White} />
						<WeightIcon color={Colors.White} />
					</View>

					{seriesList.map((s: ISeries, index: number) => (
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

import React, { FC } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TrainingModel } from '@model/training.model';
import { H2 } from '@components/heading/h2';
import { ExerciseModel } from '@model/exercise.model';
import { calcTotal, calculateTrainingTotal } from '@util/training-exercise.util';
import { useTranslation } from 'react-i18next';

interface IProps {
	training: TrainingModel;
	exercises: ExerciseModel[];
}

export const CompactTrainingView: FC<IProps> = props => {
	const { training, exercises } = props;
	const { t } = useTranslation();

	return (
		<ScrollView>
			<View style={styles.currentTrainingWrapper}>
				<H2 text={training.name} />

				<FlatList
					data={training.exerciseList}
					keyExtractor={ex => ex._id}
					renderItem={data => (
						<View style={styles.itemWrapper}>
							<Text>{getExerciseName(data.item.exerciseId, exercises)}</Text>
							<Text>
								{calcTotal(data.item)} {t('Kg')}
							</Text>
						</View>
					)}
				/>

				<View style={styles.total}>
					<Text>
						{t('Total')}: {calculateTrainingTotal(training).toString()}
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

const getExerciseName = (exerciseId: string, exercises: ExerciseModel[]) =>
	exercises.find(e => e._id === exerciseId)?.name;

const styles = StyleSheet.create({
	currentTrainingWrapper: {
		padding: 10,
	},
	itemWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 10,
	},
	total: {
		paddingVertical: 10,
		alignItems: 'center',
	},
});

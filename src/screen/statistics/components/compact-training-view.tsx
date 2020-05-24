import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TrainingModel } from '@model/training.model';
import { H2 } from '@components/heading/h2';
import { ExerciseModel } from '@model/exercise.model';
import { calcTotal, calculateTrainingTotal } from '@util/training-exercise.util';
import { useTranslation } from 'react-i18next';
import { Fonts } from '@css/fonts';
import { Divider } from 'react-native-elements';

interface IProps {
	training: TrainingModel;
	exercises: ExerciseModel[];
	useHeading?: boolean;
	listItemAction: any;
}

export const CompactTrainingView: FC<IProps> = props => {
	const { training, exercises, useHeading = true, listItemAction } = props;
	const { t } = useTranslation();

	return (
		<View style={styles.currentTrainingWrapper}>
			{useHeading && <H2 text={training.name} />}

				<View>
					<Text style={styles.heading}>
						{t('Exercise list')}:
					</Text>
				</View>
			<FlatList
				data={training.exerciseList}
				keyExtractor={ex => ex._id}
				renderItem={data => (
				<TouchableOpacity onPress={listItemAction}>
					<View style={styles.itemWrapper}>
						<Text>{getExerciseName(data.item.exerciseId, exercises)}</Text>
						<Text>
							{calcTotal(data.item)} {t('Kg')}
						</Text>
					</View>
				</TouchableOpacity>
				)}
			/>
			<Divider />
			<View style={styles.total}>
				<Text style={styles.totalLabel}>
					{t('Total')}:</Text>
				<View>
					<Text style={styles.totalValue}>{calculateTrainingTotal(training).toString()} {t('Kg')}</Text>
				</View>
			</View>
		</View>
	);
};

const getExerciseName = (exerciseId: string, exercises: ExerciseModel[]) =>
	exercises.find(e => e._id === exerciseId)?.name;

const styles = StyleSheet.create({
	currentTrainingWrapper: {
		paddingTop: 30
	},
	heading: {
			fontFamily: Fonts.Kelson,
			fontSize: 19,
			paddingVertical: 5,
	},
	itemWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10
	},
	total: {
		paddingVertical: 10,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	totalLabel: {
		fontFamily: Fonts.KelsonBold,
	},
	totalValue: {
		paddingTop: 8,
		fontFamily: Fonts.KelsonBold,
		fontSize: 34
	}
});

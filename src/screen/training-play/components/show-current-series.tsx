import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { TrainingModel } from '@model/training.model';
import { ExerciseModel } from '@model/exercise.model';
import { Colors } from '@css/colors.style';
import { Fonts, FontSizes } from '@css/fonts';
import { H2 } from '@components/heading/h2';
import { IBaseTrainingExercise, ISeries } from '@model/training-exercise';

interface IProps {
	training: TrainingModel;
	exercises: ExerciseModel[];
	currentSeriesId: string;
	currentExerciseId: string;
}

export const ShowCurrentSeries: FC<IProps> = props => {
	const { training, exercises, currentSeriesId, currentExerciseId } = props;
	const { t } = useTranslation();

	const [exercise, setExercise] = useState<IBaseTrainingExercise | undefined>();
	const [series, setSeries] = useState<ISeries | undefined>();

	useEffect(() => {
		const currentExercise = training.exerciseList.find(x => x._id === currentExerciseId);
		setExercise(currentExercise);
		setSeries(currentExercise?.seriesList.find(x => x._id === currentSeriesId));
	}, [currentExerciseId, currentSeriesId, training.exerciseList]);

	const getProgressNumber = useCallback(
		(arr: Array<{ _id: string }>, current: string) => {
			const num = arr.findIndex(x => x._id === current) + 1;
			return `${num} ${t('of')} ${arr.length}`;
		},
		[t]
	);

	if (!exercise || !series) {
		return null;
	}

	// TODO add styling
	return (
		<View style={styles.wrapper}>
			<Text style={styles.asLabel}>{t('Current exercise')}</Text>
			<H2 text={getExerciseName(exercise.exerciseId, exercises) ?? ''} />
			<Text>{getProgressNumber(training.exerciseList, currentExerciseId)}</Text>

			<Text style={styles.asLabel}>{t('Current series')}</Text>
			<View style={styles.activityWrapper}>
				<View style={styles.activity}>
					<Text style={styles.accentText}>{series.weight}</Text>
					<Text style={styles.mediumText}> {t('Kg')}</Text>
				</View>
				<View style={styles.activity}>
					<Text style={styles.accentText}>{series.repeats}</Text>
					<Text style={styles.mediumText}> {t('reps')}</Text>
				</View>
			</View>
			<Text>{getProgressNumber(exercise.seriesList, currentSeriesId)}</Text>
		</View>
	);
};

const getExerciseName = (exerciseId: string, exercises: ExerciseModel[]) =>
	exercises.find(e => e._id === exerciseId)?.name;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	activityWrapper: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'baseline',
	},
	activity: {
		marginHorizontal: 5,
		flexDirection: 'row',
		alignItems: 'baseline',
	},
	mediumText: {
		fontSize: FontSizes.Regular,
	},
	accentText: {
		fontSize: FontSizes.Accent,
		fontFamily: Fonts.KelsonBold,
	},
	asLabel: {
		marginBottom: 2,
		fontSize: 14,
		fontFamily: Fonts.Kelson,
		fontWeight: 'normal',
		color: Colors.Primary,
	},
});

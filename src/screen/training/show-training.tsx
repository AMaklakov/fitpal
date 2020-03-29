import React, { useMemo } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { calculateTrainingTotal } from '@components/exercise';
import { TrainingExerciseModel, TrainingModel } from '@model/training.model';
import { useTranslation } from 'react-i18next';
import { ExerciseModel } from '@model/exercise.model';
import { TrainingExerciseSwipeList } from '@components/training-exercise-swipe-list/training-exercise-swipe-list';

interface IProps {
	training: TrainingModel;
	exercises: ExerciseModel[];

	addExerciseAction: (e?: TrainingExerciseModel) => void;
	removeExercise: (e: TrainingExerciseModel) => void;
}

export const ShowTraining = (props: IProps) => {
	const { exercises, training, addExerciseAction, removeExercise } = props;
	const { exerciseList = [] } = training;
	const { t } = useTranslation();

	const total = useMemo(() => calculateTrainingTotal(training), [training]);

	const handleEditExercise = (e: TrainingExerciseModel) => addExerciseAction(e);

	const handleAddExercise = () => addExerciseAction();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const longTapAction = (e: TrainingExerciseModel) => undefined;

	return (
		<View style={style.wrapper}>
			<View style={style.wrapper}>
				<TrainingExerciseSwipeList
					canEdit={true}
					trainingExerciseList={exerciseList}
					exerciseList={exercises}
					onRowDelete={removeExercise}
					onRowEdit={handleEditExercise}
					onRowLongPress={longTapAction}
				/>

				<View style={style.total}>
					<Text style={style.totalText}>{t('Total |num| kilos', { num: total })}</Text>
				</View>
			</View>

			<View style={style.button}>
				<Button title={t('Add exercise +')} onPress={handleAddExercise} />
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	wrapper: { flex: 1 },
	total: {
		marginVertical: 20,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	totalText: {
		fontSize: 20,
	},
	noExercises: {
		marginTop: 20,
	},
	noExerciseText: {
		textAlign: 'center',
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'baseline',
		height: 80,
	},
});

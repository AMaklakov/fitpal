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

	const longTapAction = (e: TrainingExerciseModel) => undefined;

	return (
		<>
			<View style={style.wrapper}>
				{exerciseList.length === 0 && (
					<View style={style.noExercises}>
						<Text style={style.noExerciseText}>{t('No exercises')}</Text>
					</View>
				)}

				<TrainingExerciseSwipeList
					canEdit={true}
					trainingExerciseList={exerciseList}
					exerciseList={exercises}
					onRowDelete={removeExercise}
					onRowEdit={handleEditExercise}
					onRowLongPress={longTapAction}
				/>
			</View>

			<View style={style.total}>
				<Text style={style.totalText}>{t('Total |num| kilos', { num: total })}</Text>
			</View>

			<Button title={t('Add exercise +')} onPress={handleAddExercise} />
		</>
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
});

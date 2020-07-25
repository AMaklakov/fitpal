import React, { ReactElement, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ITraining } from '@model/training.model';
import { useTranslation } from 'react-i18next';
import { ExerciseModel } from '@model/exercise.model';
import { TrainingExerciseSwipeList } from '@components/training-exercise-swipe-list/training-exercise-swipe-list';
import { IBaseTrainingExercise } from '@model/training-exercise';
import { calculateTrainingTotal } from '@util/training-exercise.util';
import { Button } from '@components/button/button';
import { FontSizes } from '@css/fonts';

interface IProps {
	training: ITraining;
	exercises: ExerciseModel[];
	header?: ReactElement;
	onAddExercise: (e?: IBaseTrainingExercise) => void;
	removeExercise: (e: IBaseTrainingExercise) => void;
	onReorder: () => void;
	onCalcRM?: (e: IBaseTrainingExercise) => void;
}

export const ShowTraining = (props: IProps) => {
	const { exercises, training, onAddExercise, header, removeExercise, onReorder, onCalcRM } = props;
	const { exerciseList = [] } = training;
	const { t } = useTranslation();

	const total = useMemo(() => calculateTrainingTotal(training), [training]);

	const handleEditExercise = (e: IBaseTrainingExercise) => onAddExercise(e);

	const handleAddExercise = () => onAddExercise();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const longTapAction = (e: IBaseTrainingExercise) => onReorder();

	return (
		<View style={style.wrapper}>
			<TrainingExerciseSwipeList
				canEdit={true}
				trainingExerciseList={exerciseList}
				exerciseList={exercises}
				onRowDelete={removeExercise}
				onRowEdit={handleEditExercise}
				onRowLongPress={longTapAction}
				onCalcRM={onCalcRM}
				onReorder={onReorder}
				ListHeaderComponent={header}
				ListFooterComponent={
					<View style={style.total}>
						<Text style={style.totalText}>{t('Total |num| kilos', { num: total })}</Text>
					</View>
				}
			/>

			<View style={style.button}>
				<Button solidType="purple" title={t('Add exercise +')} onPress={handleAddExercise} />
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	wrapper: { flex: 1 },
	total: { paddingTop: 10, alignItems: 'center' },
	totalText: { fontSize: FontSizes.H3 },
	noExerciseText: { textAlign: 'center' },
	button: {
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'center',
	},
});

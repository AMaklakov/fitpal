import React, { useMemo } from 'react';
import { ActionSheetIOS, Button, StyleSheet, Text, View } from 'react-native';
import TrainingExercise from '../../components/exercise/exercise';
import { ShowTrainingProps } from './types';
import { calculateTrainingTotal } from '../../components/exercise';
import { TrainingExerciseModel } from '../../model/training.model';
import { useTranslation } from 'react-i18next';

const ShowTraining = (props: ShowTrainingProps) => {
	const { exercises, training, addExerciseAction, removeExercise } = props;
	const { exerciseList = [] } = training;
	const { t } = useTranslation();

	const total = useMemo(() => calculateTrainingTotal(training), [training]);

	const editExercise = (e: TrainingExerciseModel) => addExerciseAction(e);

	const longTapAction = (e: TrainingExerciseModel) => {
		const options = [t('Cancel'), t('Delete'), t('Edit')];

		ActionSheetIOS.showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex: 0,
			},
			buttonIndex => {
				switch (buttonIndex) {
					case 1:
						removeExercise(e);
						return;
					case 2:
						editExercise(e);
						return;
					default:
						return;
				}
			}
		);
	};

	return (
		<>
			<View style={style.wrapper}>
				{exerciseList.length === 0 && (
					<View style={style.noExercises}>
						<Text style={style.noExerciseText}>{t('No exercises')}</Text>
					</View>
				)}

				{exerciseList.map(e => (
					<TrainingExercise trainingExercise={e} key={e.id} exerciseList={exercises} onLongPress={longTapAction} />
				))}
			</View>

			<View style={style.total}>
				<Text style={style.totalText}>{t('Total |num| kilos', { num: total })}</Text>
			</View>

			<Button title={t('Add exercise +')} onPress={() => addExerciseAction()} />
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

export default ShowTraining;

import React, { useMemo } from 'react';
import { ActionSheetIOS, Button, Text, View } from 'react-native';
import style from './styles';
import TrainingExercise from '../../components/exercise/exercise';
import { ShowTrainingProps } from './types';
import { calculateTrainingTotal } from '../../components/exercise';
import { TrainingExerciseModel } from '../../model/training.model';

enum TrainingExerciseActions {
	DELETE = 'DELETE',
	EDIT = 'EDIT',
}

const EmptyExercises = <Text>Пока что упражений нет</Text>;

const ShowTraining = (props: ShowTrainingProps) => {
	const { exercises, training, addExerciseAction, removeExercise } = props;
	const { exerciseList = [] } = training;

	const total = useMemo(() => calculateTrainingTotal(training), [training]);

	const editExercise = (e: TrainingExerciseModel) => addExerciseAction(e);

	const longTapAction = (e: TrainingExerciseModel) => {
		const options = ['Отмена', TrainingExerciseActions.DELETE, TrainingExerciseActions.EDIT];

		ActionSheetIOS.showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex: 0,
			},
			buttonIndex => {
				if (buttonIndex === 0) {
					return;
				}

				switch (options[buttonIndex]) {
					case TrainingExerciseActions.DELETE:
						removeExercise(e);
						return;
					case TrainingExerciseActions.EDIT:
						editExercise(e);
						return;
				}
			}
		);
	};

	return (
		<>
			<View style={style.wrapper}>
				{exerciseList.length === 0 && EmptyExercises}

				{exerciseList.map(e => (
					<TrainingExercise trainingExercise={e} key={e.id} exerciseList={exercises} onLongPress={longTapAction} />
				))}
			</View>

			<View style={style.total}>
				<Text style={style.totalText}>Итого: {total} кг </Text>
			</View>

			<Button title={'+ Добавить упражнение'} onPress={() => addExerciseAction()} />
		</>
	);
};

export default ShowTraining;

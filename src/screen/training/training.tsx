import { TrainingProps } from './types';
import React from 'react';
import TrainingExercise from '../../components/exercise/exercise';
import { ActionSheetIOS, Button, ScrollView, Text, View } from 'react-native';
import style from './styles';
import H1 from '../../components/heading/h1';
import { TrainingExerciseModel } from '@model/training.model';

enum TrainingExerciseActions {
	DELETE = 'DELETE',
	EDIT = 'EDIT',
}

const Training = (props: TrainingProps) => {
	const { training, addExerciseAction, exercises, removeExercise } = props;

	if (!training) {
		throw new Error(`No training present`);
	}

	const { date, exerciseList = [] } = training;

	const emptyTag = () => <Text>Пока что упражений нет</Text>;

	const addExercise = () => addExerciseAction();
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
		<ScrollView>
			<View style={style.wrapper}>
				<H1 text={'Тренировка ' + date} />

				{exerciseList.length === 0 && emptyTag()}

				{exerciseList.map((e, index) => (
					<TrainingExercise
						trainingExercise={e}
						key={index}
						exerciseList={exercises}
						onLongPress={longTapAction}
					/>
				))}
			</View>

			<Button title={'+ Добавить упражнение'} onPress={addExercise} />
		</ScrollView>
	);
};

export default Training;

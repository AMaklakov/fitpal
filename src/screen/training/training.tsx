import { TrainingProps } from './types';
import React from 'react';
import TrainingExercise from '../../components/exercise/exercise';
import { Button, ScrollView, Text, View } from 'react-native';
import style from './styles';
import H1 from '../../components/heading/h1';

const Training = (props: TrainingProps) => {
	const { training, addExerciseAction, exercises } = props;

	if (!training) {
		throw new Error(`No training present`);
	}

	const { date, exerciseList = [] } = training;

	const emptyTag = () => <Text>Пока что упражений нет</Text>;

	return (
		<ScrollView>
			<View style={style.wrapper}>
				<H1 text={'Тренировка ' + date} />

				{exerciseList.length === 0 && emptyTag()}

				{exerciseList.map((e, index) => (
					<TrainingExercise trainingExercise={e} key={index} exerciseList={exercises} />
				))}
			</View>

			<Button title={'+ Добавить упражнение'} onPress={addExerciseAction} />
		</ScrollView>
	);
};

export default Training;

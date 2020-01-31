import { ExerciseTablePropsModel } from './types';
import React, { useState } from 'react';
import Exercise from '../exercise/exercise';
import { Button, ScrollView, Text, View } from 'react-native';
import style from './styles';
import CreateExercise from '../create-exercise/create-exercise';
import { ExerciseModel } from '@model/exercise.model';

const TODAY = new Date();
const TODAY_DD_MM_YYYY = `${TODAY.getDate()}.${TODAY.getMonth() + 1}.${TODAY.getFullYear()}`;

export const ExerciseTable = (props: ExerciseTablePropsModel) => {
	const { rowList, setRowList, date = TODAY_DD_MM_YYYY } = props;
	const [modalVisible, setModalVisible] = useState(false);

	const addExerciseAction = () => {
		setModalVisible(true);
	};

	const addExercise = (exercise: ExerciseModel) => {
		setRowList([...rowList, { exercise }]);
	};

	const exerciseListEl = () =>
		rowList.map((r, index) => <Exercise exercise={r.exercise} key={index} />);

	const emptyTag = () => <Text>Пока что упражений нет</Text>;

	return (
		<ScrollView>
			<View style={style.wrapper}>
				<View>
					<Text style={style.h1}>Тренировка {date}</Text>
				</View>

				{rowList.length > 0 ? exerciseListEl() : emptyTag()}
			</View>

			<Button title={'+ Добавить упражнение'} onPress={addExerciseAction} />

			<CreateExercise
				visible={modalVisible}
				setVisible={v => setModalVisible(v)}
				onSave={addExercise}
			/>
		</ScrollView>
	);
};

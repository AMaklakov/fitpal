import { ExerciseTablePropsModel } from './types';
import React, { useState } from 'react';
import Exercise from '../exercise/exercise';
import { Button, ScrollView, View } from 'react-native';
import style from './styles';
import CreateExercise from '../create-exercise/create-exercise';
import { ExerciseModel } from '@model/exercise.model';

export const ExerciseTable = (props: ExerciseTablePropsModel) => {
	const { canEdit, rowList, setRowList } = props;
	const [modalVisible, setModalVisible] = useState(false);

	const addExerciseAction = () => {
		setModalVisible(true);
	};

	const addExercise = (exercise: ExerciseModel) => {
		setRowList([...rowList, { exercise }]);
	};

	return (
		<ScrollView>
			<View style={style.wrapper}>
				{/*<View style={style.heading}>*/}
				{/*	<Text>Название</Text>*/}
				{/*	<Text>Подходы</Text>*/}
				{/*	<Text>Итого</Text>*/}
				{/*</View>*/}

				{rowList.map((r, index) => (
					<Exercise exercise={r.exercise} key={index} />
				))}
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

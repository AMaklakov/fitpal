import { ExerciseTablePropsModel } from './types';
import React, { useState } from 'react';
import Row from './row/row';
import { Button, ScrollView, Text, View } from 'react-native';
import style from './styles';
import CreateExercise from '../create-exercise/create-exercise';
import { ExerciseModel } from '@model/exercise.model';

export const ExerciseTable = (props: ExerciseTablePropsModel) => {
	const { canEdit, rowList: rowListProp } = props;
	const [modalVisible, setModalVisible] = useState({ visible: false });

	const [rowList, setRowList] = useState(rowListProp);

	const addExerciseAction = () => {
		setModalVisible({ visible: true });
	};

	const addExercise = (exercise: ExerciseModel) => {
		setRowList([...rowList, { exercise }]);
	};

	return (
		<ScrollView>
			<View style={style.wrapper}>
				<View style={style.heading}>
					<Text>Название</Text>
					<Text>Подходы</Text>
					<Text>Итого</Text>
				</View>

				{rowList.map((r, index) => (
					<Row exercise={r.exercise} key={index} />
				))}
			</View>

			<Button title={'Добавить упражнение'} onPress={addExerciseAction} />

			<CreateExercise modalVisible={modalVisible} onSave={addExercise} />
		</ScrollView>
	);
};

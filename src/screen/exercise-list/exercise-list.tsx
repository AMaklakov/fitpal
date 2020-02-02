import React from 'react';
import { Button, Text, View } from 'react-native';
import { ExerciseListProps } from './types';

const ExerciseList = (props: ExerciseListProps) => {
	const { exerciseList = [], goToCreateExercise } = props;

	return (
		<View>
			{exerciseList.map(exercise => (
				<Text key={exercise.id}>{exercise.name}</Text>
			))}

			<Button title="+ Добавить упражнение" onPress={goToCreateExercise} />
		</View>
	);
};

export default ExerciseList;

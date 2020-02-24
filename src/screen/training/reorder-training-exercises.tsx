import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ReorderTrainingExerciseProps } from './types';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { TrainingExerciseModel } from '@model/training.model';
import { ExerciseModel } from '@model/exercise.model';
import { ReorderIcon } from '../../components/icons/reorder.icon';

const RenderItem = (exerciseList: ExerciseModel[]) => ({
	item,
	drag,
	isActive,
}: RenderItemParams<TrainingExerciseModel>) => {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			style={{
				height: 50,
				paddingHorizontal: '10%',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				backgroundColor: isActive && '#ccc',
			}}>
			<Text>{exerciseList.find(e => e.id === item.exerciseId)?.name}</Text>

			<ReorderIcon onLongPress={drag} color={!isActive ? '#888' : '#000'} />
		</TouchableOpacity>
	);
};

const ReorderTrainingExercise = (props: ReorderTrainingExerciseProps) => {
	const { changeTraining, exercises, training } = props;

	function updateTraining(data: TrainingExerciseModel[]) {
		changeTraining({ ...training, exerciseList: data });
	}

	return (
		<View style={{ flex: 1 }}>
			<DraggableFlatList<TrainingExerciseModel>
				keyExtractor={exercise => exercise.id}
				data={training.exerciseList}
				renderItem={RenderItem(exercises)}
				onDragEnd={({ data }) => updateTraining(data)}
			/>
		</View>
	);
};

export default ReorderTrainingExercise;

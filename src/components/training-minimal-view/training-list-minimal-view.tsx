import { TrainingModel } from '@model/training.model';
import { FlatList } from 'react-native';
import React from 'react';
import { TrainingMinimalView } from './training-minimal-view';
import { ExerciseModel } from '@model/exercise.model';

interface IProps {
	exercises: ExerciseModel[];
	trainingList: TrainingModel[];
	onTrainingPress?: (training: TrainingModel) => void;
	onTrainingStart?: (training: TrainingModel) => void;
	onExercisePress?: (exerciseId: string) => void;
	onCopy?: (training: TrainingModel) => void;
	onDelete?: (training: TrainingModel) => void;
	onEdit?: (training: TrainingModel) => void;
}

export const TrainingListMinimalView = (props: IProps) => {
	const { trainingList, exercises, onTrainingPress, onExercisePress, onTrainingStart } = props;
	const { onCopy, onDelete, onEdit } = props;

	return (
		<FlatList<TrainingModel>
			data={trainingList}
			keyExtractor={x => x._id}
			renderItem={data => (
				<TrainingMinimalView
					training={data.item}
					exercises={exercises}
					onTrainingPress={onTrainingPress}
					onTrainingStart={onTrainingStart}
					onDelete={onDelete}
					onCopy={onCopy}
					onEdit={onEdit}
					onExercisePress={onExercisePress}
				/>
			)}
		/>
	);
};

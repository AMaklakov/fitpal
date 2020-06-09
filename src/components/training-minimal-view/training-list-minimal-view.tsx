import { TrainingModel } from '@model/training.model';
import { FlatList } from 'react-native';
import React from 'react';
import { TrainingMinimalView } from './training-minimal-view';
import { ExerciseModel } from '@model/exercise.model';

interface TrainingListMinimalViewProps {
	trainingList?: TrainingModel[];
	onTrainingPress?: (training: TrainingModel) => void;
	onTrainingStart?: (training: TrainingModel) => void;
	onExercisePress?: (exerciseId: string) => void;

	onCopy: (training: TrainingModel) => void;
	onDelete: (training: TrainingModel) => void;
	exercises: ExerciseModel[];
}

export const TrainingListMinimalView = (props: TrainingListMinimalViewProps) => {
	const { trainingList, exercises, onTrainingPress, onCopy, onDelete, onExercisePress, onTrainingStart } = props;

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
					onExercisePress={onExercisePress}
				/>
			)}
		/>
	);
};

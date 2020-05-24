import { TrainingModel } from '@model/training.model';
import { FlatList } from 'react-native';
import React from 'react';
import { TrainingMinimalView } from './training-minimal-view';
import { ExerciseModel } from '@model/exercise.model';

interface TrainingListMinimalViewProps {
	trainingList?: TrainingModel[];
	onTrainingPress?: (training: TrainingModel) => void;

	onCopy: (training: TrainingModel) => void;
	onDelete: (training: TrainingModel) => void;
	exercises: ExerciseModel[];
}

export const TrainingListMinimalView = (props: TrainingListMinimalViewProps) => {
	const { trainingList, exercises, onTrainingPress, onCopy = () => {}, onDelete = () => {} } = props;

	return (
		<FlatList<TrainingModel>
			data={trainingList}
			renderItem={data => (
				<TrainingMinimalView
					training={data.item}
					exercises={exercises}
					onTrainingPress={onTrainingPress}
					onDelete={onDelete}
					onCopy={onCopy}
				/>
			)}
		/>
	);
};

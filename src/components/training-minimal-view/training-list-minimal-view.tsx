import { TrainingModel } from '@model/training.model';
import { FlatList } from 'react-native';
import React from 'react';
import { TrainingMinimalView } from './training-minimal-view';

interface TrainingListMinimalViewProps {
	trainingList?: TrainingModel[];
	onTrainingPress?: (training: TrainingModel) => void;

	onCopy: (training: TrainingModel) => void;
	onDelete: (training: TrainingModel) => void;
}

export const TrainingListMinimalView = (props: TrainingListMinimalViewProps) => {
	const { trainingList, onTrainingPress, onCopy = () => {}, onDelete = () => {} } = props;

	return (
		<FlatList<TrainingModel>
			data={trainingList}
			renderItem={data => (
				<TrainingMinimalView
					training={data.item}
					onTrainingPress={onTrainingPress}
					onDelete={onDelete}
					onCopy={onCopy}
				/>
			)}
		/>
	);
};

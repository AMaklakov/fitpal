import { TrainingModel } from '@model/training.model';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { TrainingMinimalView } from './training-minimal-view';

interface TrainingListMinimalViewProps {
	trainingList?: TrainingModel[];
	onTrainingPress?: (training: TrainingModel) => void;
}

const styles = StyleSheet.create({});

export const TrainingListMinimalView = (props: TrainingListMinimalViewProps) => {
	const { trainingList, onTrainingPress } = props;

	return (
		<View>
			{trainingList?.map(t => (
				<TrainingMinimalView key={t.id} training={t} onPress={onTrainingPress} />
			))}
		</View>
	);
};

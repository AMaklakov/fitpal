import { TrainingModel } from '@model/training.model';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { TrainingMinimalView } from './training-minimal-view';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Colors } from '../../css/colors.style';
import { SwipeHiddenButton } from '../swipe-list/button';

interface TrainingListMinimalViewProps {
	trainingList?: TrainingModel[];
	onTrainingPress?: (training: TrainingModel) => void;

	onCopy: (training: TrainingModel) => void;
	onDelete: (training: TrainingModel) => void;
}

const styles = StyleSheet.create({
	rowBack: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button1: {
		flex: 1,
		alignItems: 'flex-start',
	},
	button2: {
		flex: 1,
		alignItems: 'flex-end',
	},
});

export const TrainingListMinimalView = (props: TrainingListMinimalViewProps) => {
	const { trainingList, onTrainingPress, onCopy = () => {}, onDelete = () => {} } = props;

	return (
		<SwipeListView<TrainingModel>
			data={trainingList}
			renderItem={(data, rowMap) => (
				<TrainingMinimalView training={data.item} onTrainingPress={onTrainingPress} />
			)}
			renderHiddenItem={(data, rowMap) => (
				<View style={styles.rowBack}>
					<SwipeHiddenButton
						style={styles.button1}
						title={'Copy'}
						item={data.item}
						onTouch={onCopy}
					/>

					<SwipeHiddenButton
						style={styles.button2}
						title={'Delete'}
						item={data.item}
						onTouch={onDelete}
						backgroundColor={Colors.LightRed}
						textColor={Colors.DarkRed}
					/>
				</View>
			)}
			leftOpenValue={75}
			stopLeftSwipe={100}
			rightOpenValue={-75}
			stopRightSwipe={-100}
		/>
	);
};

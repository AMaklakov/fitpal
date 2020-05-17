import { TrainingModel } from '../../model/training.model';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { TrainingMinimalView } from './training-minimal-view';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Colors } from '../../css/colors.style';
import { SwipeHiddenButton } from '../swipe-list/button';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation();

	return (
		<SwipeListView<TrainingModel>
			data={trainingList}
			renderItem={data => <TrainingMinimalView training={data.item} onTrainingPress={onTrainingPress} />}
			renderHiddenItem={data => (
				<View style={styles.rowBack}>
					<SwipeHiddenButton
						style={styles.button1}
						title={t('Copy')}
						item={data.item}
						textColor={Colors.White}
						onTouch={onCopy}
					/>

					<SwipeHiddenButton
						style={styles.button2}
						title={t('Delete')}
						item={data.item}
						onTouch={onDelete}
						backgroundColor={Colors.LightRed}
						textColor={Colors.White}
					/>
				</View>
			)}
			leftOpenValue={115}
			stopLeftSwipe={130}
			rightOpenValue={-115}
			stopRightSwipe={-130}
		/>
	);
};

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TrainingExerciseModel } from '@model/training.model';
import { ExerciseModel } from '@model/exercise.model';
import { SwipeHiddenButton } from '@components/swipe-list/button';
import { Colors } from '@css/colors.style';
import { SwipeListView } from 'react-native-swipe-list-view';
import TrainingExercise from '@components/exercise/exercise';
import { useTranslation } from 'react-i18next';

interface IProps {
	trainingExerciseList: TrainingExerciseModel[];
	exerciseList: ExerciseModel[];
	canEdit: boolean;

	onRowLongPress: (e: TrainingExerciseModel) => void;
	onRowEdit: (e: TrainingExerciseModel) => void;
	onRowDelete: (e: TrainingExerciseModel) => void;
}

export const TrainingExerciseSwipeList = (props: IProps) => {
	const { exerciseList, trainingExerciseList = [], onRowLongPress, onRowDelete, onRowEdit, canEdit } = props;
	const { t } = useTranslation();

	return (
		<SwipeListView<TrainingExerciseModel>
			data={trainingExerciseList}
			renderItem={(data, rowMap) => (
				<TrainingExercise trainingExercise={data.item} exerciseList={exerciseList} onLongPress={onRowLongPress} />
			)}
			renderHiddenItem={(data, rowMap) => (
				<View style={styles.hiddenActionsWrapper}>
					<SwipeHiddenButton
						style={styles.button}
						title={t('Edit')}
						item={data.item}
						textColor={Colors.White}
						onTouch={onRowEdit}
					/>

					<SwipeHiddenButton
						style={styles.button}
						title={t('Delete')}
						item={data.item}
						onTouch={onRowDelete}
						backgroundColor={Colors.LightRed}
						textColor={Colors.White}
					/>
				</View>
			)}
			disableRightSwipe={true}
			disableLeftSwipe={!canEdit}
			rightOpenValue={-140}
			stopRightSwipe={-160}
		/>
	);
};

const styles = StyleSheet.create({
	hiddenActionsWrapper: {
		flex: 1,
		justifyContent: 'space-between',
	},
	button: {
		flex: 1,
		minHeight: 50,
		alignItems: 'flex-end',
	},
});

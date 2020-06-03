import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IBaseTrainingExercise } from '@model/training-exercise';
import { ExerciseModel } from '@model/exercise.model';
import { SwipeHiddenButton } from '@components/swipe-list/button';
import { Colors } from '@css/colors.style';
import { SwipeListView } from 'react-native-swipe-list-view';
import TrainingExercise from '@components/exercise/exercise';
import { useTranslation } from 'react-i18next';

interface IProps {
	trainingExerciseList: IBaseTrainingExercise[];
	exerciseList: ExerciseModel[];
	canEdit: boolean;

	onRowLongPress: (e: IBaseTrainingExercise) => void;
	onRowEdit: (e: IBaseTrainingExercise) => void;
	onRowDelete: (e: IBaseTrainingExercise) => void;
	onCalcRM?: (e: IBaseTrainingExercise) => void;
}

export const TrainingExerciseSwipeList = (props: IProps) => {
	const { exerciseList, trainingExerciseList = [], onRowLongPress, onRowDelete, onRowEdit, canEdit } = props;
	const { onCalcRM } = props;
	const { t } = useTranslation();

	return (
		<SwipeListView<IBaseTrainingExercise>
			data={trainingExerciseList}
			keyExtractor={x => x._id}
			renderItem={data => (
				<TrainingExercise
					trainingExercise={data.item}
					exerciseList={exerciseList}
					onLongPress={onRowLongPress}
					onCalcRM={onCalcRM}
					onEdit={onRowEdit}
					onDelete={onRowDelete}
				/>
			)}
			renderHiddenItem={data => (
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

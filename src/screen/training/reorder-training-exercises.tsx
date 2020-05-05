import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { ReorderIcon } from '@icons/reorder.icon';
import { ExerciseModel } from '@model/exercise.model';
import { TrainingModel } from '@model/training.model';
import { IBaseTrainingExercise } from '@model/training-exercise';
import { Colors } from '@css/colors.style';
import { commonStyles } from '@screen/create-training-exercise/style';
import { SaveIcon } from '@icons/save.icon';
import { useTranslation } from 'react-i18next';
import { toRgba } from '@util/css.util';
import { ButtonIcon } from '@components/button-icon/button-icon';

interface IProps {
	training: TrainingModel;
	changeTraining: (training: TrainingModel) => void;
	onSave: () => void;

	exercises: ExerciseModel[];
}

export const ReorderTrainingExercise = (props: IProps) => {
	const { changeTraining, exercises, training, onSave } = props;
	const { t } = useTranslation();

	const [exerciseList, setExerciseList] = useState(training.exerciseList);

	const handleSavePress = useCallback(() => {
		changeTraining({ ...training, exerciseList });
		onSave();
	}, [training, changeTraining, exerciseList, onSave]);

	return (
		<View style={styles.wrapper}>
			<DraggableFlatList<IBaseTrainingExercise>
				keyExtractor={(exercise: IBaseTrainingExercise) => exercise.id}
				data={training.exerciseList}
				renderItem={RenderItem(exercises)}
				onDragEnd={({ data }) => setExerciseList(data)}
			/>
			<TouchableOpacity onPress={handleSavePress} style={styles.buttonWithIconWrapper}>
				<SaveIcon color={Colors.LightBlue} />
				<Text style={commonStyles.saveButtonText}>{t('Save')}</Text>
			</TouchableOpacity>
		</View>
	);
};

const RenderItem = (exerciseList: ExerciseModel[]) => ({
	item,
	drag,
	isActive,
}: RenderItemParams<IBaseTrainingExercise>) => {
	return (
		<TouchableOpacity onPressIn={drag} activeOpacity={0.9} style={[styles.renderItem, isActive && styles.renderActive]}>
			<Text>{exerciseList.find(e => e._id === item.exerciseId)?.name}</Text>
			<View style={styles.iconStyle}>
				<ButtonIcon onPressIn={drag} icon={<ReorderIcon color={isActive ? Colors.Black : Colors.Grey} />} />
			</View>
		</TouchableOpacity>
	);
};

const LINE_HEIGHT = 50;

const styles = StyleSheet.create({
	wrapper: { flex: 1 },
	renderItem: {
		height: LINE_HEIGHT,
		paddingHorizontal: '10%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	renderActive: {
		backgroundColor: toRgba(Colors.LightBlue, 0.5),
	},
	iconStyle: {
		width: 80,
		height: LINE_HEIGHT - 10,
		backgroundColor: `rgba(100, 100, 100, 0.1)`,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonWithIconWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 20,
	},
});

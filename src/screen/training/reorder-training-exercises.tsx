import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { ReorderIcon } from '@icons/reorder.icon';
import { ExerciseModel } from '@model/exercise.model';
import { TrainingModel } from '@model/training.model';
import { IBaseTrainingExercise } from '@model/training-exercise';
import { Colors } from '@css/colors.style';
import { useTranslation } from 'react-i18next';
import { toRgba } from '@util/css.util';
import { ButtonIcon } from '@components/button-icon/button-icon';
import { Button } from '@components/button/button';

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

	const handleSetExerciseList = useCallback(({ data }: { data: IBaseTrainingExercise[] }) => setExerciseList(data), []);

	const handleSavePress = useCallback(() => {
		changeTraining({ ...training, exerciseList });
		onSave();
	}, [training, changeTraining, exerciseList, onSave]);

	return (
		<View style={styles.wrapper}>
			<DraggableFlatList<IBaseTrainingExercise>
				style={styles.flatList}
				keyExtractor={exercise => exercise._id}
				data={exerciseList}
				renderItem={RenderItem(exercises)}
				onDragEnd={handleSetExerciseList}
			/>

			<Button
				title={t('Save')}
				icon={{ name: 'save', color: Colors.White }}
				onPress={handleSavePress}
				style={styles.button}
			/>
		</View>
	);
};

const RenderItem = (exerciseList: ExerciseModel[]) => ({
	item,
	drag,
	isActive,
}: RenderItemParams<IBaseTrainingExercise>) => {
	return (
		<TouchableOpacity onPressIn={drag} activeOpacity={0.9} style={[styles.item, isActive && styles.activeItem]}>
			<Text>{exerciseList.find(e => e._id === item.exerciseId)?.name}</Text>
			<View style={[styles.icon, isActive && styles.activeIcon]}>
				<ButtonIcon onPressIn={drag} icon={<ReorderIcon color={isActive ? Colors.Black : Colors.Darkgray} />} />
			</View>
		</TouchableOpacity>
	);
};

const LINE_HEIGHT = 50;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: 'center',
	},
	flatList: {
		width: SCREEN_WIDTH - 40,
	},
	item: {
		padding: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	activeItem: {
		backgroundColor: toRgba(Colors.Accent, 0.3),
	},
	icon: {
		width: 80,
		height: LINE_HEIGHT - 10,
		backgroundColor: toRgba(Colors.LightGrey, 0.3),
		justifyContent: 'center',
		alignItems: 'center',
	},
	activeIcon: {
		backgroundColor: Colors.White,
	},
	button: {
		marginVertical: 20,
	},
});

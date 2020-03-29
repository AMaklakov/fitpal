import { TrainingProps } from './types';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { H1 } from '@components/heading/h1';
import { TrainingModel } from '@model/training.model';
import { ShowTraining } from './show-training';
import { ReorderTrainingExercise } from './reorder-training-exercises';
import { EditIcon } from '@icons/edit.icon';
import { SaveIcon } from '@icons/save.icon';

const Training = (props: TrainingProps) => {
	const { training, addExerciseAction, exercises, removeExercise, changeTraining, canEdit } = props;

	if (!training) {
		throw new Error(`No training present`);
	}

	const { date } = training;
	const [isEdit, changeIsEdit] = useState(false);

	const reorderExercises = (t: TrainingModel) => changeTraining(t);

	const handleEditButtonPress = () => changeIsEdit(prevState => !prevState);

	return (
		<ScrollView>
			<View
				style={{
					flexDirection: 'row',
					paddingHorizontal: '5%',
					justifyContent: 'space-around',
				}}>
				<H1 text={training?.name + ' ' + date} />

				{canEdit && isEdit && <SaveIcon onPress={handleEditButtonPress} />}
				{canEdit && !isEdit && <EditIcon onPress={handleEditButtonPress} />}
			</View>

			{isEdit ? (
				<ReorderTrainingExercise exercises={exercises} training={training} changeTraining={reorderExercises} />
			) : (
				<ShowTraining
					exercises={exercises}
					addExerciseAction={addExerciseAction}
					removeExercise={removeExercise}
					training={training}
				/>
			)}
		</ScrollView>
	);
};

export default Training;

import React from 'react';
import { SelectedItemViewComponentProps } from '../../components/autocomplete-input/types';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ExerciseModel } from '../../model/exercise.model';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

const ShowSelectedExercise = (props: SelectedItemViewComponentProps<ExerciseModel>) => {
	const { item, onCancel } = props;

	return (
		<View style={styles.container}>
			<Text>{item.name}</Text>

			<TouchableWithoutFeedback onPress={onCancel}>
				<Text>ⓧ</Text>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default ShowSelectedExercise;

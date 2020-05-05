import React from 'react';
import { SelectedItemViewComponentProps } from '@components/autocomplete-input/types';
import { StyleSheet, Text, View } from 'react-native';
import { ExerciseModel } from '@model/exercise.model';
import { ButtonIcon } from '@components/button-icon/button-icon';
import { Colors } from '@css/colors.style';
import { CancelIcon } from '@icons/cancel.icon';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

const ShowSelectedExercise = (props: SelectedItemViewComponentProps<ExerciseModel>) => {
	const { item, onCancel } = props;

	return (
		<View style={styles.container}>
			<Text>{item.name}</Text>

			<ButtonIcon icon={<CancelIcon color={Colors.Black} />} onPress={onCancel} />
		</View>
	);
};

export default ShowSelectedExercise;

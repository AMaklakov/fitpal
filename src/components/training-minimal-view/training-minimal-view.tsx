import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TrainingModel } from '@model/training.model';
import { H2 } from '../heading/h2';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: 20,
		marginBottom: 10,
	},
});

interface TrainingMinimalViewProps {
	training: TrainingModel;
	onPress?: (training: TrainingModel) => void;
}

export const TrainingMinimalView = (props: TrainingMinimalViewProps) => {
	const { training, onPress } = props;

	const handleOnPress = () => {
		onPress?.(training);
	};

	return (
		<TouchableOpacity onPress={handleOnPress}>
			<View style={styles.container}>
				<H2 text={training?.name} />

				<View>
					<Text>{training?.exerciseList?.length} упражнений</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

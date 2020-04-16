import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { TrainingModel } from '@model/training.model';
import { H2 } from '@components/heading/h2';
import { Colors } from '@css/colors.style';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: Colors.LightBlue,
	},
	description: {
		maxWidth: 70 + '%',
	},
	exerciseWrap: {
		maxWidth: 30 + '%',
	},
});

interface TrainingMinimalViewProps {
	training: TrainingModel;
	onTrainingPress?: (training: TrainingModel) => void;
}

export const TrainingMinimalView = (props: TrainingMinimalViewProps) => {
	const { training, onTrainingPress } = props;

	const handleOnPress = () => {
		onTrainingPress?.(training);
	};

	return (
		<TouchableHighlight onPress={handleOnPress}>
			<View style={styles.container}>
				<View style={styles.description}>
					<H2 numberOfLinesEllipsis={1} text={training?.name} />
				</View>
				<View style={styles.exerciseWrap}>
					<Text>{training?.exerciseList?.length} упражнений</Text>
				</View>
			</View>
		</TouchableHighlight>
	);
};

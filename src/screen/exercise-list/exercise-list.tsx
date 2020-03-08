import React, { useMemo } from 'react';
import { Button, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ExerciseListProps } from './types';
import { mapExerciseListToSectionList } from './util';
import { ExerciseModel } from '../../model/exercise.model';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 16,
	},
	listContainer: {
		flex: 1,
	},
	buttons: {
		height: 50,
	},
	title: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 14,
		fontWeight: 'bold',
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
});

const Item = ({ data, onPress }: { data: ExerciseModel; onPress: (exercise: ExerciseModel) => void }) => {
	const handleOnPress = () => {
		onPress(data);
	};

	return (
		<TouchableOpacity onPress={handleOnPress}>
			<Text style={styles.item}>{data.name}</Text>
		</TouchableOpacity>
	);
};

const ExerciseList = (props: ExerciseListProps) => {
	const { exerciseList = [], goToCreateExercise, onExercisePress } = props;
	const sections = useMemo(() => mapExerciseListToSectionList(exerciseList), [exerciseList]);

	return (
		<View style={styles.container}>
			<View style={styles.listContainer}>
				<SectionList<ExerciseModel>
					sections={sections}
					renderItem={({ item }) => <Item data={item} onPress={onExercisePress} />}
					renderSectionHeader={({ section }) => <Text style={styles.title}>{section.title}</Text>}
					keyExtractor={item => item.id}
				/>
			</View>

			<View style={styles.buttons}>
				<Button title="+ Добавить упражнение" onPress={goToCreateExercise} />
			</View>
		</View>
	);
};

export default ExerciseList;

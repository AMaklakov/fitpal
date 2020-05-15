import React, { FC, useMemo } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mapExerciseListToSectionList } from '@screen/exercise-list/util';
import { ExerciseModel } from '@model/exercise.model';
import { useTranslation } from 'react-i18next';
import { Colors } from '@css/colors.style';
import { Button } from '@components/button/button';

interface IProps {
	exerciseList: ExerciseModel[];

	goToCreateExercise: () => void;
	onExercisePress: (exercise: ExerciseModel) => void;
}

const ExerciseList: FC<IProps> = props => {
	const { exerciseList = [], goToCreateExercise, onExercisePress } = props;
	const sections = useMemo(() => mapExerciseListToSectionList(exerciseList), [exerciseList]);

	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<View style={styles.listContainer}>
				<SectionList<ExerciseModel>
					sections={sections}
					renderItem={({ item }) => <Item data={item} onPress={onExercisePress} />}
					renderSectionHeader={({ section }) => <Text style={styles.title}>{section.title}</Text>}
					keyExtractor={item => item._id}
				/>
			</View>

			<View style={styles.buttons}>
				<Button type="clear" title={t('Add exercise +')} onPress={goToCreateExercise} />
			</View>
		</View>
	);
};

const Item = ({ data, onPress }: { data: ExerciseModel; onPress: (exercise: ExerciseModel) => void }) => {
	const handleOnPress = () => {
		onPress(data);
	};

	return (
		<TouchableOpacity onPress={handleOnPress}>
			<Text style={styles.item} numberOfLines={1}>
				{data.name}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		backgroundColor: Colors.LightGrey,
		fontSize: 14,
		fontWeight: 'bold',
	},
	item: {
		marginHorizontal: 15,
		padding: 10,
		fontSize: 16,
		height: 44,
	},
});

export default ExerciseList;

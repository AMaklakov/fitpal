import { ExerciseModel } from '@model/exercise.model';
import { SectionListData } from 'react-native';

export const mapExerciseListToSectionList = (
	exerciseList: ExerciseModel[] = []
): ReadonlyArray<SectionListData<ExerciseModel>> => {
	const titleList = exerciseList.map(exercise => exercise.name[0].toUpperCase()).sort();
	const titleSet = new Set<string>(titleList);

	const data: Array<SectionListData<ExerciseModel>> = [];

	titleSet.forEach(title => {
		data.push({
			title,
			data: exerciseList.filter(exercise => exercise.name[0].toUpperCase() === title),
		});
	});

	return data;
};

import { SectionListData } from 'react-native';
import { ExerciseModel } from '@model/exercise.model';

// TODO may be optimized, now O(n^2)
export const mapExerciseListToSectionList = (
	exerciseList: ExerciseModel[] = []
): ReadonlyArray<SectionListData<ExerciseModel>> => {
	if (exerciseList.length === 0) {
		return [];
	}

	const uniqueTitles = unique(exerciseList.map(e => getFirstCharOfName(e))?.sort());

	return uniqueTitles.map(title => ({
		title,
		data: exerciseList.filter(e => getFirstCharOfName(e) === title),
	}));
};

const unique = <T>(arr: T[]) => Array.from(new Set<T>(arr));

const getFirstCharOfName = (e: ExerciseModel) => e?.name?.charAt(0)?.toUpperCase();

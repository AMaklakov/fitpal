import { SectionListData } from 'react-native';
import { ExerciseModel } from '@model/exercise.model';
import sortBy from 'lodash/sortBy';

export const mapExerciseListToSectionList = (
	exerciseList: ExerciseModel[] = []
): ReadonlyArray<SectionListData<ExerciseModel>> => {
	if (exerciseList.length === 0) {
		return [];
	}

	const sectionsTitles: { [name: string]: number } = {};
	const sections: Array<SectionListData<ExerciseModel>> = [];

	exerciseList.forEach(exercise => {
		const sectionTitle = exercise.name.charAt(0).toUpperCase();
		const sectionIndex = getIndexOfSectionTitle(sectionTitle, sectionsTitles, sections);
		(sections[sectionIndex].data as ExerciseModel[]).push(exercise);
	});

	return sortBy(sections, 'title');
};

const getIndexOfSectionTitle = (
	title: string,
	titles: { [name: string]: number },
	sections: Array<SectionListData<ExerciseModel>>
): number => {
	if (title in titles) {
		return titles[title];
	}

	const sectionsLength = sections.push({ title, data: [] });
	titles[title] = sectionsLength - 1;
	return sectionsLength - 1;
};

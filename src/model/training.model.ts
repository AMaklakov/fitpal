export interface SeriesModel {
	sequenceNumber: number;

	repeats: number;
	weight: number;
}

export interface TrainingExerciseModel {
	exerciseId: string;

	seriesList: SeriesModel[];
}

export interface TrainingModel {
	id: string;
	date: string;

	exerciseList: TrainingExerciseModel[];
}

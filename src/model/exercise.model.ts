export interface SeriesModel {
	sequenceNumber: number;

	repeats: number;
	weight: number;
}

export interface ExerciseModel {
	name: string;

	series: SeriesModel[];
}

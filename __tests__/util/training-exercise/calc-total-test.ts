import { calcTotal } from '@util/training-exercise.util';
import {
	IAdditionalWeightTrainingExercise,
	IBaseTrainingExercise,
	INegativeWeightTrainingExercise,
} from '@model/training-exercise';
import { ExerciseTypes } from '@model/exercise.model';

describe('util/training-exercise/calcTotal', () => {
	it('should return 0 with no series in exercise', () => {
		const ex = {
			id: '1',
			sequenceNumber: 1,
			exerciseId: '2',

			type: ExerciseTypes.Default,
			userWeight: 1,
			seriesList: [],
		};

		expect(calcTotal(ex)).toBe('0');
	});

	it('should calculate properly `default` exercise', () => {
		const ex: IBaseTrainingExercise = {
			id: '1',
			type: ExerciseTypes.Default,
			sequenceNumber: 1,
			exerciseId: '2',
			userWeight: 1,
			seriesList: [
				{
					sequenceNumber: 1,

					weight: 10,
					repeats: 5,
				},
				{
					sequenceNumber: 2,

					weight: '10',
					repeats: '5',
				},
				{
					sequenceNumber: 3,

					weight: '10.1',
					repeats: 5,
				},
			],
		};

		expect(calcTotal(ex)).toBe('150.5');
	});

	it('should calculate properly `with additional weight` exercise', () => {
		const ex: IAdditionalWeightTrainingExercise = {
			id: '1',
			type: ExerciseTypes.WithAdditionalWeight,
			sequenceNumber: 1,
			exerciseId: '2',
			userWeight: 100,
			seriesList: [
				{
					sequenceNumber: 1,

					weight: 10,
					repeats: 5,
				},
				{
					sequenceNumber: 2,

					weight: '10',
					repeats: '5',
				},
				{
					sequenceNumber: 3,

					weight: '10.1',
					repeats: 5,
				},
			],
		};

		expect(calcTotal(ex)).toBe('1650.5');
	});

	it('should calculate properly `with negative weight` exercise', () => {
		const ex: INegativeWeightTrainingExercise = {
			id: '1',
			type: ExerciseTypes.WithNegativeWeight,
			sequenceNumber: 1,
			exerciseId: '2',
			userWeight: 100,
			seriesList: [
				{
					sequenceNumber: 1,

					weight: 10,
					repeats: 5,
				},
				{
					sequenceNumber: 2,

					weight: '10',
					repeats: '5',
				},
				{
					sequenceNumber: 3,

					weight: '10.1',
					repeats: 5,
				},
			],
		};

		expect(calcTotal(ex)).toBe('1349.5');
	});
});

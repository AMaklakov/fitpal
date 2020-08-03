import { IBaseTrainingExercise } from '@model/training-exercise';
import { validateTrainingExercise } from '@util/training-exercise.util';
import { ExerciseTypes } from '@model/exercise.model';
import { MAX_REPEATS, MAX_WEIGHT, MIN_REPEATS, MIN_WEIGHT } from '@const/validation-const';
import { BigSource } from 'big.js';
import faker from 'faker';

const userWeight = 80;
const createMockedExercise = (weight?: BigSource): IBaseTrainingExercise => ({
	_id: '5ee6780e6bec3153c401045d',
	exerciseId: '5ee6780e6bec3153c408045d',
	sequenceNumber: 1,
	seriesList: [],
	type: ExerciseTypes.Default,
	userWeight: weight ?? userWeight,
});

describe('util/training-exercise/validateTrainingExercise', () => {
	it('should be false if not supported exercise type is passed', () => {
		const ex = {
			type: 100,
		} as IBaseTrainingExercise;

		expect(validateTrainingExercise(ex)).toBe(false);
	});

	it.each([ExerciseTypes.Default, ExerciseTypes.WithAdditionalWeight, ExerciseTypes.WithNegativeWeight])(
		'should not throw if known exercise type is passed',
		(exerciseType: ExerciseTypes) => {
			const ex = createMockedExercise();
			ex.type = exerciseType;

			expect(() => validateTrainingExercise(ex)).not.toThrow();
		}
	);

	describe('Default training exercise', () => {
		describe('Weight', () => {
			it.each([25, MIN_WEIGHT, MAX_WEIGHT])('should return true with valid weight="%i"', (weight: BigSource) => {
				const ex = createMockedExercise();
				ex.seriesList = [
					{
						_id: faker.random.uuid(),
						weight,
						repeats: MIN_REPEATS,
					},
				];

				expect(validateTrainingExercise(ex)).toBe(true);
			});

			it.each([0, -1, MIN_WEIGHT - 1, MAX_WEIGHT + 1, MAX_WEIGHT + 0.2])(
				'should return false with not valid weight="%i"',
				(weight: BigSource) => {
					const ex = createMockedExercise();
					ex.type = ExerciseTypes.Default;
					ex.seriesList = [
						{
							_id: faker.random.uuid(),
							weight,
							repeats: MIN_REPEATS,
						},
					];

					expect(validateTrainingExercise(ex)).toBe(false);
				}
			);
		});

		describe('Repeats', () => {
			it.each([10, 8, MIN_REPEATS, MAX_REPEATS])('should return true with valid repeats="%i"', (repeats: BigSource) => {
				const ex = createMockedExercise();
				ex.type = ExerciseTypes.Default;
				ex.seriesList = [
					{
						_id: faker.random.uuid(),
						weight: MIN_WEIGHT,
						repeats,
					},
				];

				expect(validateTrainingExercise(ex)).toBe(true);
			});

			it.each([0, -1, MIN_REPEATS - 1, MAX_REPEATS + 1, MAX_REPEATS + 0.2])(
				'should return false with not valid repeats="%i"',
				(repeats: BigSource) => {
					const ex = createMockedExercise();
					ex.type = ExerciseTypes.Default;
					ex.seriesList = [
						{
							_id: faker.random.uuid(),
							weight: MIN_WEIGHT,
							repeats,
						},
					];

					expect(validateTrainingExercise(ex)).toBe(false);
				}
			);

			it('should not accept rational repeats', () => {
				const ex = createMockedExercise();
				ex.type = ExerciseTypes.Default;
				ex.seriesList = [
					{
						_id: faker.random.uuid(),
						weight: MIN_WEIGHT,
						repeats: MIN_REPEATS + 0.1,
					},
				];

				expect(validateTrainingExercise(ex)).toBe(false);
			});
		});
	});

	describe('Training exercise with additional weight', () => {
		describe('Weight', () => {
			it.each([25, 0, MIN_WEIGHT, MAX_WEIGHT])('should return true with valid weight="%i"', (weight: BigSource) => {
				const ex = createMockedExercise();
				ex.type = ExerciseTypes.WithAdditionalWeight;
				ex.seriesList = [
					{
						_id: faker.random.uuid(),
						weight,
						repeats: MIN_REPEATS,
					},
				];

				expect(validateTrainingExercise(ex)).toBe(true);
			});

			it.each([-1, MAX_WEIGHT + 1, MAX_WEIGHT + 0.2])(
				'should return false with not valid weight="%i"',
				(weight: BigSource) => {
					const ex = createMockedExercise();
					ex.type = ExerciseTypes.WithAdditionalWeight;
					ex.seriesList = [
						{
							_id: faker.random.uuid(),
							weight,
							repeats: MIN_REPEATS,
						},
					];

					expect(validateTrainingExercise(ex)).toBe(false);
				}
			);
		});

		describe('Repeats', () => {
			it.each([10, 8, MIN_REPEATS, MAX_REPEATS])('should return true with valid repeats="%i"', (repeats: BigSource) => {
				const ex = createMockedExercise();
				ex.type = ExerciseTypes.WithAdditionalWeight;
				ex.seriesList = [
					{
						_id: faker.random.uuid(),
						weight: MIN_WEIGHT,
						repeats,
					},
				];

				expect(validateTrainingExercise(ex)).toBe(true);
			});

			it.each([0, -1, MIN_REPEATS - 1, MAX_REPEATS + 1, MAX_REPEATS + 0.2])(
				'should return false with not valid repeats="%i"',
				(repeats: BigSource) => {
					const ex = createMockedExercise();
					ex.type = ExerciseTypes.WithAdditionalWeight;
					ex.seriesList = [
						{
							_id: faker.random.uuid(),
							weight: MIN_WEIGHT,
							repeats,
						},
					];

					expect(validateTrainingExercise(ex)).toBe(false);
				}
			);

			it('should not accept rational repeats', () => {
				const ex = createMockedExercise();
				ex.type = ExerciseTypes.WithAdditionalWeight;
				ex.seriesList = [
					{
						_id: faker.random.uuid(),
						weight: MIN_WEIGHT,
						repeats: MIN_REPEATS + 0.1,
					},
				];

				expect(validateTrainingExercise(ex)).toBe(false);
			});
		});
	});

	describe('Training exercise with negative weight', () => {
		describe('Weight', () => {
			it.each([25, 0, MIN_WEIGHT, userWeight - 1])('should return true with valid weight="%i"', (weight: BigSource) => {
				const ex = createMockedExercise();
				ex.type = ExerciseTypes.WithNegativeWeight;
				ex.seriesList = [
					{
						_id: faker.random.uuid(),
						weight,
						repeats: MIN_REPEATS,
					},
				];

				expect(validateTrainingExercise(ex)).toBe(true);
			});

			it.each([-1, userWeight, userWeight + 1])(
				`should return false with not valid weight="%i" and userWeight=${userWeight}`,
				(weight: BigSource) => {
					const ex = createMockedExercise();
					ex.type = ExerciseTypes.WithNegativeWeight;
					ex.seriesList = [
						{
							_id: faker.random.uuid(),
							weight,
							repeats: MIN_REPEATS,
						},
					];

					expect(validateTrainingExercise(ex)).toBe(false);
				}
			);
		});

		describe('Repeats', () => {
			it.each([10, 8, MIN_REPEATS, MAX_REPEATS])('should return true with valid repeats="%i"', (repeats: BigSource) => {
				const ex = createMockedExercise();
				ex.type = ExerciseTypes.WithNegativeWeight;
				ex.seriesList = [
					{
						_id: faker.random.uuid(),
						weight: MIN_WEIGHT,
						repeats,
					},
				];

				expect(validateTrainingExercise(ex)).toBe(true);
			});

			it.each([0, -1, MIN_REPEATS - 1, MAX_REPEATS + 1, MAX_REPEATS + 0.2])(
				'should return false with not valid repeats="%i"',
				(repeats: BigSource) => {
					const ex = createMockedExercise();
					ex.type = ExerciseTypes.WithNegativeWeight;
					ex.seriesList = [
						{
							_id: faker.random.uuid(),
							weight: MIN_WEIGHT,
							repeats,
						},
					];

					expect(validateTrainingExercise(ex)).toBe(false);
				}
			);

			it('should not accept rational repeats', () => {
				const ex = createMockedExercise();
				ex.type = ExerciseTypes.WithNegativeWeight;
				ex.seriesList = [
					{
						_id: faker.random.uuid(),
						weight: MIN_WEIGHT,
						repeats: MIN_REPEATS + 0.1,
					},
				];

				expect(validateTrainingExercise(ex)).toBe(false);
			});
		});
	});
});

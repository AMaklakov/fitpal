import { IBaseTrainingExercise } from '@model/training-exercise';
import { validateTrainingExercise } from '@util/training-exercise.util';
import { ExerciseTypes } from '@model/exercise.model';
import { MAX_REPEATS, MAX_WEIGHT, MIN_REPEATS, MIN_WEIGHT } from '@const/validation-const';
import { BigSource } from 'big.js';

describe('util/training-exercise/validateTrainingExercise', () => {
	const userWeight = 80;

	it('should throw if not supported exercise type is passed', () => {
		const ex: IBaseTrainingExercise = {
			type: 100,
		} as IBaseTrainingExercise;

		expect(() => validateTrainingExercise(ex)).toThrow();
	});

	it.each([ExerciseTypes.Default, ExerciseTypes.WithAdditionalWeight, ExerciseTypes.WithNegativeWeight])(
		'should not throw if known exercise type is passed',
		(exerciseType: ExerciseTypes) => {
			const ex: IBaseTrainingExercise = ({
				type: exerciseType,
				seriesList: [],
			} as unknown) as IBaseTrainingExercise;

			expect(() => validateTrainingExercise(ex, userWeight)).not.toThrow();
		}
	);

	describe('Default training exercise', () => {
		describe('Weight', () => {
			it.each([25, MIN_WEIGHT, MAX_WEIGHT])('should return true with valid weight="%i"', (weight: BigSource) => {
				const ex: IBaseTrainingExercise = ({
					type: ExerciseTypes.Default,
					seriesList: [
						{
							weight,
							repeats: MIN_REPEATS,
						},
					],
				} as unknown) as IBaseTrainingExercise;

				expect(validateTrainingExercise(ex, userWeight)).toBe(true);
			});

			it.each([0, -1, MIN_WEIGHT - 1, MAX_WEIGHT + 1, MAX_WEIGHT + 0.2])(
				'should return false with not valid weight="%i"',
				(weight: BigSource) => {
					const ex: IBaseTrainingExercise = ({
						type: ExerciseTypes.Default,
						seriesList: [
							{
								weight,
								repeats: MIN_REPEATS,
							},
						],
					} as unknown) as IBaseTrainingExercise;

					expect(validateTrainingExercise(ex, userWeight)).toBe(false);
				}
			);
		});

		describe('Repeats', () => {
			it.each([10, 8, MIN_REPEATS, MAX_REPEATS])('should return true with valid repeats="%i"', (repeats: BigSource) => {
				const ex: IBaseTrainingExercise = ({
					type: ExerciseTypes.Default,
					seriesList: [
						{
							weight: MIN_WEIGHT,
							repeats,
						},
					],
				} as unknown) as IBaseTrainingExercise;

				expect(validateTrainingExercise(ex, userWeight)).toBe(true);
			});

			it.each([0, -1, MIN_REPEATS - 1, MAX_REPEATS + 1, MAX_REPEATS + 0.2])(
				'should return false with not valid repeats="%i"',
				(repeats: BigSource) => {
					const ex: IBaseTrainingExercise = ({
						type: ExerciseTypes.Default,
						seriesList: [
							{
								weight: MIN_WEIGHT,
								repeats,
							},
						],
					} as unknown) as IBaseTrainingExercise;

					expect(validateTrainingExercise(ex, userWeight)).toBe(false);
				}
			);

			it('should not accept rational repeats', () => {
				const ex: IBaseTrainingExercise = ({
					type: ExerciseTypes.Default,
					seriesList: [
						{
							weight: MIN_WEIGHT,
							repeats: MIN_REPEATS + 0.1,
						},
					],
				} as unknown) as IBaseTrainingExercise;

				expect(validateTrainingExercise(ex, userWeight)).toBe(false);
			});
		});
	});

	describe('Training exercise with additional weight', () => {
		describe('Weight', () => {
			it.each([25, 0, MIN_WEIGHT, MAX_WEIGHT])('should return true with valid weight="%i"', (weight: BigSource) => {
				const ex: IBaseTrainingExercise = ({
					type: ExerciseTypes.WithAdditionalWeight,
					seriesList: [
						{
							weight,
							repeats: MIN_REPEATS,
						},
					],
				} as unknown) as IBaseTrainingExercise;

				expect(validateTrainingExercise(ex, userWeight)).toBe(true);
			});

			it.each([-1, MAX_WEIGHT + 1, MAX_WEIGHT + 0.2])(
				'should return false with not valid weight="%i"',
				(weight: BigSource) => {
					const ex: IBaseTrainingExercise = ({
						type: ExerciseTypes.WithAdditionalWeight,
						seriesList: [
							{
								weight,
								repeats: MIN_REPEATS,
							},
						],
					} as unknown) as IBaseTrainingExercise;

					expect(validateTrainingExercise(ex, userWeight)).toBe(false);
				}
			);
		});

		describe('Repeats', () => {
			it.each([10, 8, MIN_REPEATS, MAX_REPEATS])('should return true with valid repeats="%i"', (repeats: BigSource) => {
				const ex: IBaseTrainingExercise = ({
					type: ExerciseTypes.Default,
					seriesList: [
						{
							weight: MIN_WEIGHT,
							repeats,
						},
					],
				} as unknown) as IBaseTrainingExercise;

				expect(validateTrainingExercise(ex, userWeight)).toBe(true);
			});

			it.each([0, -1, MIN_REPEATS - 1, MAX_REPEATS + 1, MAX_REPEATS + 0.2])(
				'should return false with not valid repeats="%i"',
				(repeats: BigSource) => {
					const ex: IBaseTrainingExercise = ({
						type: ExerciseTypes.WithAdditionalWeight,
						seriesList: [
							{
								weight: MIN_WEIGHT,
								repeats,
							},
						],
					} as unknown) as IBaseTrainingExercise;

					expect(validateTrainingExercise(ex, userWeight)).toBe(false);
				}
			);

			it('should not accept rational repeats', () => {
				const ex: IBaseTrainingExercise = ({
					type: ExerciseTypes.WithAdditionalWeight,
					seriesList: [
						{
							weight: MIN_WEIGHT,
							repeats: MIN_REPEATS + 0.1,
						},
					],
				} as unknown) as IBaseTrainingExercise;

				expect(validateTrainingExercise(ex, userWeight)).toBe(false);
			});
		});
	});

	describe('Training exercise with negative weight', () => {
		describe('Weight', () => {
			it.each([25, 0, MIN_WEIGHT, userWeight - 1])('should return true with valid weight="%i"', (weight: BigSource) => {
				const ex: IBaseTrainingExercise = ({
					type: ExerciseTypes.WithNegativeWeight,
					seriesList: [
						{
							weight,
							repeats: MIN_REPEATS,
						},
					],
				} as unknown) as IBaseTrainingExercise;

				expect(validateTrainingExercise(ex, userWeight)).toBe(true);
			});

			it.each([-1, userWeight, userWeight + 1])(
				`should return false with not valid weight="%i" and userWeight=${userWeight}`,
				(weight: BigSource) => {
					const ex: IBaseTrainingExercise = ({
						type: ExerciseTypes.WithNegativeWeight,
						seriesList: [
							{
								weight,
								repeats: MIN_REPEATS,
							},
						],
					} as unknown) as IBaseTrainingExercise;

					expect(validateTrainingExercise(ex, userWeight)).toBe(false);
				}
			);
		});

		describe('Repeats', () => {
			it.each([10, 8, MIN_REPEATS, MAX_REPEATS])('should return true with valid repeats="%i"', (repeats: BigSource) => {
				const ex: IBaseTrainingExercise = ({
					type: ExerciseTypes.WithNegativeWeight,
					seriesList: [
						{
							weight: MIN_WEIGHT,
							repeats,
						},
					],
				} as unknown) as IBaseTrainingExercise;

				expect(validateTrainingExercise(ex, userWeight)).toBe(true);
			});

			it.each([0, -1, MIN_REPEATS - 1, MAX_REPEATS + 1, MAX_REPEATS + 0.2])(
				'should return false with not valid repeats="%i"',
				(repeats: BigSource) => {
					const ex: IBaseTrainingExercise = ({
						type: ExerciseTypes.WithNegativeWeight,
						seriesList: [
							{
								weight: MIN_WEIGHT,
								repeats,
							},
						],
					} as unknown) as IBaseTrainingExercise;

					expect(validateTrainingExercise(ex, userWeight)).toBe(false);
				}
			);

			it('should not accept rational repeats', () => {
				const ex: IBaseTrainingExercise = ({
					type: ExerciseTypes.Default,
					seriesList: [
						{
							weight: MIN_WEIGHT,
							repeats: MIN_REPEATS + 0.1,
						},
					],
				} as unknown) as IBaseTrainingExercise;

				expect(validateTrainingExercise(ex, userWeight)).toBe(false);
			});
		});
	});
});

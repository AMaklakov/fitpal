import { ExerciseModel, ExerciseTypes } from '@model/exercise.model';
import faker from 'faker';
import { mapExerciseListToSectionList } from '@screen/exercise-list/util';

describe('mapExerciseListToSectionList()', () => {
	let exercises: ExerciseModel[];

	beforeEach(() => {
		exercises = [
			{
				_id: faker.random.uuid(),
				description: faker.lorem.paragraph(10),
				type: ExerciseTypes.Default,
				name: 'a' + faker.lorem.sentence(5), // en
			},
			{
				_id: faker.random.uuid(),
				description: faker.lorem.paragraph(10),
				type: ExerciseTypes.Default,
				name: 'A' + faker.lorem.sentence(5), // en
			},
			{
				_id: faker.random.uuid(),
				description: faker.lorem.paragraph(10),
				type: ExerciseTypes.Default,
				name: 'а' + faker.lorem.sentence(5), // ru
			},
			{
				_id: faker.random.uuid(),
				description: faker.lorem.paragraph(10),
				type: ExerciseTypes.Default,
				name: 'А' + faker.lorem.sentence(5), // ru
			},
		];
	});

	it('should process predefined exercises', () => {
		expect(mapExerciseListToSectionList(exercises)).toMatchObject([{ title: 'A' }, { title: 'А' }]);
	});
});

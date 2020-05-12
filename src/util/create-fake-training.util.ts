import moment, { Moment } from 'moment';
import { DateFormatEnum, diffInDays } from '@util/date.util';
import { ICreateTraining } from '@model/training.model';
import { IBaseTrainingExercise, ISeries } from '@model/training-exercise';
import { ExerciseModel, ExerciseTypes } from '@model/exercise.model';

const USER_WEIGHT = 60;

export const createFakeTrainings = (
	dateStart: Moment,
	dateEnd: Moment,
	exercises: ExerciseModel[],
	chance: number = 0.8
) => {
	const diff = diffInDays(dateEnd, dateStart);
	const trainings: ICreateTraining[] = [];

	for (let i = 0; i < diff; i++) {
		const date = moment(dateStart).add(i, 'days');

		if (Math.random() > 1 - chance) {
			const training = createTraining(date, exercises);
			trainings.push(training);
		}
	}

	return trainings;
};

// --------------------

const createTraining = (date: Moment, exercises: ExerciseModel[]): ICreateTraining => ({
	name: 'Training ' + date.format(DateFormatEnum.DD_MMM),
	date: date,
	exerciseList: Array(getInt(1, 6))
		.fill('')
		.map(() => generateExercise(exercises[getInt(0, exercises.length - 1)])) as IBaseTrainingExercise[],
});

const generateExercise = (exercise: ExerciseModel): Omit<IBaseTrainingExercise, '_id' | 'sequenceNumber'> => ({
	exerciseId: exercise._id,
	seriesList: Array(getInt(2, 5))
		.fill('')
		.map(() => generateSeries()) as ISeries[],
	type: ExerciseTypes.Default,
	userWeight: USER_WEIGHT,
});

const generateSeries = (): Omit<ISeries, '_id'> => ({
	repeats: getInt(5, 15),
	weight: getInt(10, 66),
});

const getInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

import { convertStringToMoment, DateFormatEnum, diffInDays, formatDate } from '../src/util/date.util';
import moment from 'moment';
import { generateId } from '../src/util/uuid.util';
import { ExerciseTypes } from '../src/model/exercise.model';
import { TrainingModel } from '../src/model/training.model';
import { IBaseTrainingExercise, ISeries } from '../src/model/training-exercise';

const fs = require('fs');

const USER_WEIGHT = 60;

const currentFileData: Array<TrainingModel> = JSON.parse(fs.readFileSync(process.argv[2]));

const dateStart = convertStringToMoment(process.argv[3]);
const dateEnd = convertStringToMoment(process.argv[4]);
const diff = diffInDays(dateEnd, dateStart);

for (let i = 0; i < diff; i++) {
	const date = dateStart.add(i, 'days');

	if (Math.random() > 0.2) {
		const training = createTraining(date);
		currentFileData.push(training);
	}
}

fs.writeFileSync(process.argv[2], JSON.stringify(currentFileData, null, '\t'));

// --------------------

function createTraining(date: moment.Moment): TrainingModel {
	return {
		id: generateId(),
		name: 'Training ' + date.get('weekday').toLocaleString('ru'),
		date: formatDate(date, DateFormatEnum.Default),
		exerciseList: Array(getInt(1, 6))
			.fill('')
			.map((_, index) => generateExercise(index + 1)),
	};
}

function generateExercise(sequenceNumber: number): IBaseTrainingExercise {
	return {
		exerciseId: getInt(1, 3).toString(),
		id: generateId(),
		sequenceNumber,
		seriesList: Array(getInt(2, 5))
			.fill('')
			.map((_, index) => generateSeries(index + 1)),
		type: ExerciseTypes.Default,
		userWeight: USER_WEIGHT,
	};
}

function generateSeries(sequenceNumber: number): ISeries {
	return {
		sequenceNumber,
		repeats: getInt(5, 15),
		weight: getInt(10, 66),
	};
}

function getInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

import { Action, Reducer } from 'redux';
import { ExerciseModel } from '@model/exercise.model';
import { generateId } from '../../../util/uuid.util';
import {
	CreateExerciseAction,
	ExerciseActions,
	UpdateExerciseAction,
} from '../../action/exercise.action';

const DEFAULT_EXERCISE_NAME_LIST = [
	'Приседания',
	'Выпады с гантелями',
	'Выпады в Смите',
	'Болгарские приседания',
	'Румынская становая тяга',
	'Классическая становая тяга',
	'Тяга «сумо»',
	'Сквозная тяга',
	'Разведения ног в тренажере',
	'Сведения ног в тренажере',
	'Ягодичный мост',
	'Гиперэкстензия',
	'Обратная гиперэкстензия',
	'Вертикальная тяга верхнего блока',
	'Горизонтальная тяга верхнего блока',
	'Тяга верхнего блока в наклоне',
	'Жим лежа',
	'Бабочка',
	'Подъем гантелей на бицепс',
	'Подъем штанги на бицепс',
	'Сгибания ног в тренажере лежа',
	'Сгибания ног в тренажере сидя',
	'Разгибание ног в тренажере сидя',
	'Французский жим',
	'Подтягивания в тренажере',
	'Жим платформы ногами лежа',
	'Тяга штанги к поясу в наклоне',
	'Махи гантелями в стороны',
	'Жим гантелей над головой',
];

export type ExerciseStateModel = ExerciseModel[];

const DEFAULT_STATE: ExerciseStateModel = DEFAULT_EXERCISE_NAME_LIST.map(name => ({
	id: generateId(),
	name,
}));

const createExercise = (
	state: ExerciseStateModel,
	{ payload: { exercise } }: CreateExerciseAction
) => {
	return [...state, exercise];
};

const updateExercise = (
	state: ExerciseStateModel,
	{ payload: { exercise } }: UpdateExerciseAction
) => {
	return [...state.filter(ex => ex.id !== exercise.id).concat([exercise])];
};

const exercise: Reducer<ExerciseStateModel> = (
	state: ExerciseStateModel = DEFAULT_STATE,
	action: Action<ExerciseActions>
) => {
	switch (action.type) {
		case ExerciseActions.Create:
			return createExercise(state, action as CreateExerciseAction);

		case ExerciseActions.Update:
			return updateExercise(state, action as UpdateExerciseAction);

		default:
			return state;
	}
};

export default exercise;

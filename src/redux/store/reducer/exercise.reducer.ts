import { Action, Reducer } from 'redux';
import { ExerciseModel } from '@model/exercise.model';
import { generateId } from '../../../util/uuid.util';

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

const exercise: Reducer<ExerciseStateModel> = (
	state: ExerciseStateModel = DEFAULT_STATE,
	action: Action
) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default exercise;

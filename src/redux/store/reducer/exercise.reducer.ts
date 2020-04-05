import { Action, Reducer } from 'redux';
import { ExerciseModel, ExerciseTypes } from '@model/exercise.model';
import { generateId } from '@util/uuid.util';
import { CreateExerciseAction, ExerciseActions, UpdateExerciseAction } from '@redux/action/exercise.action';

const DEFAULT_EXERCISE_LIST: Array<{ name: string; type?: ExerciseTypes }> = [
	{ name: 'Приседания' },
	{ name: 'Выпады с гантелями' },
	{ name: 'Выпады в Смите' },
	{ name: 'Болгарские приседания' },
	{ name: 'Румынская становая тяга' },
	{ name: 'Классическая становая тяга' },
	{ name: 'Тяга «сумо»' },
	{ name: 'Сквозная тяга' },
	{ name: 'Разведения ног в тренажере' },
	{ name: 'Сведения ног в тренажере' },
	{ name: 'Ягодичный мост' },
	{ name: 'Гиперэкстензия' },
	{ name: 'Обратная гиперэкстензия' },
	{ name: 'Вертикальная тяга верхнего блока' },
	{ name: 'Горизонтальная тяга верхнего блока' },
	{ name: 'Тяга верхнего блока в наклоне' },
	{ name: 'Жим лежа' },
	{ name: 'Бабочка' },
	{ name: 'Подъем гантелей на бицепс' },
	{ name: 'Подъем штанги на бицепс' },
	{ name: 'Сгибания ног в тренажере лежа' },
	{ name: 'Сгибания ног в тренажере сидя' },
	{ name: 'Разгибание ног в тренажере сидя' },
	{ name: 'Французский жим' },
	{ name: 'Подтягивания с суппортом', type: ExerciseTypes.WithNegativeWeight },
	{ name: 'Подтягивания', type: ExerciseTypes.WithAdditionalWeight },
	{ name: 'Жим платформы ногами лежа' },
	{ name: 'Тяга штанги к поясу в наклоне' },
	{ name: 'Махи гантелями в стороны' },
	{ name: 'Жим гантелей над головой' },
	{ name: 'Жим гантелей на наклонной скамье' },
	{ name: 'Отжимания на брусьях', type: ExerciseTypes.WithAdditionalWeight },
	{ name: 'Сведения в кроссоверы снизу вверх' },
	{ name: 'Подъем гантелей перед собой' },
	{ name: 'Молот в блоке на веревке' },
	{ name: 'Фронтальные приседания' },
	{ name: 'Тяга блока к лицу' },
	{ name: 'Разведения гантелей в стороны' },
	{ name: 'Тяга верхнего блока узким хватом' },
	{ name: 'Пулловер' },
	{ name: 'Разведения гантелей сидя в наклоне' },
	{ name: 'Обратные отжимания', type: ExerciseTypes.WithAdditionalWeight },
	{ name: 'Разгибания из-за головы' },
	{ name: 'Разгибания стоя в блоке' },
	{ name: 'Ягодичный мост в Смите' },
	{ name: 'Обратная гиперэкстензия' },
	{ name: 'Отведение бедра' },
	{ name: 'Приподнятые приседания' },
	{ name: 'Становая тяга на прямых ногах' },
	{ name: 'Подъем на носки в Смите' },
	{ name: 'Подъем на носки в тренажере' },
	{ name: 'Подъем на носки стоя с гантелей' },
];

export type ExerciseStateModel = ExerciseModel[];

const DEFAULT_STATE: ExerciseStateModel = DEFAULT_EXERCISE_LIST.map(({ name, type }) => ({
	id: generateId(),
	type: type ?? ExerciseTypes.Default,
	name,
}));

const createExercise = (state: ExerciseStateModel, { payload: { exercise } }: CreateExerciseAction) => {
	return [...state, exercise];
};

const updateExercise = (state: ExerciseStateModel, { payload: { exercise } }: UpdateExerciseAction) => {
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

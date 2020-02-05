import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { CreateExerciseProps } from './types';
import CreateSeries from './create-series';
import style from './style';
import { SeriesModel, TrainingExerciseModel } from '@model/training.model';
import SelectInput from '../../components/select-input';
import { ExerciseModel } from '@model/exercise.model';

const createEmptySeriesBlock = (sequenceNumber: number) => ({ sequenceNumber } as SeriesModel);

const CreateExercise = (props: CreateExerciseProps) => {
	const { onSave, trainingExercise, setTrainingExercise, exerciseList, onCancel } = props;
	const [selectExerciseList] = useState(['Отмена', ...exerciseList.map(e => e.name)]);

	const [exerciseName, setExerciseName] = useState<ExerciseModel>(
		exerciseList?.find(x => x?.id === trainingExercise?.exerciseId) ?? ({} as ExerciseModel)
	);

	const selectExercise = (index: number) => {
		setExerciseName(exerciseList[index - 1]);

		setTrainingExercise({ ...trainingExercise, exerciseId: exerciseList[index - 1].id });
	};

	const addSeries = () => {
		const list = trainingExercise.seriesList;

		const newTrainingEx: TrainingExerciseModel = {
			...trainingExercise,
			seriesList: list
				? list.concat([createEmptySeriesBlock(list.length + 1)])
				: [createEmptySeriesBlock(1)],
		};

		setTrainingExercise(newTrainingEx);
	};

	const updateExerciseSeries = (index: number) => (s: SeriesModel) => {
		const newTrainingEx: TrainingExerciseModel = {
			...trainingExercise,
			seriesList: trainingExercise.seriesList.map((x, i) => (i === index ? s : x)),
		};

		setTrainingExercise(newTrainingEx);
	};

	return (
		<View>
			<View>
				<Text>Название</Text>
				<SelectInput
					options={selectExerciseList}
					cancelButtonIndex={0}
					value={exerciseName?.name}
					onChange={selectExercise}
				/>

				<View style={style.flex}>
					<Text style={style.flex1}>№</Text>
					<Text style={style.flex2}>Повторения</Text>
					<Text style={style.flex3}>Вес</Text>
				</View>

				{trainingExercise?.seriesList?.map((s, index) => (
					<CreateSeries
						key={index}
						index={index}
						series={s}
						onChange={updateExerciseSeries(index)}
					/>
				))}

				<Button title={'Добавить'} onPress={addSeries} />
			</View>

			<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
				<Button title={'save'} onPress={onSave} />
				<Button title={'cancel'} onPress={onCancel} />
			</View>
		</View>
	);
};

export default CreateExercise;

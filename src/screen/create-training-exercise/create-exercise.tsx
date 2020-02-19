import React, { useMemo, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { CreateExerciseProps } from './types';
import CreateSeries from './create-series';
import style from './style';
import { SeriesModel, TrainingExerciseModel } from '@model/training.model';
import { ExerciseModel } from '@model/exercise.model';
import AutocompleteInput from '../../components/autocomplete-input';
import ShowSelectedExercise from './show-selected-exercise';
import { generateId } from '../../util/uuid.util';
import { SaveIcon } from '../../components/icons/save.icon';
import { CancelIcon } from '../../components/icons/cancel.icon';

const createEmptySeriesBlock = (sequenceNumber: number) => ({ sequenceNumber } as SeriesModel);

const CreateExercise = (props: CreateExerciseProps) => {
	const id = useMemo(() => generateId(), []);
	const { onSave, trainingExercise, setTrainingExercise, exerciseList, onCancel } = props;

	const [selectedExercise, setSelectedExercise] = useState<ExerciseModel | null>(
		exerciseList?.find(x => x?.id === trainingExercise?.exerciseId) ?? null
	);

	const setTrainingExerciseAction = (ex: TrainingExerciseModel) => {
		setTrainingExercise({ ...ex, id });
	};

	const selectExercise = (exercise: ExerciseModel | null) => {
		setSelectedExercise(exercise);
		setTrainingExerciseAction({
			...trainingExercise,
			exerciseId: exercise?.id,
		} as TrainingExerciseModel);
	};

	const addSeries = () => {
		const list = trainingExercise.seriesList || [];

		const newTrainingEx: TrainingExerciseModel = {
			...trainingExercise,
			seriesList: list.concat([createEmptySeriesBlock(list.length + 1)]),
		};

		setTrainingExerciseAction(newTrainingEx);
	};

	const updateExerciseSeries = (index: number) => (s: SeriesModel) => {
		const newTrainingEx: TrainingExerciseModel = {
			...trainingExercise,
			seriesList: trainingExercise.seriesList.map((x, i) => (i === index ? s : x)),
		};

		setTrainingExerciseAction(newTrainingEx);
	};

	return (
		<View>
			<View>
				<Text>Название</Text>
				<AutocompleteInput<ExerciseModel>
					autocompleteList={exerciseList}
					autocompleteField={'name'}
					selectedItem={selectedExercise}
					changeSelectedItem={selectExercise}
					selectedItemViewComponent={ShowSelectedExercise}
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
				<SaveIcon onPress={onSave} />
				<CancelIcon onPress={onCancel} />
			</View>
		</View>
	);
};

export default CreateExercise;

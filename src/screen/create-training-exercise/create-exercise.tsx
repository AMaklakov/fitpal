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
import { addEmptySeries, editSeriesBySequenceNumber, popSeries } from './helpers';

const CreateExercise = (props: CreateExerciseProps) => {
	const id = useMemo(() => generateId(), []);
	const { onSave, trainingExercise, setTrainingExercise, exerciseList, onCancel } = props;

	const [selectedExercise, setSelectedExercise] = useState<ExerciseModel | null>(
		exerciseList?.find(x => x?.id === trainingExercise?.exerciseId) ?? null
	);

	const setTrainingExerciseAction = (ex: TrainingExerciseModel) => {
		setTrainingExercise({ ...ex, id });
	};

	const handleSelectExercise = (exercise: ExerciseModel | null) => {
		setSelectedExercise(exercise);

		setTrainingExerciseAction({
			...trainingExercise,
			exerciseId: exercise?.id,
		} as TrainingExerciseModel);
	};

	const handleUpdateSeries = (index: number) => (s: SeriesModel) => {
		setTrainingExerciseAction(editSeriesBySequenceNumber(trainingExercise, s, index + 1));
	};

	const handleAddSeries = () => setTrainingExerciseAction(addEmptySeries(trainingExercise));

	const handleRemoveSeries = () => setTrainingExerciseAction(popSeries(trainingExercise));

	return (
		<View>
			<View>
				<Text>Название</Text>
				<AutocompleteInput<ExerciseModel>
					autocompleteList={exerciseList}
					autocompleteField={'name'}
					selectedItem={selectedExercise}
					changeSelectedItem={handleSelectExercise}
					selectedItemViewComponent={ShowSelectedExercise}
				/>

				<View style={style.flex}>
					<Text style={style.sequenceNumber}>№</Text>
					<Text style={style.repeats}>Повторения</Text>
					<Text style={style.weight}>Вес</Text>
				</View>

				{trainingExercise?.seriesList?.map((s, index) => (
					<CreateSeries key={index} index={index} series={s} onChange={handleUpdateSeries(index)} />
				))}

				<Button title={'Добавить'} onPress={handleAddSeries} />
				<Button
					disabled={trainingExercise.seriesList.length === 0}
					title={'Удалить'}
					onPress={handleRemoveSeries}
				/>
			</View>

			<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
				<SaveIcon onPress={onSave} />
				<CancelIcon onPress={onCancel} />
			</View>
		</View>
	);
};

export default CreateExercise;

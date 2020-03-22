import React, { useState } from 'react';
import { Button, FlatList, ScrollView, Text, View } from 'react-native';
import { CreateSeries } from './create-series';
import { style } from './style';
import { SeriesModel, TrainingExerciseModel } from '../../model/training.model';
import { ExerciseModel } from '../../model/exercise.model';
import AutocompleteInput from '../../components/autocomplete-input';
import ShowSelectedExercise from './show-selected-exercise';
import { CancelIcon } from '../../components/icons/cancel.icon';
import { addEmptySeries, editSeriesBySequenceNumber, popSeries, repeatLastSeries } from './helpers';
import { useTranslation } from 'react-i18next';
import H1 from '../../components/heading/h1';
import { Colors } from '../../css/colors.style';
import { SaveIcon } from '../../components/icons/save.icon';

interface IProps {
	trainingExercise: TrainingExerciseModel;
	setTrainingExercise: (exercise: TrainingExerciseModel) => void;

	exerciseList: ExerciseModel[];

	onSave: () => void;
	onCancel: () => void;
}

export const CreateExercise = (props: IProps) => {
	const { onSave, trainingExercise, setTrainingExercise, exerciseList, onCancel } = props;
	const { t } = useTranslation();

	const [selectedExercise, setSelectedExercise] = useState<ExerciseModel | null>(
		exerciseList?.find(x => x?.id === trainingExercise?.exerciseId) ?? null
	);

	const setTrainingExerciseAction = (ex: TrainingExerciseModel) => {
		setTrainingExercise({ ...ex });
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

	const handleRepeatSeries = () => setTrainingExerciseAction(repeatLastSeries(trainingExercise));

	return (
		<View style={style.wrapper}>
			<ScrollView>
				<H1 text={t('Exercise')} />

				<Text>{t('Nomination')}</Text>
				<AutocompleteInput<ExerciseModel>
					autocompleteList={exerciseList}
					autocompleteField={'name'}
					selectedItem={selectedExercise}
					changeSelectedItem={handleSelectExercise}
					selectedItemViewComponent={ShowSelectedExercise}
				/>

				<View style={style.flex}>
					<Text style={style.sequenceNumber}>№</Text>
					<Text style={style.repeats}>{t('Repeats')}</Text>
					<Text style={style.weight}>{t('Weight')}</Text>
					<Text style={style.actions} />
				</View>

				<FlatList<SeriesModel>
					data={trainingExercise.seriesList}
					keyExtractor={(s, index) => `series_${index}`}
					renderItem={({ index, item }) => (
						<CreateSeries
							index={index}
							series={item}
							onChange={handleUpdateSeries(index)}
							onRepeatIconPress={index + 1 === trainingExercise?.seriesList?.length ? handleRepeatSeries : undefined}
						/>
					)}
				/>

				<View style={style.seriesButtonWrapper}>
					<Button
						disabled={trainingExercise.seriesList.length === 0}
						title={t('Delete')}
						color={Colors.Red}
						onPress={handleRemoveSeries}
					/>
					<Button color={Colors.LightBlue} title={t('Add')} onPress={handleAddSeries} />
				</View>
			</ScrollView>

			<View style={style.buttonWrapper}>
				<CancelIcon color={Colors.Red} onPress={onCancel} />
				<View style={style.saveButtonWrapper}>
					<SaveIcon color={Colors.LightBlue} onPress={onSave} />
					<Text style={style.saveButtonText}>{t('Save')}</Text>
				</View>
			</View>
		</View>
	);
};

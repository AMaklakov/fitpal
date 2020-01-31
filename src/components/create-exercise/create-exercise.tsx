import React, { useState } from 'react';
import { Button, Modal, SafeAreaView, Text, View } from 'react-native';
import { CreateExercisePropsModel } from './types';
import StringInput from '../string-input/string-input';
import { ExerciseModel, SeriesModel } from '@model/exercise.model';
import CreateSeries from './create-series';
import style from './style';

const defaultExercise: ExerciseModel = ({ series: [] } as unknown) as ExerciseModel;

const CreateExercise = (props: CreateExercisePropsModel) => {
	const { onSave, setVisible, visible } = props;

	const [exercise, updateExercise] = useState(props?.exercise ?? defaultExercise);

	const reset = () => {
		updateExercise(defaultExercise);
	};

	const close = () => {
		setVisible(false);
		reset();
	};

	const saveAndClose = () => {
		onSave(exercise as ExerciseModel);

		close();
	};

	const patchExercise = (e: Partial<ExerciseModel>) => {
		updateExercise({
			...exercise,
			...e,
		});
	};

	const addSeries = () => {
		patchExercise({
			series: [
				...exercise?.series,
				{
					sequenceNumber: exercise.series.length + 1,
				} as SeriesModel,
			],
		});
	};

	const updateExerciseSeries = (index: number) => (s: SeriesModel) => (exercise.series[index] = s);

	return (
		<Modal visible={visible} animationType="slide" transparent={false}>
			<SafeAreaView>
				<View>
					<Text>Название</Text>
					<StringInput onTextChange={v => patchExercise({ name: v })} />

					<View style={style.flex}>
						<Text style={style.flex1}>№</Text>
						<Text style={style.flex2}>Повторения</Text>
						<Text style={style.flex3}>Вес</Text>
					</View>

					{exercise?.series?.map((s, index) => (
						<CreateSeries
							key={index}
							index={index}
							series={s}
							onChange={updateExerciseSeries(index)}
						/>
					))}

					<Button title={'Добавить'} onPress={addSeries} />
				</View>

				<Button title={'save'} onPress={saveAndClose} />
				<Button title={'cancel'} onPress={close} />
			</SafeAreaView>
		</Modal>
	);
};

export default CreateExercise;

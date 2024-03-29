import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { CreateSeries } from '@screen/create-training-exercise/components/create-series';
import { useTranslation } from 'react-i18next';
import { IAdditionalWeightTrainingExercise, IBaseTrainingExercise, ISeries } from '@model/training-exercise';
import {
	addEmptySeries,
	editSeriesBySequenceNumber,
	popSeries,
	repeatLastSeries,
} from '@screen/create-training-exercise/helpers';
import { commonStyles } from '@screen/create-training-exercise/style';
import { Button } from '@components/button/button';
import { TooltipText } from '@components/tooltip/tooltip-text';
import { TRAINING_EXERCISES } from '@const/validation-const';

interface IProps {
	trainingExercise: IAdditionalWeightTrainingExercise;

	onChange: (trainingExercise: IBaseTrainingExercise) => void;
}

export const WithAdditionalWeightSeries = (props: IProps) => {
	const { trainingExercise, onChange } = props;
	const { seriesList } = trainingExercise;
	const { t } = useTranslation();

	const handleAdd = () => onChange(addEmptySeries(trainingExercise));
	const handleDeleteLast = () => onChange(popSeries(trainingExercise));
	const handleRepeatLast = () => onChange(repeatLastSeries(trainingExercise));
	const handleUpdateById = (index: number) => (s: ISeries) =>
		onChange(editSeriesBySequenceNumber(trainingExercise, s, index + 1));

	return (
		<View style={commonStyles.wrapper}>
			<View style={styles.flex}>
				<Text style={styles.sequenceNumber}>№</Text>
				<Text style={styles.repeats}>{t('Repeats')}</Text>
				<Text style={styles.weight}>{t('Additional weight')}</Text>
				<TooltipText text={t('Additional weight description')} icon={{ name: 'info-outline' }} />
			</View>

			<FlatList<ISeries>
				data={seriesList}
				keyExtractor={(s, index) => `series_${index}`}
				renderItem={({ index, item }) => (
					<CreateSeries
						index={index}
						series={item}
						weightMin={0}
						maxSequenceNumber={TRAINING_EXERCISES.MAX}
						onChange={handleUpdateById(index)}
						onRepeatIconPress={index + 1 === seriesList?.length ? handleRepeatLast : undefined}
					/>
				)}
			/>

			<View style={styles.seriesButtonWrapper}>
				<Button
					type="clear"
					title={t('Delete')}
					titleStyle={commonStyles.cancelButtonText}
					disabled={seriesList.length === 0}
					onPress={handleDeleteLast}
				/>

				<Button
					type="clear"
					disabled={seriesList.length >= TRAINING_EXERCISES.MAX}
					title={t('Add')}
					onPress={handleAdd}
				/>
			</View>
		</View>
	);
};

const WINDOW = Dimensions.get('window');
const styles = StyleSheet.create({
	flex: {
		marginTop: 20,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	sequenceNumber: {
		textAlign: 'center',
		width: WINDOW.width / 10,
	},
	repeats: {
		textAlign: 'center',
		width: WINDOW.width / 3,
	},
	weight: {
		textAlign: 'center',
		width: WINDOW.width / 3,
	},
	actions: {
		textAlign: 'center',
		width: WINDOW.width / 8,
	},
	seriesButtonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { CreateSeries } from '@screen/create-training-exercise/components/create-series';
import { useTranslation } from 'react-i18next';
import { IBaseTrainingExercise, INegativeWeightTrainingExercise, ISeries } from '@model/training-exercise';
import {
	addEmptySeries,
	editSeriesBySequenceNumber,
	popSeries,
	repeatLastSeries,
} from '@screen/create-training-exercise/helpers';
import { commonStyles } from '@screen/create-training-exercise/style';
import { BigSource } from 'big.js';
import { Button } from '@components/button/button';

interface IProps {
	userWeight: BigSource;
	trainingExercise: INegativeWeightTrainingExercise;

	onChange: (trainingExercise: IBaseTrainingExercise) => void;
}

export const WithNegativeWeightSeries = (props: IProps) => {
	const { trainingExercise, onChange, userWeight } = props;
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
				<Text style={styles.weight}>{t('Support weight')}</Text>
				<Text style={styles.actions} />
			</View>

			<FlatList<ISeries>
				data={seriesList}
				keyExtractor={(s, index) => `series_${index}`}
				renderItem={({ index, item }) => (
					<CreateSeries
						index={index}
						series={item}
						onChange={handleUpdateById(index)}
						weightMax={+userWeight}
						weightMin={0}
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

				<Button type="clear" title={t('Add')} onPress={handleAdd} />
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

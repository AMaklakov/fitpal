import React from 'react';
import { Button, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { CreateSeries } from '@screen/create-training-exercise/components/create-series';
import { Colors } from '@css/colors.style';
import { useTranslation } from 'react-i18next';
import { IBaseTrainingExercise, IDefaultTrainingExercise, ISeries } from '@model/training-exercise';
import {
	addEmptySeries,
	editSeriesBySequenceNumber,
	popSeries,
	repeatLastSeries,
} from '@screen/create-training-exercise/helpers';
import { commonStyles } from '@screen/create-training-exercise/style';

interface IProps {
	trainingExercise: IDefaultTrainingExercise;

	onChange: (trainingExercise: IBaseTrainingExercise) => void;
}

export const DefaultSeries = (props: IProps) => {
	const { trainingExercise: ex, onChange } = props;
	const { seriesList } = ex;
	const { t } = useTranslation();

	const handleAdd = () => onChange(addEmptySeries(ex));
	const handleDeleteLast = () => onChange(popSeries(ex));
	const handleRepeatLast = () => onChange(repeatLastSeries(ex));
	const handleUpdateById = (index: number) => (s: ISeries) => onChange(editSeriesBySequenceNumber(ex, s, index + 1));

	return (
		<View style={commonStyles.wrapper}>
			<View style={styles.flex}>
				<Text style={styles.sequenceNumber}>№</Text>
				<Text style={styles.repeats}>{t('Repeats')}</Text>
				<Text style={styles.weight}>{t('Weight')}</Text>
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
						onRepeatIconPress={index + 1 === seriesList?.length ? handleRepeatLast : undefined}
					/>
				)}
			/>

			<View style={styles.seriesButtonWrapper}>
				<Button disabled={seriesList.length === 0} title={t('Delete')} color={Colors.Red} onPress={handleDeleteLast} />
				<Button color={Colors.LightBlue} title={t('Add')} onPress={handleAdd} />
			</View>
		</View>
	);
};

const WINDOW = Dimensions.get('window');
const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
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

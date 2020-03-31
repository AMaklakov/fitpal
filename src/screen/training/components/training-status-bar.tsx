import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TrainingModel } from '@model/training.model';
import { useTranslation } from 'react-i18next';

interface IProps {
	training: TrainingModel;
}

export const TrainingStatusBar = (props: IProps) => {
	const { training } = props;
	const { date, exerciseList } = training;
	const { t } = useTranslation();

	return (
		<View style={styles.wrapper}>
			<Text>{date}</Text>
			<Text>{t('Exercises number') + ' ' + exerciseList.length}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		height: 20,
		paddingHorizontal: 20,
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

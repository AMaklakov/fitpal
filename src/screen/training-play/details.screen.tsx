import React, { FC, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '@components/button/button';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { StoreModel } from '@redux/store';
import { TrainingModel } from '@model/training.model';
import { CompactTrainingView } from '@screen/statistics/components/compact-training-view';
import { ExerciseModel } from '@model/exercise.model';
import { H1 } from '@components/heading/h1';
import { Colors } from '@css/colors.style';
import { Routes } from '@screen/routes';
import { FontSizes } from '@css/fonts';
import { Text } from 'react-native-elements';

interface IProps extends NavigationPropsModel {}

interface IState {
	training: TrainingModel | null;
	exercises: ExerciseModel[];
}

interface IDispatch {}

const Details: FC<IProps & IState & IDispatch> = props => {
	const { training, exercises, navigation } = props;
	const { t } = useTranslation();

	const handleGoToCalendar = useCallback(() => navigation.navigate(Routes.Calendar), [navigation]);
	const handleStartTraining = useCallback(() => {
		navigation.pop();
		navigation.navigate(Routes.TrainingPlayProgress);
	}, [navigation]);

	if (!training) {
		return (
			<View style={styles.wrapper}>
				<H1 text={t('Start training')} useCenteredText={true} />
				<View style={styles.noTrainingWrapper}>
					<Text style={styles.noTrainingText}>
						{t('You did not select any training. Please, navigate to Calendar and choose one.')}
					</Text>
				</View>
				<Button title={t('Go to Calendar')} onPress={handleGoToCalendar} />
			</View>
		);
	}

	return (
		<View style={styles.wrapper}>
			<ScrollView>
				<View style={styles.contentWrapper}>
					<H1 text={t('Start training')} useCenteredText={true} />
					<View>
						<CompactTrainingView training={training} exercises={exercises} />
					</View>
				</View>
			</ScrollView>

			<View style={styles.buttonsWrapper}>
				{/*<Button solidType="gray" title={t('Mark as completed')} />*/}
				<Button solidType="gray" title={t('Cancel')} onPress={handleGoToCalendar} />
				<Button
					title={t('Start')}
					icon={{ name: 'play-arrow', color: Colors.White }}
					iconRight={true}
					onPress={handleStartTraining}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		marginHorizontal: 10,
		flex: 1,
	},
	contentWrapper: {
		flex: 1,
	},
	modalWrapper: {
		minWidth: '80%',
	},
	buttonsWrapper: {
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	noTrainingWrapper: {
		marginVertical: 20,
		padding: 10,
		borderRadius: 8,
		backgroundColor: Colors.Secondary,
	},
	noTrainingText: {
		fontSize: FontSizes.Regular,
	},
});

const mapStateToProps = (store: StoreModel): IState => ({
	exercises: store.exercise.exercises,
	training: store.trainingPlay.training,
});

export const TrainingPlayDetailsScreen = connect(mapStateToProps)(Details);

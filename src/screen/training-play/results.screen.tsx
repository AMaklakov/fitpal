import React, { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@components/button/button';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { StoreModel } from '@redux/store';
import { TrainingModel } from '@model/training.model';
import { ExerciseModel } from '@model/exercise.model';
import { Dispatch } from 'redux';
import { ISetSeries, TRAINING_PLAY_ACTION_CREATORS } from '@redux/action/training-play.action';
import { Routes } from '@screen/navigator';
import { TrainingExerciseSwipeList } from '@components/training-exercise-swipe-list/training-exercise-swipe-list';
import { H1 } from '@components/heading/h1';

interface IProps extends NavigationPropsModel {}

interface IState {
	training: TrainingModel | null;
	exercises: ExerciseModel[];
}

interface IDispatch {
	onSetSeries: (data: ISetSeries) => void;
}

const Results: FC<IProps & IState & IDispatch> = props => {
	const { training, exercises, navigation } = props;
	const { t } = useTranslation();

	const goToCalendar = useCallback(() => navigation.navigate(Routes.Calendar), [navigation]);

	const handleFinishTraining = useCallback(() => {
		goToCalendar();
	}, [goToCalendar]);

	if (!training) {
		return null;
	}

	return (
		<View style={styles.wrapper}>
			<H1 text={t('Training completed')} useCenteredText={true} />
			<View style={styles.fullHeight}>
				<TrainingExerciseSwipeList
					exerciseList={exercises}
					trainingExerciseList={training.exerciseList}
					canEdit={false}
				/>
				<View style={styles.buttonsWrapper}>
					<Button title={t('Finish Series')} onPress={handleFinishTraining} />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		margin: 10,
		flex: 1,
	},
	fullHeight: {
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
});

const mapStateToProps = (store: StoreModel): IState => ({
	training: store.trainingPlay.training,
	exercises: store.exercise.exercises,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onSetSeries: (data: ISetSeries) => dispatch(TRAINING_PLAY_ACTION_CREATORS.SET_SERIES(data)),
});

export const TrainingPlayResultScreen = connect(mapStateToProps, mapDispatchToProps)(Results);

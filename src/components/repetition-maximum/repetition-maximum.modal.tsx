import React, { FC, useEffect, useMemo, useState } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Big, BigSource } from 'big.js';
import { connect } from 'react-redux';
import { StoreModel } from '@redux/store';
import { Dispatch } from 'redux';
import { Colors } from '@css/colors.style';
import { Button } from '@components/button/button';
import { H2 } from '@components/heading/h2';
import { IBaseTrainingExercise, ISeries } from '@model/training-exercise';
import { calcTotal } from '@util/training-exercise.util';
import { calcRepetitionMaximum } from '@util/calculate-repetition-maximum';
import { Divider, Icon, Text, Tooltip } from 'react-native-elements';
import { setRepetitionMaximumExercise } from '@redux/action/user.action';
import { ExerciseTypes } from '@model/exercise.model';
import { Fonts, FontSizes } from '@css/fonts';

interface IState {
	exercise: IBaseTrainingExercise | null;
}

interface IDispatch {
	onDismiss: () => void;
}

interface IProps {}

const RepetitionMax: FC<IProps & IState & IDispatch> = props => {
	const { exercise, onDismiss } = props;
	const { t } = useTranslation();

	const [repeats, setRepeats] = useState<BigSource>(0);
	const [weight, setWeight] = useState<BigSource>(0);

	useEffect(() => {
		if (!exercise) {
			return;
		}

		const series = findBestSeries(exercise);
		setRepeats(series.repeats);
		switch (exercise.type) {
			case ExerciseTypes.Default:
				setWeight(new Big(series.weight));
				break;
			case ExerciseTypes.WithAdditionalWeight:
				setWeight(new Big(exercise.userWeight).plus(series.weight));
				break;
			case ExerciseTypes.WithNegativeWeight:
				setWeight(new Big(exercise.userWeight).minus(series.weight));
				break;
		}
	}, [exercise]);

	const repetitionMaximum = useMemo<string>(() => calcRepetitionMaximum(weight, repeats).toString(), [weight, repeats]);

	return (
		<Modal isVisible={!!exercise}>
			<View style={styles.wrapper}>
				<View style={styles.headingWrapper}>
					<H2 text={t('Calculate repetition maximum')} />
					<Tooltip
						containerStyle={styles.tooltip}
						width={300}
						backgroundColor={Colors.Darkgray}
						popover={<Text style={styles.tooltipText}>{t('RM description')}</Text>}>
						<Icon name="info-outline" />
					</Tooltip>
				</View>

				<View style={[styles.flexRow, styles.spaceVertical]}>
					<View style={styles.flexRow}>
						<View style={styles.spaceHorizontal}>
							<View style={[styles.stats, styles.spaceHorizontal]}>
								<Text style={styles.h1}>
									{weight.toString()} {t('Kg')}
								</Text>
								<Text>x 36</Text>
							</View>
							<Divider />
							<View style={[styles.stats, styles.spaceHorizontal]}>
								<Text style={styles.spaceHorizontal}>37 -</Text>
								<Text style={styles.h1}>
									{repeats.toString()} {t('reps')}
								</Text>
							</View>
						</View>
						<Text style={styles.spaceHorizontal}>=</Text>
					</View>
					<Text style={[styles.accentText, styles.spaceHorizontal]}>
						{repetitionMaximum} {t('Kg')}
					</Text>
				</View>

				<View style={styles.bottomActionWrapper}>
					<Button solidType="gray" onPress={onDismiss} title={t('Dismiss')} />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		padding: 20,
		backgroundColor: Colors.White,
		borderRadius: 10,
	},
	headingWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	bottomActionWrapper: {
		marginTop: 10,
	},
	stats: {
		marginVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	h1: {
		fontSize: FontSizes.H1,
		fontFamily: Fonts.KelsonBold,
	},
	accentText: {
		fontSize: FontSizes.Accent,
		fontFamily: Fonts.KelsonBold,
		textAlign: 'center',
	},
	flexRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	spaceHorizontal: {
		marginHorizontal: 5,
	},
	spaceVertical: {
		marginVertical: 10,
	},
	tooltipText: {
		fontSize: FontSizes.Small,
		color: Colors.White,
	},
	tooltip: {
		height: 'auto',
		backgroundColor: Colors.Darkgray,
	},
});

const findBestSeries = (e: IBaseTrainingExercise): ISeries => {
	const results = e.seriesList.map(s => new Big(calcTotal({ ...e, seriesList: [s] })));
	const maxIndex = results.reduce((iMax, x, index, arr) => (x.gt(arr[iMax]) ? index : iMax), 0);
	return e?.seriesList[maxIndex];
};

const mapStateToProps = (state: StoreModel): IState => ({
	exercise: state.user.repetitionMaximum.ex,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onDismiss: () => dispatch(setRepetitionMaximumExercise(null)),
});

export const RepetitionMaxModal = connect(mapStateToProps, mapDispatchToProps)(RepetitionMax);

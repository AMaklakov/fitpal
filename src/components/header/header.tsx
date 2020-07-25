import React, { useCallback, useMemo } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '@css/colors.style';
import { StoreModel } from '@redux/store';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { Header as HeaderComponent } from 'react-native-elements';
import moment, { MomentInput } from 'moment';
import { FontSizes } from '@css/fonts';
import { Countdown } from '@components/timer/countdown';
import { navigate } from '@util/navigation.util';
import { Routes } from '../../navigation/routes';
import { useTranslation } from 'react-i18next';
import { DEFAULT_TRAINING_TIMER_SECONDS } from '@const/app.const';
import { Button } from '@components/button/button';

interface IDispatch {}

interface IState {
	trainingStart: MomentInput | null;
}

interface IProps {
	onOpenMenu: () => void;
}

const Component = (props: IProps & IState & IDispatch) => {
	const { onOpenMenu, trainingStart } = props;
	const { t } = useTranslation();

	const restTime = useMemo(() => {
		return trainingStart
			? moment(trainingStart)
					.clone()
					.add(DEFAULT_TRAINING_TIMER_SECONDS, 'seconds')
			: null;
	}, [trainingStart]);

	const handleGoToTrainingPlay = useCallback(() => navigate(Routes.TrainingPlayProgress), []);

	return (
		<HeaderComponent
			containerStyle={styles.wrapper}
			leftComponent={
				<Button type="clear" icon={{ name: 'menu' }} onPress={onOpenMenu} buttonStyle={styles.menuButton} />
			}
			centerComponent={
				<View>
					{!!restTime && (
						<TouchableOpacity onPress={handleGoToTrainingPlay}>
							<View>
								<Countdown
									time={restTime?.clone().diff(moment(), 'seconds')}
									onEnd={() =>
										Alert.alert(
											t('Training already lasts for |time|. We think it is time have a rest', {
												time: `${DEFAULT_TRAINING_TIMER_SECONDS / 60} ${t('minutes')}`,
											})
										)
									}
									status="playing"
									showHours={true}
									fontSize={FontSizes.Small}
								/>
							</View>
						</TouchableOpacity>
					)}
				</View>
			}
		/>
	);
};

const HEADER_HEIGHT = 50;

const styles = StyleSheet.create({
	wrapper: {
		paddingTop: 0,
		height: HEADER_HEIGHT,
		backgroundColor: Colors.White,
	},
	menuButton: {
		paddingHorizontal: 0,
		paddingVertical: 0,
		height: HEADER_HEIGHT,
		width: HEADER_HEIGHT + 10,
	},
});

const mapStateToProps: MapStateToPropsParam<IState, IProps, StoreModel> = (store: StoreModel) => ({
	trainingStart: store.trainingPlay.startTime,
});

const mapDispatchToProps: MapDispatchToPropsParam<IDispatch, IProps> = () => {
	return {};
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(Component);

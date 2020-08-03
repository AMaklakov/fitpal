import React, { useCallback, useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IStore } from '@redux/store';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { Header as HeaderComponent } from 'react-native-elements';
import moment, { MomentInput } from 'moment';
import { FontSizes } from '@css/fonts';
import { Countdown } from '@components/timer/countdown';
import { navigate } from '@util/navigation.util';
import { Routes } from '@screen/routes';
import { useTranslation } from 'react-i18next';
import { DEFAULT_TRAINING_TIMER_SECONDS } from '@const/app.const';
import { Button } from '@components/button/button';
import { Colors } from '@css/colors.style';

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
		<LinearGradient
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
			colors={[Colors.LightRed, Colors.LightRed, Colors.LightPink]}
			locations={[0, 0.525, 1]}
			style={styles.linearGradient}>
			<HeaderComponent
				containerStyle={styles.header}
				leftComponent={
					<Button
						type="clear"
						icon={{ name: 'menu', color: Colors.White }}
						onPress={onOpenMenu}
						buttonStyle={styles.menuButton}
					/>
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
		</LinearGradient>
	);
};

const HEADER_HEIGHT = 60;

const styles = StyleSheet.create({
	header: {
		flex: 1,
		paddingTop: 0,
		backgroundColor: 'transparent',
	},
	menuButton: {
		paddingHorizontal: 0,
		paddingVertical: 0,
		height: HEADER_HEIGHT,
		width: '100%',
	},
	linearGradient: {
		// backgroundColor: Colors.White, // may be we need this to fill background
		height: HEADER_HEIGHT,
		borderBottomStartRadius: 15,
		borderBottomEndRadius: 15,
	},
});

const mapStateToProps: MapStateToPropsParam<IState, IProps, IStore> = (store: IStore) => ({
	trainingStart: store.trainingPlay.startTime,
});

const mapDispatchToProps: MapDispatchToPropsParam<IDispatch, IProps> = () => {
	return {};
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(Component);

import React, { useCallback, useMemo } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '@css/colors.style';
import { StoreModel } from '@redux/store';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { Header as HeaderComponent, Icon } from 'react-native-elements';
import moment, { MomentInput } from 'moment';
import { FontSizes } from '@css/fonts';
import { Countdown } from '@components/timer/countdown';
import { navigate } from '@util/navigation.util';
import { Routes } from '@screen/navigator';
import { useTranslation } from 'react-i18next';

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
					.add(90, 'minutes')
			: null;
	}, [trainingStart]);

	const handleGoToTrainingPlay = useCallback(() => navigate(Routes.TrainingPlayProgress), []);

	return (
		<HeaderComponent
			containerStyle={styles.wrapper}
			leftComponent={<Icon name="menu" onPress={onOpenMenu} />}
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
												time: `90 ${t('minutes')}`,
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
	menuIconHolder: {
		width: HEADER_HEIGHT,
		height: HEADER_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const mapStateToProps: MapStateToPropsParam<IState, IProps, StoreModel> = (store: StoreModel) => ({
	trainingStart: store.trainingPlay.startTime,
});

const mapDispatchToProps: MapDispatchToPropsParam<IDispatch, IProps> = () => {
	return {};
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(Component);

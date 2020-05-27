import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Countdown, ICountdownProps, ITimerStatus } from '@components/timer/countdown';
import { Button } from '@components/button/button';
import Big from 'big.js';
import { Colors } from '@css/colors.style';
import { toRgba } from '@util/css.util';

interface IProps {
	showActions?: boolean;
	showStop?: boolean;
	showRestart?: boolean;
	hidePlayOnEnd?: boolean;

	onEnd?: () => void;
}

export const Timer: FC<IProps & ICountdownProps> = props => {
	const { showActions = true, time = 0, hidePlayOnEnd, showStop, showRestart, children, onEnd, ...rest } = props;

	const [currentTime, setCurrentTime] = useState<Big>(new Big(time));
	const [status, setStatus] = useState<ITimerStatus>('stopped');

	const handleSetStatus = useCallback((v: ITimerStatus) => () => setStatus(v), []);

	const handleStopPress = useCallback(() => {
		setCurrentTime(new Big(time));
		setStatus('stopped');
	}, [time]);

	const handleEndTimer = useCallback(() => {
		setStatus('ended');
		onEnd?.();
	}, [onEnd]);

	return (
		<View style={styles.wrapper}>
			<View style={styles.countdown}>
				<Countdown time={currentTime} onEnd={handleEndTimer} status={status} {...rest} />
			</View>

			{showActions && (
				<View style={styles.actionsWrapper}>
					<View style={styles.actions}>
						{!['playing', hidePlayOnEnd && 'ended'].includes(status) && (
							<Button
								solidType="gray"
								icon={{
									name: 'play-arrow',
									color: status === 'ended' ? toRgba(Colors.Darkgray) : Colors.Primary,
								}}
								disabled={status === 'ended'}
								onPress={handleSetStatus('playing')}
							/>
						)}
						{status === 'playing' && (
							<Button solidType="gray" icon={{ name: 'pause' }} onPress={handleSetStatus('paused')} />
						)}
						{showStop && status === 'playing' && (
							<Button solidType="gray" icon={{ name: 'stop' }} onPress={handleStopPress} />
						)}
						{showRestart && status === 'ended' && (
							<Button solidType="gray" icon={{ name: 'replay' }} onPress={handleStopPress} />
						)}
					</View>

					<View style={styles.grow}>{children}</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {},
	countdown: {
		alignItems: 'center',
	},
	actionsWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	grow: {
		flex: 1,
	},
	actions: {
		flexDirection: 'row',
		marginRight: 10,
	},
});

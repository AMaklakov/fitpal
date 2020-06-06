import React, { FC, useEffect, useMemo, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import moment from 'moment';
import { Text } from 'react-native-elements';
import { Fonts } from '@css/fonts';
import { Big, BigSource } from 'big.js';

export type ITimerStatus = 'stopped' | 'playing' | 'paused' | 'ended';

export interface ICountdownProps {
	/**
	 * Timer in seconds
	 */
	time: BigSource;
	status?: ITimerStatus;

	onEnd?: () => void;
	showMilliseconds?: boolean;
	showHours?: boolean;
	interval?: number;
	fontSize?: number;
}

export const Countdown: FC<ICountdownProps> = props => {
	const { showMilliseconds = false, showHours = false, time = 60, interval = 500 } = props;
	const { fontSize = 72, status = 'stopped', onEnd } = props;

	const [currentTime, setCurrentTime] = useState<Big>(new Big(time));

	const textStyles = useMemo(() => [styles.timer, { fontSize }], [fontSize]);

	useEffect(() => setCurrentTime(new Big(time)), [time]);

	useEffect(() => {
		if (time <= 0) {
			setCurrentTime(new Big(0));
			return;
		}

		if (status !== 'playing') {
			return;
		}

		const id = setInterval(() => {
			setCurrentTime(t => {
				const seconds = new Big(interval).div(1000);
				const remaining = new Big(t).minus(seconds);

				if (remaining.lte(0)) {
					onEnd?.();
					clearInterval(id);
					return new Big(0);
				}

				return remaining;
			});
		}, interval);
		return () => clearInterval(id);
	}, [interval, onEnd, status, time]);

	const duration = moment.duration(Number(currentTime), 'second');
	const centiseconds = Math.floor(duration.milliseconds() / 10);
	const seconds = Number(
		showMilliseconds
			? duration.seconds()
			: new Big(duration.seconds()).plus(new Big(duration.milliseconds()).div(1000)).round(0, 3)
	);

	return (
		<View style={styles.wrapper}>
			{showHours && <Text style={textStyles}>{pad(duration.hours())}:</Text>}
			<Text style={textStyles}>{pad(duration.minutes())}:</Text>
			<Text style={textStyles}>{pad(seconds)}</Text>
			{showMilliseconds && <Text style={textStyles}>,{pad(centiseconds)}</Text>}
		</View>
	);
};

const pad = (n: number) => (n < 10 ? '0' + n : n);

const IS_IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
	},
	timer: {
		fontFamily: IS_IOS ? Fonts.KelsonBold : Fonts.Kelson,
		fontWeight: '400',
	},
});

import React, { useCallback, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TrainingModel } from '@model/training.model';
import { H2 } from '@components/heading/h2';
import { Card, Divider, Icon, ListItem, Tooltip } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { Fonts, FontSizes } from '@css/fonts';
import { Colors } from '@css/colors.style';
import { CompactTrainingView } from '@screen/statistics/components/compact-training-view';
import { ExerciseModel } from '@model/exercise.model';

interface TrainingMinimalViewProps {
	training: TrainingModel;
	exercises: ExerciseModel[];
	onTrainingPress?: (training: TrainingModel) => void;
	onTrainingStart?: (training: TrainingModel) => void;
	onCopy?: (training: TrainingModel) => void;
	onDelete?: (training: TrainingModel) => void;
	onExercisePress?: (exerciseId: string) => void;
}

export const TrainingMinimalView = (props: TrainingMinimalViewProps) => {
	const { training, exercises, onTrainingPress, onCopy, onDelete, onExercisePress, onTrainingStart } = props;
	const { t } = useTranslation();
	const tooltip = useRef<Tooltip>(null);

	const handleTrainingPress = useCallback(() => onTrainingPress?.(training), [onTrainingPress, training]);
	const handleTrainingPlayPress = useCallback(() => {
		tooltip.current?.toggleTooltip();
		onTrainingStart?.(training);
	}, [onTrainingStart, training]);
	const handleDetailsPress = useCallback(() => {
		tooltip.current?.toggleTooltip();
		onTrainingPress?.(training);
	}, [onTrainingPress, training]);
	const handleOnCopy = useCallback(() => {
		tooltip.current?.toggleTooltip();
		onCopy?.(training);
	}, [onCopy, training]);
	const handleOnDelete = useCallback(() => {
		tooltip.current?.toggleTooltip();
		onDelete?.(training);
	}, [onDelete, training]);

	return (
		<Card
			title={
				<View style={styles.titleContainer}>
					<TouchableOpacity onPress={handleTrainingPress}>
						<H2 text={training?.name} />
					</TouchableOpacity>
					<Tooltip
						ref={tooltip}
						withPointer={false}
						containerStyle={styles.tooltip}
						width={200}
						popover={
							<View style={styles.tooltipInner}>
								<ListItem
									title={t('Details')}
									onPress={handleDetailsPress}
									leftIcon={{ type: 'material', name: 'search' }}
									titleStyle={styles.listItemTitle}
								/>
								{/* TODO check training exercise list and series */}
								{false && (
									<ListItem
										title={t('Start training')}
										onPress={handleTrainingPlayPress}
										leftIcon={{ name: 'play-arrow' }}
										titleStyle={styles.listItemTitle}
									/>
								)}
								<ListItem
									title={t('Copy')}
									onPress={handleOnCopy}
									leftIcon={{ type: 'material', name: 'content-copy' }}
									titleStyle={styles.listItemTitle}
								/>
								<ListItem
									title={t('Delete')}
									leftIcon={{ type: 'material', name: 'delete' }}
									onPress={handleOnDelete}
									titleStyle={styles.listItemTitle}
								/>
							</View>
						}>
						<Icon type="material" name="more-vert" />
					</Tooltip>
				</View>
			}>
			<Divider />
			<CompactTrainingView
				useHeading={false}
				training={training}
				exercises={exercises}
				onExerciseNamePress={onExercisePress}
			/>
		</Card>
	);
};

const styles = StyleSheet.create({
	exerciseWrap: {
		maxWidth: 30 + '%',
	},
	titleContainer: {
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	tooltip: {
		height: 'auto',
		backgroundColor: Colors.White,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
	tooltipInner: { width: '100%' },
	listItemTitle: {
		fontSize: FontSizes.Small,
		fontFamily: Fonts.Kelson,
	},
});

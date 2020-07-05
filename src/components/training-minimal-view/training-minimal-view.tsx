import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TrainingModel } from '@model/training.model';
import { H2 } from '@components/heading/h2';
import { Card, Divider, Tooltip } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { CompactTrainingView } from '@screen/statistics/components/compact-training-view';
import { ExerciseModel } from '@model/exercise.model';
import { ITooltipMenuItem, TooltipMenu } from '@components/tooltip/tooltip-menu';

interface TrainingMinimalViewProps {
	training: TrainingModel;
	exercises: ExerciseModel[];
	onTrainingPress?: (training: TrainingModel) => void;
	onTrainingStart?: (training: TrainingModel) => void;
	onCopy?: (training: TrainingModel) => void;
	onDelete?: (training: TrainingModel) => void;
	onEdit?: (training: TrainingModel) => void;
	onExercisePress?: (exerciseId: string) => void;
}

export const TrainingMinimalView = (props: TrainingMinimalViewProps) => {
	const { training, exercises, onTrainingPress, onCopy, onDelete, onExercisePress, onTrainingStart, onEdit } = props;
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
	const handleEdit = useCallback(() => {
		tooltip.current?.toggleTooltip();
		onEdit?.(training);
	}, [onEdit, training]);

	const tooltipItems = useMemo<ITooltipMenuItem[]>(
		() => [
			{
				title: t('Details'),
				leftIcon: { name: 'search' },
				onPress: handleDetailsPress,
				key: 'details',
			},
			/* TODO check training exercise list and series */
			{
				title: t('Start training'),
				leftIcon: { name: 'play-arrow' },
				onPress: handleTrainingPlayPress,
				key: 'start',
				isShown: false,
			},
			{
				title: t('Edit'),
				leftIcon: { name: 'edit' },
				onPress: handleEdit,
				key: 'edit',
				isShown: !!onEdit,
			},
			{
				title: t('Copy'),
				leftIcon: { name: 'content-copy' },
				onPress: handleOnCopy,
				key: 'copy',
				isShown: !!onCopy,
			},
			{
				title: t('Delete'),
				leftIcon: { name: 'delete' },
				onPress: handleOnDelete,
				key: 'delete',
				isShown: !!onDelete,
			},
		],
		[handleDetailsPress, handleEdit, handleOnCopy, handleOnDelete, handleTrainingPlayPress, onCopy, onDelete, onEdit, t]
	);

	return (
		<Card
			title={
				<View style={styles.titleContainer}>
					<TouchableOpacity onPress={handleTrainingPress} style={styles.heading}>
						<H2 text={training?.name} />
					</TouchableOpacity>
					<TooltipMenu items={tooltipItems} tooltipRef={tooltip} />
				</View>
			}>
			<Divider />
			<CompactTrainingView
				useHeading={false}
				training={training}
				exercises={exercises}
				onExerciseNamePress={onExercisePress}
				onTotalPress={handleTrainingPress}
			/>
		</Card>
	);
};

const styles = StyleSheet.create({
	exerciseWrap: { maxWidth: 30 + '%' },
	heading: { flex: 1 },
	titleContainer: {
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TrainingModel } from '@model/training.model';
import { H2 } from '@components/heading/h2';
import { Card, Divider, Icon, ListItem, Tooltip } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { Fonts } from '@css/fonts';
import { Colors } from '@css/colors.style';
import { CompactTrainingView } from '@screen/statistics/components/compact-training-view';
import { ExerciseModel } from '@model/exercise.model';

interface TrainingMinimalViewProps {
	training: TrainingModel;
	onTrainingPress?: (training: TrainingModel) => void;
	onCopy?: (training: TrainingModel) => void;
	onDelete?: (training: TrainingModel) => void;
	exercises: ExerciseModel[];
}

export const TrainingMinimalView = (props: TrainingMinimalViewProps) => {
	const { training, exercises, onTrainingPress, onCopy, onDelete } = props;
	const { t } = useTranslation();

	const handleOnPress = useCallback(() => onTrainingPress?.(training), [onTrainingPress, training]);
	const handleOnCopy = useCallback(() => onCopy?.(training), [onCopy, training]);
	const handleOnDelete = useCallback(() => onDelete?.(training), [onDelete, training]);

	return (
		<Card
			title={
				<View style={styles.titleContainer}>
					<TouchableOpacity onPress={handleOnPress}>
						<H2 text={training?.name} />
					</TouchableOpacity>
					<Tooltip
						withPointer={false}
						containerStyle={styles.tooltip}
						width={200}
						popover={
							<View style={styles.tooltipInner}>
								<ListItem
									title={t('Details')}
									onPress={handleOnPress}
									leftIcon={{ type: 'material', name: 'search' }}
									titleStyle={styles.listItemTitle}
								/>
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
			<View style={styles.exerciseWrap}>
				<Text>{training?.exerciseList?.length} упражнений</Text>
			</View>
			<CompactTrainingView useHeading={false} training={training} exercises={exercises} listItemAction={handleOnPress}/>
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
		fontSize: 14,
		fontFamily: Fonts.Kelson,
	},
});

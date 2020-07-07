import React, { useCallback, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { H2 } from '../heading/h2';
import { useTranslation } from 'react-i18next';
import { calcTotal } from '@util/training-exercise.util';
import { IBaseTrainingExercise, ISeries } from '@model/training-exercise';
import { Colors } from '@css/colors.style';
import { WeightIcon } from '@icons/weight.icon';
import { CounterIcon } from '@icons/counter.icon';
import { HashtagIcon } from '@icons/hashtag.icon';
import { Icon, ListItem, Tooltip } from 'react-native-elements';
import { Fonts } from '@css/fonts';
import { ExerciseModel } from '@model/exercise.model';

interface IProps {
	trainingExercise: IBaseTrainingExercise;
	exerciseList: ExerciseModel[];
	onPress?: (trainingExercise: IBaseTrainingExercise) => void;
	onLongPress?: (trainingExercise: IBaseTrainingExercise) => void;
	onCalcRM?: (trainingExercise: IBaseTrainingExercise) => void;
	onEdit?: (trainingExercise: IBaseTrainingExercise) => void;
	onDelete?: (trainingExercise: IBaseTrainingExercise) => void;
	onReorder?: (trainingExercise: IBaseTrainingExercise) => void;
}

const TrainingExercise = (props: IProps) => {
	const { trainingExercise, exerciseList, onLongPress, onPress, onCalcRM, onDelete, onEdit, onReorder } = props;
	const { exerciseId, seriesList } = trainingExercise;
	const { t } = useTranslation();
	const tooltip = useRef<Tooltip>(null);

	const onLongPressAction = useCallback(() => onLongPress?.(trainingExercise), [onLongPress, trainingExercise]);
	const onPressAction = useCallback(() => onPress?.(trainingExercise), [onPress, trainingExercise]);

	const handleEditPress = useCallback(() => {
		tooltip.current?.toggleTooltip();
		onEdit?.(trainingExercise);
	}, [onEdit, trainingExercise]);
	const handleCalcRMPress = useCallback(() => {
		tooltip.current?.toggleTooltip();
		onCalcRM?.(trainingExercise);
	}, [onCalcRM, trainingExercise]);
	const handleDeletePress = useCallback(() => {
		tooltip.current?.toggleTooltip();
		onDelete?.(trainingExercise);
	}, [onDelete, trainingExercise]);
	const handleReorder = useCallback(() => {
		tooltip.current?.toggleTooltip();
		onReorder?.(trainingExercise);
	}, [onReorder, trainingExercise]);

	return (
		<TouchableOpacity activeOpacity={1} onLongPress={onLongPressAction} onPress={onPressAction} style={styles.wrapper}>
			<View style={styles.innerWrapper}>
				<View style={styles.headerWrapper}>
					<H2 text={exerciseList?.find(e => e._id === exerciseId)?.name ?? ''} numberOfLinesEllipsis={1} />
					<Tooltip
						ref={tooltip}
						withPointer={false}
						containerStyle={styles.tooltip}
						width={200}
						popover={
							<View style={styles.tooltipInner}>
								{!!onEdit && (
									<ListItem
										title={t('Edit')}
										onPress={handleEditPress}
										leftIcon={{ name: 'edit' }}
										titleStyle={styles.listItemTitle}
									/>
								)}
								{!!trainingExercise.seriesList.length && !!onCalcRM && (
									<ListItem
										title={t('Calculate RM')}
										onPress={handleCalcRMPress}
										leftIcon={{ type: 'material-community', name: 'calculator' }}
										titleStyle={styles.listItemTitle}
									/>
								)}
								{!!onReorder && (
									<ListItem
										title={t('Reorder')}
										onPress={handleReorder}
										leftIcon={{ name: 'reorder' }}
										titleStyle={styles.listItemTitle}
									/>
								)}
								{!!onDelete && (
									<ListItem
										title={t('Delete')}
										onPress={handleDeletePress}
										leftIcon={{ name: 'delete' }}
										titleStyle={styles.listItemTitle}
									/>
								)}
							</View>
						}>
						{(!!onEdit || !!onCalcRM || !!onDelete) && <Icon type="material" name="more-vert" />}
					</Tooltip>
				</View>
				<View style={styles.table}>
					<View style={styles.tableHeading}>
						<HashtagIcon color={Colors.White} />
						<CounterIcon color={Colors.White} />
						<WeightIcon color={Colors.White} />
					</View>

					{seriesList.map((s: ISeries, index: number) => (
						<View key={index} style={styles.tableBody}>
							<Text>{index + 1}</Text>
							<Text>{s.repeats}</Text>
							<Text>
								{s.weight} {t('Kg')}
							</Text>
						</View>
					))}
				</View>
				<Text style={styles.total}>{t('Total |num| kilos', { num: calcTotal(trainingExercise) })}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default TrainingExercise;

const styles = StyleSheet.create({
	table: {
		margin: 10,
	},
	tableHeading: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: 'darkgrey',
		padding: 5,
		borderRadius: 15,
	},
	tableBody: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 5,
	},
	headerWrapper: {
		marginTop: 10,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	total: {
		fontSize: 16,
		textAlign: 'right',
		paddingRight: 25,
		paddingTop: 10,
	},
	wrapper: {
		backgroundColor: Colors.Default,
		borderBottomWidth: 0.3,
		borderBottomColor: Colors.Grey,
	},
	innerWrapper: {
		paddingBottom: 10,
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

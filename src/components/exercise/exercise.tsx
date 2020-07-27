import React, { FC, ReactNode, useCallback, useMemo, useRef } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import { Divider, Icon, ListItem, Text, Tooltip } from 'react-native-elements';
import { H2 } from '../heading/h2';
import { useTranslation } from 'react-i18next';
import { calcTotal } from '@util/training-exercise.util';
import { IBaseTrainingExercise, ISeries } from '@model/training-exercise';
import { Colors } from '@css/colors.style';
import { Fonts, FontSizes } from '@css/fonts';
import { ExerciseModel } from '@model/exercise.model';
import { BigSource } from 'big.js';

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

	const total = useMemo(() => calcTotal(trainingExercise), [trainingExercise]);

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
			<View style={styles.headerWrapper}>
				<H2
					text={exerciseList?.find(e => e._id === exerciseId)?.name ?? ''}
					numberOfLinesEllipsis={1}
					style={styles.header}
				/>
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
					{(!!onEdit || !!onCalcRM || !!onDelete) && (
						<Icon type="material" name="more-vert" color={Colors.White} containerStyle={styles.tooltipIcon} />
					)}
				</Tooltip>
			</View>

			<View style={styles.setsHeaderWrapper}>
				<Text style={[styles.setsHeader, styles.tableSet]}>{t('Sets')}</Text>
				<Text style={[styles.setsHeader, styles.tableReps]}>{t('Repeats')}</Text>
				<View style={styles.tableIcon} />
				<Text style={[styles.setsHeader, styles.tableWeight]}>{t('Weight')}</Text>
			</View>
			{seriesList.map((s: ISeries, index: number) => (
				<View key={index} style={styles.rowContainer}>
					<View style={[styles.tableSet]}>
						<Text style={styles.rowText}>{index + 1}</Text>
					</View>
					<View style={[styles.tableReps]}>
						<Cell data={s.repeats} textStyle={styles.rowText} />
					</View>
					<View style={[styles.tableIcon, styles.multiply]}>
						<Icon name="clear" size={FontSizes.Small} />
					</View>
					<View style={[styles.tableWeight]}>
						<Cell
							data={s.weight}
							textStyle={styles.rowText}
							afterElement={<Text style={styles.kilos}>{t('Kg')}</Text>}
						/>
					</View>
				</View>
			))}
			<Divider style={styles.divider} />
			<Text style={styles.total}>{t('Total |num| kilos', { num: total })}</Text>
		</TouchableOpacity>
	);
};

export default TrainingExercise;

interface ICellProps {
	data: string | number | BigSource;
	textStyle: StyleProp<TextStyle>;
	afterElement?: ReactNode;
}

const Cell: FC<ICellProps> = ({ data, textStyle, afterElement }) => {
	return (
		<View style={cellStyles.wrapper}>
			<Text style={textStyle}>{data}</Text>
			{!!afterElement && <View style={cellStyles.afterEl}>{afterElement}</View>}
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 10,
		backgroundColor: Colors.White,
		borderBottomWidth: 0.3,
		borderBottomColor: Colors.Grey,
	},
	headerWrapper: {
		padding: 10,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.Accent,
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
	header: {
		color: Colors.White,
		fontFamily: Fonts.OswaldRegular,
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
	tooltipIcon: {
		width: 40,
	},

	total: {
		marginRight: 25,
		marginBottom: 15,
		fontSize: FontSizes.Big,
		fontFamily: Fonts.OswaldMedium,
		textAlign: 'right',
	},

	// rows

	rowContainer: {
		marginTop: 5,
		marginHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	set: {
		textAlign: 'center',
	},
	repeats: {
		fontSize: FontSizes.Big,
		textAlign: 'center',
	},
	weight: {
		textAlign: 'center',
		fontSize: FontSizes.Big,
	},
	multiply: {
		// marginHorizontal: 5,
	},
	setsHeaderWrapper: {
		marginHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	setsHeader: {
		textAlign: 'center',
		fontSize: FontSizes.Small,
		lineHeight: FontSizes.Regular,
		fontFamily: Fonts.RobotoCondensedLight,
	},
	tableSet: {
		flex: 5,
	},
	tableReps: {
		flex: 4,
		alignItems: 'center',
	},
	tableWeight: {
		flex: 4,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	rowText: {
		fontSize: FontSizes.Big,
		textAlign: 'center',
		fontFamily: Fonts.RobotoCondensedLight,
	},
	tableIcon: {
		flexBasis: 25,
	},
	divider: {
		height: 1,
		marginVertical: 15,
		backgroundColor: Colors.Grey,
	},
	kilos: {
		fontFamily: Fonts.RobotoCondensedLight,
	},
});

const cellStyles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#F1F1F1',
		borderRadius: 5,
		width: 55,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	afterEl: {
		position: 'absolute',
		left: '105%',
	},
});

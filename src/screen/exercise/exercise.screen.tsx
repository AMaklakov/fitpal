import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { ExerciseModel } from '@model/exercise.model';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { StoreModel } from '@redux/store';
import { getExerciseById } from '@redux/selector/exercise.selector';
import { H1 } from '@components/heading/h1';
import { H2 } from '@components/heading/h2';
import { Routes } from '@screen/routes';
import { useTranslation } from 'react-i18next';
import { ITooltipMenuItem, TooltipMenu } from '@components/tooltip/tooltip-menu';
import { Tooltip } from 'react-native-elements';

interface IProps extends NavigationPropsModel {}

interface IDispatch {}

interface IState {
	exercise?: ExerciseModel;
}

const Exercise = (props: IProps & IDispatch & IState) => {
	const { navigation, exercise } = props;
	const { t } = useTranslation();

	const tooltipRef = useRef<Tooltip>(null);

	useEffect(() => {
		if (!exercise) {
			navigation.goBack();
		}
	}, [exercise, navigation]);

	const handleEdit = useCallback(() => {
		tooltipRef.current?.toggleTooltip();
		navigation.navigate(Routes.ExerciseCreate, { exerciseId: exercise?._id });
	}, [exercise?._id, navigation]);

	const tooltipItems = useMemo<ITooltipMenuItem[]>(
		() => [
			{
				title: t('Edit'),
				leftIcon: { name: 'edit' },
				onPress: handleEdit,
				key: 'edit',
				isShown: !!exercise?.userId,
			},
			{
				title: t('Delete'),
				leftIcon: { name: 'delete' },
				onPress: () => {},
				key: 'delete',
				isShown: false,
			},
		],
		[exercise?.userId, handleEdit, t]
	);
	const showTooltip = useMemo(() => tooltipItems.some(x => x.isShown), [tooltipItems]);

	if (!exercise) {
		return null;
	}
	return (
		<View style={styles.wrapper}>
			<ScrollView>
				<View style={styles.headingWrapper}>
					<H1 text={exercise.name} wrapperStyle={styles.h1} />
					{showTooltip && (
						<TooltipMenu items={tooltipItems} tooltipRef={tooltipRef} tooltipIconStyle={styles.tooltipIcon} />
					)}
				</View>
				<View style={styles.description}>
					<H2 text={t('Description')} wrapperStyle={styles.h2} />
					<Text style={styles.details}>{exercise.description ?? t('No description')}</Text>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingHorizontal: 10,
	},
	tooltipIcon: {
		marginTop: 14,
	},
	description: {
		flex: 1,
	},
	details: {
		marginHorizontal: 10,
	},
	headingWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	h1: {
		marginVertical: 15,
		flex: 1,
	},
	h2: {
		marginBottom: 10,
	},
});

const mapStateToProps: MapStateToProps<IState, IProps, StoreModel> = (state: StoreModel, ownProps: IProps): IState => {
	return {
		exercise: getExerciseById(state, ownProps.navigation.getParam('exerciseId')),
	};
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapDispatchToProps: MapDispatchToProps<IDispatch, IProps> = (dispatch, ownProps) => {
	return {};
};

export const ExerciseScreen = connect<IState, IDispatch, IProps, StoreModel>(
	mapStateToProps,
	mapDispatchToProps
)(Exercise);

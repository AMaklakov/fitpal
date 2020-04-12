import React, { useCallback } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { ExerciseModel } from '../../model/exercise.model';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationPropsModel } from '../../model/navigation-props.model';
import { StoreModel } from '../../redux/store';
import { getExerciseById } from '../../redux/selector/exercise.selector';
import { H1 } from '../../components/heading/h1';
import { H2 } from '../../components/heading/h2';
import { Routes } from '../navigator';
import { useTranslation } from 'react-i18next';
import { Colors } from '@css/colors.style';

interface IProps extends NavigationPropsModel {}

interface IDispatch {}

interface IState {
	exercise?: ExerciseModel;
}

const Exercise = (props: IProps & IDispatch & IState) => {
	const { navigation, exercise } = props;
	const { t } = useTranslation();

	if (!exercise) {
		throw new Error(`Exercise does not exist!`);
	}

	const handleEdit = useCallback(() => {
		navigation.navigate(Routes.ExerciseCreate, {
			exerciseId: exercise.id,
		});
	}, [exercise, navigation]);

	// @ts-ignore
	return (
		<View style={styles.container}>
			<H1 text={exercise.name} />

			<View style={styles.description}>
				<H2 text={t('Description')} />
				<Text style={styles.details}>
					{Array(parseInt((Math.random() * 20).toFixed(), 10))
						.fill(exercise.name)
						.join(', ')}
				</Text>
			</View>

			<View style={styles.buttonContainer}>
				<Button title={t('Edit')} onPress={handleEdit} />
				<Button color={Colors.LightRed} title={t('Удалить')} onPress={handleEdit} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 12,
	},
	description: {
		flex: 1,
		paddingTop: 12,
	},
	details: {
		paddingTop: 12,
		marginHorizontal: 10,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		height: 50,
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

import React, { useCallback } from 'react';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { ExerciseModel } from '../../model/exercise.model';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationPropsModel } from '../../model/navigation-props.model';
import { StoreModel } from '../../redux/store';
import { getExerciseById } from '../../redux/selector/exercise.selector';
import { H1 } from '../../components/heading/h1';
import { H2 } from '../../components/heading/h2';
import { Routes } from '../navigator';
import { useTranslation } from 'react-i18next';

interface IProps extends NavigationPropsModel {}

interface IDispatchToProps {}

interface IStateToProps {
	exercise: ExerciseModel;
}

const Exercise = (props: IProps & IDispatchToProps & IStateToProps) => {
	const { navigation, exercise } = props;
	const { t } = useTranslation();

	const handleEdit = useCallback(() => {
		navigation.navigate(Routes.ExerciseCreate, {
			exerciseId: exercise.id,
		});
	}, [exercise, navigation]);

	return (
		<View style={styles.container}>
			<H1 text={exercise?.name} />

			<View style={styles.description}>
				<H2 text={t('Description')} />
				<Text>
					{Array(parseInt((Math.random() * 20).toFixed(), 10))
						.fill(exercise.name)
						.join(', ')}
				</Text>
			</View>

			<View style={styles.buttonContainer}>
				<Button title={t('Edit')} onPress={handleEdit} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	description: {
		flex: 1,
	},
	buttonContainer: {
		height: 70,
	},
});

const mapStateToProps: MapStateToPropsParam<IStateToProps, IProps, StoreModel> = (state, ownProps) => {
	return {
		exercise: getExerciseById(state, ownProps.navigation.getParam('exerciseId')),
	};
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapDispatchToProps: MapDispatchToPropsParam<IDispatchToProps, IProps> = (dispatch, ownProps) => {
	return {};
};

export const ExerciseScreen = connect(mapStateToProps, mapDispatchToProps)(Exercise);

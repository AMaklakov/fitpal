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

const EXERCISE_ID_PARAM = 'exerciseId';

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

interface IProps extends NavigationPropsModel {}

interface IDispatch {}

interface IState {
	exercise?: ExerciseModel;
}

const Exercise = (props: IProps & IDispatch & IState) => {
	const { navigation, exercise } = props;

	if (!exercise) {
		throw new Error(`Exercise does not exist!`);
	}

	const handleEdit = useCallback(() => {
		navigation.navigate(Routes.ExerciseCreate, {
			exerciseId: exercise.id,
		});
	}, [exercise, navigation]);

	return (
		<View style={styles.container}>
			<H1 text={exercise.name} />

			<View style={styles.description}>
				<H2 text={'Описание'} />
				<Text>
					{Array(~~(Math.random() * 20))
						.fill(exercise.name)
						.join(', ')}
				</Text>
			</View>

			<View style={styles.buttonContainer}>
				<Button title={'Edit'} onPress={handleEdit} />
			</View>
		</View>
	);
};

const mapStateToProps: MapStateToProps<IState, IProps, StoreModel> = (state: StoreModel, ownProps: IProps): IState => {
	return {
		exercise: getExerciseById(state, ownProps.navigation.getParam(EXERCISE_ID_PARAM)),
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

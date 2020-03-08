import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { StoreModel } from '../../redux/store';
import { NavigationPropsModel } from '../../model/navigation-props.model';
import { getExerciseById } from '../../redux/selector/exercise.selector';
import { ExerciseModel } from '../../model/exercise.model';
import H1 from '../../components/heading/h1';
import StringInput from '../../components/string-input/string-input';
import { WithOptional } from '../../util/type.util';
import { createExerciseAction, updateExerciseAction } from '../../redux/action/exercise.action';

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

interface IProps extends NavigationPropsModel {}

interface IDispatchToProps {
	onCreateExercise: (exercise: WithOptional<ExerciseModel, 'id'>) => void;
	onUpdateExercise: (exercise: ExerciseModel) => void;
}

interface IStateToProps {
	exercise: ExerciseModel | undefined;
}

const ExerciseCreate = (props: IProps & IStateToProps & IDispatchToProps) => {
	const { exercise, onCreateExercise, onUpdateExercise, navigation } = props;

	const [name, changeName] = useState(exercise?.name ?? '');

	const handleGoBack = () => navigation.goBack();

	const handleSavePress = () => {
		if (!name) {
			return;
		}

		exercise === undefined ? onCreateExercise({ name }) : onUpdateExercise({ ...exercise, name });

		handleGoBack();
	};

	return (
		<View>
			<H1 text={exercise ? 'Редактировать упражнение' : 'Создать упражнение'} />

			<View>
				<StringInput value={name} onTextChange={changeName} maxLength={100} placeholder={'Наименование упражнения'} />
			</View>

			<View style={styles.buttonContainer}>
				<Button disabled={name === '' || name === exercise?.name} title={'Сохранить'} onPress={handleSavePress} />
				<Button title={'Отменить'} onPress={handleGoBack} />
			</View>
		</View>
	);
};

const mapStateToProps: MapStateToPropsParam<IStateToProps, IProps, StoreModel> = (state, ownProps) => {
	const exerciseId = ownProps.navigation.getParam('exerciseId');

	return {
		exercise: exerciseId && getExerciseById(state, exerciseId),
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatchToProps, IProps> = dispatch => {
	return {
		onCreateExercise: (exercise: WithOptional<ExerciseModel, 'id'>) => {
			const action = createExerciseAction(exercise);

			if (action) {
				dispatch(action);
			}
		},
		onUpdateExercise: (exercise: ExerciseModel) => {
			const action = updateExerciseAction(exercise);

			if (action) {
				dispatch(action);
			}
		},
	};
};

export const ExerciseCreateScreen = connect(mapStateToProps, mapDispatchToProps)(ExerciseCreate);

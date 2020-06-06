import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { StoreModel } from '@redux/store';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { getExerciseById } from '@redux/selector/exercise.selector';
import { ExerciseModel, ExerciseTypes, ICreateExercise } from '@model/exercise.model';
import { H1 } from '@components/heading/h1';
import { StringInputWithValidation } from '@components/inputs/string-input/string-input';
import { createExerciseStart, EXERCISE_ACTION_CREATORS } from '@redux/action/exercise.action';
import { useTranslation } from 'react-i18next';
import { EXERCISE_NAME_MAXLENGTH, EXERCISE_NAME_MINLENGTH } from '@const/validation-const';
import { IErrors } from '@components/with-validation/with-validation';
import { Button } from '@components/button/button';

interface IProps extends NavigationPropsModel {}

interface IDispatchToProps {
	onCreateExercise: (exercise: ICreateExercise) => void;
	onUpdateExercise: (exercise: ExerciseModel) => void;
}

interface IStateToProps {
	exercise: ExerciseModel | undefined;
}

const ExerciseCreate = (props: IProps & IStateToProps & IDispatchToProps) => {
	const { exercise, onCreateExercise, onUpdateExercise, navigation } = props;
	const { t } = useTranslation();

	const [name, changeName] = useState(exercise?.name ?? '');
	const [type] = useState<ExerciseTypes>(ExerciseTypes.Default);
	const [isSaveDisabled, changeIsSaveDisabled] = useState(!exercise?.name);

	const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

	const handleSavePress = useCallback(() => {
		if (!name) {
			return;
		}

		exercise === undefined ? onCreateExercise({ name, type }) : onUpdateExercise({ ...exercise, name });

		handleGoBack();
	}, [exercise, handleGoBack, name, onCreateExercise, onUpdateExercise, type]);

	const handleChangeName = useCallback((name: string, errors?: IErrors) => {
		changeName(name);
		changeIsSaveDisabled(!!errors);
	}, []);

	return (
		<View style={styles.wrapper}>
			<H1 text={exercise ? t('Edit exercise') : t('Create exercise')} wrapperStyle={styles.h1} />

			<View style={styles.mainContent}>
				<StringInputWithValidation
					value={name}
					onChange={handleChangeName}
					maxLength={[EXERCISE_NAME_MAXLENGTH, t('Max length is |len|', { len: EXERCISE_NAME_MAXLENGTH })]}
					minLength={[EXERCISE_NAME_MINLENGTH, t('Min length is |len|', { len: EXERCISE_NAME_MINLENGTH })]}
					placeholder={t('Exercise name')}
				/>
			</View>

			<View style={styles.buttonContainer}>
				<Button solidType="gray" title={t('Cancel')} onPress={handleGoBack} />
				<Button disabled={isSaveDisabled} title={t('Save')} onPress={handleSavePress} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingHorizontal: 10,
	},
	buttonContainer: {
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	mainContent: {
		flex: 1,
	},
	h1: {
		marginVertical: 15,
	},
});

const mapStateToProps: MapStateToPropsParam<IStateToProps, IProps, StoreModel> = (state, ownProps) => {
	const exerciseId = ownProps.navigation.getParam('exerciseId');

	return {
		exercise: exerciseId && getExerciseById(state, exerciseId),
	};
};

const mapDispatchToProps: MapDispatchToPropsParam<IDispatchToProps, IProps> = dispatch => {
	return {
		onCreateExercise: (exercise: ICreateExercise) => dispatch(createExerciseStart(exercise)),
		onUpdateExercise: (exercise: ExerciseModel) => dispatch(EXERCISE_ACTION_CREATORS.UPDATE.START(exercise)),
	};
};

export const ExerciseCreateScreen = connect(mapStateToProps, mapDispatchToProps)(ExerciseCreate);

import React, { useCallback, useMemo, useState } from 'react';
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
import { EXERCISE_VALID } from '@const/validation-const';
import { Button } from '@components/button/button';
import { SelectInput } from '@components/select-input';
import { Text } from 'react-native-elements';
import { Fonts, FontSizes } from '@css/fonts';
import { Colors } from '@css/colors.style';
import { validateExercise } from '@util/exercise.util';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

	const [name, setName] = useState(exercise?.name ?? '');
	const [description, setDescription] = useState(exercise?.description ?? '');
	const [type, setType] = useState<ExerciseTypes>(ExerciseTypes.Default);
	const isSaveDisabled = useMemo(() => !validateExercise({ name, description, type }), [description, name, type]);

	const EXERCISE_TYPES = useMemo(
		() => [
			{ label: t('Default exercise'), value: ExerciseTypes.Default },
			{ label: t('With additional weight'), value: ExerciseTypes.WithAdditionalWeight },
			{ label: t('With negative weight'), value: ExerciseTypes.WithNegativeWeight },
		],
		[t]
	);

	const handleSetName = useCallback((value: string) => setName(value), []);
	const handleSetDescription = useCallback((value: string) => setDescription(value), []);
	const handleSetType = useCallback((value: ExerciseTypes | null) => setType(value ?? 0), []);

	const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);
	const handleSavePress = useCallback(() => {
		if (isSaveDisabled) {
			return;
		}

		exercise === undefined
			? onCreateExercise({ name, type, description })
			: onUpdateExercise({ ...exercise, name, description });

		handleGoBack();
	}, [exercise, handleGoBack, name, onCreateExercise, onUpdateExercise, type, description, isSaveDisabled]);

	return (
		<KeyboardAwareScrollView>
			<View style={styles.wrapper}>
				<View style={styles.contentWrapper}>
					<H1 text={exercise ? t('Edit exercise') : t('Create exercise')} wrapperStyle={styles.h1} />

					<StringInputWithValidation
						defaultValue={name}
						onChange={handleSetName}
						maxLength={[
							EXERCISE_VALID.NAME.maxLength,
							t('Max length is |len|', { len: EXERCISE_VALID.NAME.maxLength }),
						]}
						minLength={[
							EXERCISE_VALID.NAME.minLength,
							t('Min length is |len|', { len: EXERCISE_VALID.NAME.minLength }),
						]}
						label={t('Nomination')}
					/>

					{!exercise && (
						<View style={styles.exerciseTypeWrapper}>
							<Text style={styles.asLabel}>{t('Exercise type')}</Text>
							<SelectInput items={EXERCISE_TYPES} value={type} onChange={handleSetType} placeholder={{}} />
							<Text style={styles.exerciseTypeDescription}>
								{type === ExerciseTypes.Default && t('Default exercise type description')}
								{type === ExerciseTypes.WithAdditionalWeight && t('WithAdditionalWeight exercise type description')}
								{type === ExerciseTypes.WithNegativeWeight && t('WithNegativeWeight exercise type description')}
							</Text>
						</View>
					)}

					<StringInputWithValidation
						defaultValue={description}
						onChange={handleSetDescription}
						maxLength={[
							EXERCISE_VALID.DESCRIPTION.maxLength,
							t('Max length is |len|', { len: EXERCISE_VALID.DESCRIPTION.maxLength }),
						]}
						multiline={true}
						label={t('Description')}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<Button solidType="gray" title={t('Cancel')} onPress={handleGoBack} />
					<Button disabled={isSaveDisabled} title={t('Save')} onPress={handleSavePress} />
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingHorizontal: 10,
	},
	buttonContainer: {
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	mainContent: {
		flex: 1,
	},
	h1: {
		marginVertical: 15,
	},
	exerciseTypeDescription: {
		marginTop: 10,
		fontSize: FontSizes.Hint,
	},
	exerciseTypeWrapper: {
		marginBottom: 20,
		paddingHorizontal: 10,
	},
	asLabel: {
		marginBottom: 2,
		fontSize: FontSizes.Small,
		fontFamily: Fonts.Kelson,
		color: Colors.Primary,
	},
	contentWrapper: {
		flex: 1,
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

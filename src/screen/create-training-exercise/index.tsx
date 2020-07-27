import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { TRAINING_ACTION_CREATORS } from '@redux/action/training-exercise.action';
import { IStore } from '@redux/store';
import { getExerciseList } from '@redux/selector/exercise.selector';
import { NavigationPropsModel } from '@model/navigation-props.model';
import { ExerciseModel, ExerciseTypes } from '@model/exercise.model';
import { createEmptyTrainingExercise, validateTrainingExercise } from '@util/training-exercise.util';
import {
	IAdditionalWeightTrainingExercise,
	IBaseTrainingExercise,
	ICreateTrainingExercise,
	IDefaultTrainingExercise,
	INegativeWeightTrainingExercise,
	ISet,
} from '@model/training-exercise';
import { BigSource } from 'big.js';
import { fetchExercisesStart } from '@redux/action/exercise.action';
import { commonStyles } from '@screen/create-training-exercise/style';
import { H1 } from '@components/heading/h1';
import { AutocompleteInput, ISelectedItemIconActions } from '@components/autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { DefaultSets } from '@screen/create-training-exercise/components/default-sets';
import { WithAdditionalWeightSets } from '@screen/create-training-exercise/components/with-additional-weight-sets';
import { WithNegativeWeightSets } from '@screen/create-training-exercise/components/with-negative-weight';
import { TooltipMenu } from '@components/tooltip/tooltip-menu';
import { Button } from '@components/button/button';
import { FontSizes } from '@css/fonts';
import { View } from 'react-native';
import { Colors } from '@css/colors.style';
import { goBack } from '@util/navigation.util';
import omit from 'lodash/omit';

interface IState {
	exerciseList: ExerciseModel[];
	userWeight: BigSource;
}

interface IDispatch {
	onSave: (trainingId: string, exercise: ICreateTrainingExercise) => void;
	onEdit: (trainingId: string, exercise: ICreateTrainingExercise) => void;
	onFetchExercises: () => void;
}

interface IProps extends NavigationPropsModel {}

const Screen = (props: IProps & IState & IDispatch) => {
	const { navigation, onSave, onEdit, exerciseList, userWeight, onFetchExercises } = props;
	const { t } = useTranslation();

	const trainingId: string = useMemo(() => navigation.getParam('trainingId'), [navigation]);
	const trainingExerciseFromNavigation: IBaseTrainingExercise | undefined = useMemo(
		() => navigation.getParam('trainingExercise'),
		[navigation]
	);

	const [trainingExercise, setTrainingExercise] = useState<ICreateTrainingExercise>(
		createEmptyTrainingExercise(userWeight)
	);
	const [selectedExercise, setSelectedExercise] = useState<ExerciseModel | null>(null);
	const [isValid, setIsValid] = useState(true);

	// get training exercise from navigation
	useEffect(() => {
		if (trainingExerciseFromNavigation) {
			setTrainingExercise(trainingExerciseFromNavigation);
			setSelectedExercise(getExerciseFromList(trainingExerciseFromNavigation.exerciseId, exerciseList));
		}
	}, [exerciseList, trainingExerciseFromNavigation]);

	useEffect(() => {
		if (exerciseList.length === 0) {
			onFetchExercises();
		}
	}, [onFetchExercises, exerciseList]);

	useEffect(() => {
		setIsValid(validateTrainingExercise(trainingExercise));
	}, [trainingExercise, userWeight]);

	// TODO-mav Make useEffect for saving automatically

	const handleSave = useCallback(() => {
		if (!isValid) {
			return;
		}

		const validTrainingExercise = removeCustomIds(trainingExercise);
		trainingExerciseFromNavigation
			? onEdit(trainingId, validTrainingExercise)
			: onSave(trainingId, validTrainingExercise);
	}, [isValid, trainingExerciseFromNavigation, onEdit, trainingId, trainingExercise, onSave]);

	const handleSetExercise = useCallback((exercise: ExerciseModel | null) => {
		setSelectedExercise(exercise);
		setTrainingExercise(prevTrainingExercise => ({
			...prevTrainingExercise,
			exerciseId: exercise?._id ?? '',
			type: exercise?.type ?? ExerciseTypes.Default,
		}));
	}, []);

	const handleSetSets = useCallback((updated: ICreateTrainingExercise) => {
		setTrainingExercise(prevTrainingExercise => ({
			...prevTrainingExercise,
			seriesList: updated.seriesList,
		}));
	}, []);

	const tooltip = useCallback(
		({ onCancelAutocompletion }: ISelectedItemIconActions) => (
			<TooltipMenu
				items={[
					{
						title: t('About exercise'),
						onPress: () => {},
						key: 'about',
						isShown: true,
					},
					{
						title: t('Change'),
						onPress: onCancelAutocompletion,
						key: 'change',
						isShown: true,
					},
				]}
				iconStyle={commonStyles.selectedExerciseAutocompleteIcon}
			/>
		),
		[t]
	);

	return (
		<KeyboardAwareScrollView style={commonStyles.wrapper} scrollEnabled={!!selectedExercise}>
			<View style={commonStyles.headingRow}>
				<H1 text={t('Creation of exercise')} wrapperStyle={commonStyles.h1} />

				<View style={commonStyles.actionsRow}>
					<Button
						type="clear"
						icon={{ name: 'close', type: 'ionicon', size: FontSizes.Accent, color: Colors.Darkgray }}
						buttonStyle={commonStyles.actionButton}
						containerStyle={commonStyles.actionButtonContainer}
						onPress={goBack}
					/>
					<Button
						type="clear"
						icon={{
							name: 'checkmark',
							type: 'ionicon',
							size: FontSizes.Accent,
							color: isValid ? Colors.LightGreen : Colors.Grey,
						}}
						buttonStyle={commonStyles.actionButton}
						containerStyle={commonStyles.actionButtonContainer}
						disabled={!isValid}
						onPress={handleSave}
					/>
				</View>
			</View>

			<AutocompleteInput<ExerciseModel>
				label={t('Nomination')}
				placeholder={t('Enter nomination')}
				autocompleteList={exerciseList}
				autocompleteField={'name'}
				selectedItem={selectedExercise}
				autocompleteType="starts-with"
				changeSelectedItem={handleSetExercise}
				selectedItemRightIcon={tooltip}
				onShowSelected={v => v.name}
			/>

			{selectedExercise?.type === ExerciseTypes.Default && (
				<DefaultSets trainingExercise={trainingExercise as IDefaultTrainingExercise} onChange={handleSetSets} />
			)}
			{selectedExercise?.type === ExerciseTypes.WithAdditionalWeight && (
				<WithAdditionalWeightSets
					trainingExercise={trainingExercise as IAdditionalWeightTrainingExercise}
					onChange={handleSetSets}
				/>
			)}
			{selectedExercise?.type === ExerciseTypes.WithNegativeWeight && (
				<WithNegativeWeightSets
					trainingExercise={trainingExercise as INegativeWeightTrainingExercise}
					onChange={handleSetSets}
					userWeight={userWeight}
				/>
			)}
		</KeyboardAwareScrollView>
	);
};

const removeCustomIds = (trainingExercise: ICreateTrainingExercise): ICreateTrainingExercise => {
	return {
		...trainingExercise,
		seriesList: trainingExercise.seriesList.map(set => omit(set, ['_id'])) as ISet[],
	};
};

const getExerciseFromList = (id: string, list: ExerciseModel[]): ExerciseModel | null => {
	return list.find(exercise => exercise._id === id) ?? null;
};

const mapStateToProps: MapStateToProps<IState, IProps, IStore> = (store: IStore): IState => ({
	exerciseList: getExerciseList(store),
	userWeight: store.user.weightData.weight,
});

const mapDispatchToProps: MapDispatchToProps<IDispatch, IProps> = (dispatch: Dispatch<Action>): IDispatch => ({
	onSave: (trainingId, exercise) => {
		dispatch(TRAINING_ACTION_CREATORS.EXERCISE.ADD.START({ trainingId, exercise }));
	},
	onEdit: (trainingId, exercise) => {
		dispatch(TRAINING_ACTION_CREATORS.EXERCISE.EDIT.START({ trainingId, exercise }));
	},
	onFetchExercises: () => dispatch(fetchExercisesStart(null)),
});

export const CreateTrainingExerciseScreen = connect<IState, IDispatch, IProps, IStore>(
	mapStateToProps,
	mapDispatchToProps
)(Screen);

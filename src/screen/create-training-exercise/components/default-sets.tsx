import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CreateSet } from '@screen/create-training-exercise/components/create-set';
import { useTranslation } from 'react-i18next';
import { IBaseTrainingExercise, IDefaultTrainingExercise, ISet } from '@model/training-exercise';
import { deleteSet, editSet, repeatLastSet } from '@screen/create-training-exercise/helpers';
import { TRAINING_EXERCISES } from '@const/validation-const';
import { Fonts } from '@css/fonts';
import { useAddFirstSet } from '@screen/create-training-exercise/components/hooks';
import { SwipeListView } from 'react-native-swipe-list-view';
import { SwipeHiddenButton } from '@components/swipe-list/button';
import { Colors } from '@css/colors.style';
import { useThrottled } from '@util/hooks.util';

const SWIPE_LIST_OPEN_VALUE = -120;
const SWIPE_LIST_STOP_VALUE = -140;

interface ISwipeData {
	key: string;
	value: number;
	direction: 'left' | 'right';
	isOpen: boolean;
}

interface IProps {
	trainingExercise: IDefaultTrainingExercise;
	onChange: (trainingExercise: IBaseTrainingExercise) => void;
}

export const DefaultSets = (props: IProps) => {
	const { trainingExercise, onChange } = props;
	const { seriesList: sets } = trainingExercise;
	const { t } = useTranslation();

	useAddFirstSet(trainingExercise, onChange);

	const handleRepeatLast = useCallback(() => onChange(repeatLastSet(trainingExercise)), [trainingExercise, onChange]);
	const handleUpdate = useCallback((s: ISet) => onChange(editSet(s, trainingExercise)), [trainingExercise, onChange]);
	const handleDelete = useCallback((s: ISet) => onChange(deleteSet(s, trainingExercise)), [trainingExercise, onChange]);
	const handleDeleteCarried = useCallback((s: ISet) => () => handleDelete(s), [handleDelete]);
	const handleDeleteThrottled = useThrottled(handleDelete);

	const handleDeleteOnSwipe = useCallback(
		(swipeData: ISwipeData) => {
			const { key, value } = swipeData;
			if (value < SWIPE_LIST_OPEN_VALUE) {
				const currentSet = sets.find(set => set._id === key);
				if (currentSet) {
					handleDeleteThrottled(currentSet);
				}
			}
		},
		[handleDeleteThrottled, sets]
	);

	return (
		<View style={styles.wrapper}>
			<View style={styles.flex}>
				<View style={styles.sequenceNumber} />
				<Text style={styles.repeats}>{t('Repeats')}</Text>
				<View style={styles.multiply} />
				<Text style={styles.weight}>{t('Weight')}</Text>
				<Text style={styles.actions} />
			</View>

			<SwipeListView<ISet>
				data={sets}
				keyExtractor={s => s._id}
				disableRightSwipe={true}
				rightOpenValue={SWIPE_LIST_OPEN_VALUE}
				stopRightSwipe={SWIPE_LIST_STOP_VALUE}
				onSwipeValueChange={handleDeleteOnSwipe}
				closeOnScroll={true}
				closeOnRowBeginSwipe={true}
				renderItem={({ index, item }) => (
					<CreateSet
						index={index}
						set={item}
						maxSequenceNumber={TRAINING_EXERCISES.MAX}
						onChange={handleUpdate}
						onRepeatIconPress={index + 1 === sets?.length ? handleRepeatLast : undefined}
					/>
				)}
				renderHiddenItem={data => (
					<View style={styles.hiddenActionsWrapper}>
						<SwipeHiddenButton
							style={styles.button}
							title={t('Delete')}
							item={data.item}
							onTouch={handleDeleteCarried(data.item)}
							backgroundColor={Colors.LightRed}
							textColor={Colors.White}
						/>
					</View>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	flex: {
		marginTop: 20,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	sequenceNumber: {
		flex: 1,
	},
	repeats: {
		textAlign: 'center',
		flex: 4,
		fontFamily: Fonts.RobotoCondensedLight,
	},
	multiply: {
		flex: 1,
	},
	weight: {
		textAlign: 'center',
		flex: 4,
		fontFamily: Fonts.RobotoCondensedLight,
	},
	actions: {
		textAlign: 'center',
		flex: 2,
	},
	hiddenActionsWrapper: {
		flex: 1,
		flexDirection: 'row-reverse',
	},
	button: {
		width: 160,
		alignItems: 'flex-end',
	},
});

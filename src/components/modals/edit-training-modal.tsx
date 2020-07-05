import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { H2 } from '@components/heading/h2';
import { StringInputWithValidation } from '@inputs/string-input/string-input';
import { TRAINING_TITLE_MAXLENGTH, TRAINING_TITLE_MINLENGTH } from '@const/validation-const';
import { ColorPalette } from '@inputs/color-palette/color-palette';
import { Colors, PALETTE_COLORS } from '@css/colors.style';
import { Button } from '@components/button/button';
import { Overlay } from 'react-native-elements';
import { IErrors } from '@components/with-validation/with-validation';
import { ITraining } from '@model/training.model';
import { Fonts } from '@css/fonts';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { IStore } from '@redux/store';
import { selectTrainingById } from '@redux/selector/training.selector';
import { Dispatch } from 'redux';
import { TRAINING_ACTION_CREATORS } from '@redux/action/training-exercise.action';

interface IProps {}

interface IState {
	training: ITraining | null;
}

interface IDispatch {
	onCancel: () => void;
	onSave: (training: ITraining) => void;
}

const Modal: FC<IProps & IState & IDispatch> = props => {
	const { training, onSave, onCancel } = props;
	const { t } = useTranslation();

	const [form, setForm] = useState({
		name: training?.name ?? '',
		color: training?.color ?? '',
		valid: true,
	});
	const { color, name, valid } = form;

	useEffect(() => {
		if (training) {
			setForm({ name: training.name, color: training.color, valid: true });
		}
	}, [training]);

	const handleCancel = useCallback(() => onCancel(), [onCancel]);
	const handleSave = useCallback(() => {
		if (training && valid) {
			onSave({ ...training, name, color });
		}
	}, [color, name, onSave, training, valid]);

	const handleSetColor = useCallback((v: string) => setForm(prevState => ({ ...prevState, color: v })), []);
	const handleSetName = useCallback((value: string, errors?: IErrors) => {
		setForm(prevState => ({ ...prevState, name: value, valid: !errors }));
	}, []);

	return (
		<Overlay isVisible={!!training} onBackdropPress={handleCancel} overlayStyle={styles.overlayWrapper}>
			<View style={styles.overlayInnerWrapper}>
				<H2 text={t('Edit training')} wrapperStyle={styles.modalHeading} />

				<StringInputWithValidation
					label={t('Training name')}
					value={name}
					onChange={handleSetName}
					inputStyle={styles.rightPadding}
					containerStyle={styles.nameInputContainer}
					maxLength={[TRAINING_TITLE_MAXLENGTH, t('Max length is |len|', { len: TRAINING_TITLE_MAXLENGTH })]}
					minLength={[TRAINING_TITLE_MINLENGTH, t('Min length is |len|', { len: TRAINING_TITLE_MINLENGTH })]}
				/>

				<View style={styles.paletteWrapper}>
					<Text style={styles.asLabel}>{t('Choose training color')}</Text>
					<ColorPalette onChange={handleSetColor} value={color} colors={PALETTE_COLORS} />
				</View>

				<View style={styles.buttonHolder}>
					<Button solidType="gray" title={t('Cancel')} onPress={handleCancel} />
					<Button disabled={!valid} title={t('Save')} onPress={handleSave} />
				</View>
			</View>
		</Overlay>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 10,
	},
	heading: {
		textAlign: 'left',
	},
	iconWrapper: {
		height: '100%',
		position: 'absolute',
		right: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rightPadding: {},
	overlayWrapper: {
		width: '90%',
	},
	buttonHolder: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	overlayInnerWrapper: {
		padding: 10,
	},
	asLabel: {
		marginBottom: 2,
		fontSize: 14,
		fontFamily: Fonts.Kelson,
		fontWeight: 'normal',
		color: Colors.Primary,
	},
	paletteWrapper: {
		marginBottom: 10,
	},
	modalHeading: {
		marginBottom: 10,
	},
	nameInputContainer: { paddingHorizontal: 0 },
});

const mapStateToProps = (store: IStore): IState => ({
	training: selectTrainingById(store, store.training.trainingIdToUpdate) ?? null,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatch => ({
	onSave: training => dispatch(TRAINING_ACTION_CREATORS.UPDATE.START(training)),
	onCancel: () => dispatch(TRAINING_ACTION_CREATORS.SET_TO_UPDATE(null)),
});

export const EditTrainingModal = connect<IState, IDispatch, IProps, IStore>(mapStateToProps, mapDispatchToProps)(Modal);

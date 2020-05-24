import { TrainingModel } from '@model/training.model';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { H1 } from '@components/heading/h1';
import { EditIcon } from '@icons/edit.icon';
import { TRAINING_TITLE_MAXLENGTH, TRAINING_TITLE_MINLENGTH } from '@const/validation-const';
import { StringInputWithValidation } from '@components/inputs/string-input/string-input';
import { IErrors } from '@components/with-validation/with-validation';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/button/button';
import { Overlay } from 'react-native-elements';
import { ButtonIcon } from '@components/button-icon/button-icon';

interface IProps {
	training: TrainingModel;
	canEdit: boolean;
	onUpdateTrainingName: (name: string) => void;
}

export const TrainingHeading: FC<IProps> = props => {
	const { training, canEdit = true, onUpdateTrainingName } = props;
	const { t } = useTranslation();

	const [name, setName] = useState(training.name);
	const [isHeadingValid, changeIsHeadingValid] = useState(true);

	useEffect(() => {
		setName(training.name);
	}, [training.name]);

	const [isEdit, changeIsEdit] = useState(false);
	const handleEditButtonPress = useCallback(() => changeIsEdit(true), []);
	const handleCancelButtonPress = useCallback(() => {
		setName(training.name);
		changeIsEdit(false);
	}, [training.name]);
	const handleSaveButtonPress = () => {
		onUpdateTrainingName(name);
		changeIsEdit(false);
	};

	const handleChangeName = useCallback((name: string, errors?: IErrors) => {
		setName(name);
		changeIsHeadingValid(!errors);
	}, []);

	const heading = <H1 text={training.name} numberOfLinesEllipsis={1} style={[styles.heading, styles.rightPadding]} />;

	if (!canEdit) {
		return <View style={styles.wrapper}>{heading}</View>;
	}

	return (
		<View style={styles.wrapper}>
			{heading}

			<View style={styles.iconWrapper}>
				<ButtonIcon icon={<EditIcon />} onPress={handleEditButtonPress} />
			</View>

			<Overlay isVisible={isEdit} onBackdropPress={handleCancelButtonPress} overlayStyle={styles.overlayWrapper}>
				<View style={styles.overlayInnerWrapper}>
					<StringInputWithValidation
						label={t('Training name')}
						value={name}
						onChange={handleChangeName}
						inputStyle={styles.rightPadding}
						maxLength={[TRAINING_TITLE_MAXLENGTH, t('Max length is |len|', { len: TRAINING_TITLE_MAXLENGTH })]}
						minLength={[TRAINING_TITLE_MINLENGTH, t('Min length is |len|', { len: TRAINING_TITLE_MINLENGTH })]}
					/>

					<View style={styles.buttonHolder}>
						<Button solidType="gray" title={t('Cancel')} onPress={handleCancelButtonPress} />
						<Button onPress={handleSaveButtonPress} title={t('Save')} disabled={!isHeadingValid} />
					</View>
				</View>
			</Overlay>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		marginVertical: 10,
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
	rightPadding: {
		paddingRight: 35,
	},
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
});

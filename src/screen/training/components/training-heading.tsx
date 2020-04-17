import { TrainingModel } from '@model/training.model';
import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { H1 } from '@components/heading/h1';
import { SaveIcon } from '@icons/save.icon';
import { EditIcon } from '@icons/edit.icon';
import { TRAINING_TITLE_MAXLENGTH, TRAINING_TITLE_MINLENGTH } from '@const/validation-const';
import { StringInputWithValidation } from '@components/inputs/string-input/string-input';
import { IErrors } from '@components/with-validation/with-validation';
import { useTranslation } from 'react-i18next';
import { ButtonIcon } from '@components/button-icon/button-icon';

interface IProps {
	training: TrainingModel;
	canEdit: boolean;
	onUpdateTrainingName: (name: string) => void;
}

export const TrainingHeading: FC<IProps> = props => {
	const { training, canEdit = true, onUpdateTrainingName } = props;
	const { t } = useTranslation();

	const [name, changeName] = useState(training.name);
	const [isHeadingValid, changeIsHeadingValid] = useState(true);

	const [isEdit, changeIsEdit] = useState(false);
	const handleEditButtonPress = () => changeIsEdit(true);
	const handleSaveButtonPress = () => {
		onUpdateTrainingName(name);
		changeIsEdit(false);
	};

	const handleChangeName = (name: string, errors?: IErrors) => {
		changeName(name);
		changeIsHeadingValid(!errors);
	};

	const heading = <H1 text={name} numberOfLinesEllipsis={1} style={[styles.heading, styles.rightPadding]} />;

	if (!canEdit) {
		return <View style={styles.headingWrapper}>{heading}</View>;
	}

	return (
		<View style={styles.wrapper}>
			<View style={styles.headingWrapper}>
				{isEdit && (
					<StringInputWithValidation
						value={name}
						onChange={handleChangeName}
						inputStyle={styles.rightPadding}
						maxLength={[TRAINING_TITLE_MAXLENGTH, t('Max length is |len|', { len: TRAINING_TITLE_MAXLENGTH })]}
						minLength={[TRAINING_TITLE_MINLENGTH, t('Min length is |len|', { len: TRAINING_TITLE_MINLENGTH })]}
					/>
				)}
				{!isEdit && heading}

				<View style={styles.iconWrapper}>
					{isEdit && isHeadingValid && <ButtonIcon icon={<SaveIcon />} onPress={handleSaveButtonPress} />}
					{!isEdit && <ButtonIcon icon={<EditIcon />} onPress={handleEditButtonPress} />}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		marginHorizontal: 20,
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 50,
		marginTop: 10,
		marginBottom: 10,
	},
	headingWrapper: {
		flex: 1,
	},
	heading: {
		textAlign: 'left',
	},
	iconWrapper: {
		position: 'absolute',
		right: 10,
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rightPadding: {
		paddingRight: 35,
	},
});

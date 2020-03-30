import { TrainingModel } from '@model/training.model';
import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { H1 } from '@components/heading/h1';
import { SaveIcon } from '@icons/save.icon';
import { EditIcon } from '@icons/edit.icon';
import StringInput from '@components/string-input/string-input';

interface IProps {
	training: TrainingModel;
	canEdit: boolean;
	onUpdateTrainingName: (name: string) => void;
}

export const TrainingHeading: FC<IProps> = props => {
	const { training, canEdit = true, onUpdateTrainingName } = props;

	const [name, changeName] = useState(training.name);

	const [isEdit, changeIsEdit] = useState(false);
	const handleEditButtonPress = () => changeIsEdit(true);
	const handleSaveButtonPress = () => {
		onUpdateTrainingName(name);
		changeIsEdit(false);
	};

	const heading = <H1 text={name} numberOfLinesEllipsis={1} style={styles.heading} />;

	if (!canEdit) {
		return <View style={styles.headingWrapper}>{heading}</View>;
	}

	return (
		<View style={styles.wrapper}>
			<View style={styles.headingWrapper}>
				{isEdit && <StringInput value={name} onTextChange={changeName} />}
				{!isEdit && heading}
			</View>

			<View style={styles.iconWrapper}>
				{isEdit && <SaveIcon onPress={handleSaveButtonPress} />}
				{!isEdit && <EditIcon onPress={handleEditButtonPress} />}
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
	},
	headingWrapper: {
		flex: 1,
	},
	heading: {
		textAlign: 'left',
	},
	iconWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

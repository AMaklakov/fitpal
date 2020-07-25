import { ITraining } from '@model/training.model';
import React, { FC, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { H1 } from '@components/heading/h1';
import { EditIcon } from '@icons/edit.icon';
import { Button } from '@components/button/button';

interface IProps {
	training: ITraining;
	canEdit: boolean;
	onEdit?: (training: ITraining) => void;
}

export const TrainingHeading: FC<IProps> = props => {
	const { training, canEdit = true, onEdit } = props;

	const handleEditButtonPress = useCallback(() => onEdit?.(training), [onEdit, training]);

	const heading = useMemo(
		() => <H1 text={training.name} wrapperStyle={styles.headingWrapper} style={styles.heading} />,
		[training.name]
	);

	if (!canEdit) {
		return <View style={styles.wrapper}>{heading}</View>;
	}

	return (
		<View style={styles.wrapper}>
			{heading}

			<Button type="clear" icon={<EditIcon />} onPress={handleEditButtonPress} />
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headingWrapper: {
		flex: 1,
	},
	heading: {
		textAlign: 'left',
	},
});

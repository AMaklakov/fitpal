import React, { FC } from 'react';
import { IExercise } from '@model/exercise.model';
import { View } from 'react-native';
import { H2 } from '@components/heading/h2';
import { Text } from 'react-native-elements';
import { Button } from '@components/button/button';
import { useTranslation } from 'react-i18next';

interface IProps {
	exercise: IExercise;
	onClose?: () => void;
}

export const ExerciseDetails: FC<IProps> = props => {
	const { exercise, onClose } = props;
	const { t } = useTranslation();
	return (
		<View>
			<H2 text={exercise.name} />
			<Text>{exercise.description}</Text>

			{!!onClose && <Button solidType="gray" title={t('Close')} onPress={onClose} />}
		</View>
	);
};

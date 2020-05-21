import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/button/button';

interface IProps {
	onOpenModal: () => void;
}

export const Weight: FC<IProps> = ({ onOpenModal }) => {
	const { t } = useTranslation();

	return (
		<View style={styles.wrapper}>
			<Button type="outline" title={t('Change my weight')} onPress={onOpenModal} />
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

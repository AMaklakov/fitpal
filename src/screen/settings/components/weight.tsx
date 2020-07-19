import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/button/button';
import { Text } from 'react-native-elements';
import { BigSource } from 'big.js';
import { FontSizes } from '@css/fonts';
import { H2 } from '@components/heading/h2';

interface IProps {
	weight: BigSource;
	onOpenModal: () => void;
}

export const Weight: FC<IProps> = ({ onOpenModal, weight }) => {
	const { t } = useTranslation();

	return (
		<View style={styles.wrapper}>
			<H2 text={t('Weight')} />
			<Text style={styles.text}>
				{weight} {t('Kg')}
			</Text>
			<Button type="outline" title={t('Change my weight')} onPress={onOpenModal} />
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		fontSize: FontSizes.Big,
	},
});

import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@css/colors.style';
import { useTranslation } from 'react-i18next';

interface IProps {
	onOpenModal: () => void;
}

export const Weight: FC<IProps> = ({ onOpenModal }) => {
	const { t } = useTranslation();

	return (
		<View style={styles.wrapper}>
			<TouchableOpacity onPress={onOpenModal} style={styles.buttonWrapper}>
				<Text>{t('Change my weight')}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
	},
	buttonWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderColor: Colors.Black,
		borderRadius: 10,
		borderWidth: 1,
	},
});

import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { H2 } from '@components/heading/h2';
import { SelectInput } from '@components/select-input';
import { useTranslation } from 'react-i18next';
import { Languages } from '@i18n/index';

interface IItem {
	label: string;
	value: Languages;
}

interface IProps {
	lang: Languages;
	onChange: (lang: Languages | null) => void;
}

export const Language = (props: IProps) => {
	const { lang, onChange } = props;
	const { t } = useTranslation();

	const LANGUAGES_LIST: IItem[] = useMemo(
		() =>
			Object.keys(Languages).map(langKey => ({
				label: t(langKey),
				value: (Languages as any)[langKey],
			})),
		[t]
	);

	const handleChange = (value: Languages | null) => onChange(value);

	return (
		<View style={styles.wrapper}>
			<H2 text={t('Language')} />
			<View style={styles.inputWrapper}>
				<SelectInput<IItem> items={LANGUAGES_LIST} value={lang} onChange={handleChange} placeholder={{}} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	inputWrapper: {
		minWidth: '50%',
	},
});

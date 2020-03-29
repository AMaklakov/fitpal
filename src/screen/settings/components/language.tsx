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
		<View>
			<H2 text={t('Language')} />
			<SelectInput<IItem> items={LANGUAGES_LIST} value={lang} onChange={handleChange} placeholder={{}} />
		</View>
	);
};

const styles = StyleSheet.create({});

import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { removeLeadingZeros } from '@util/string.util';
import { Colors } from '@css/colors.style';
import { withValidation } from '@components/with-validation/with-validation';
import { Input, InputProps } from 'react-native-elements';
import { Fonts, FontSizes } from '@css/fonts';
import { useTranslation } from 'react-i18next';

interface IProps extends Omit<InputProps, 'onChange'> {
	value?: string;
	onChange: (v: string) => void;
	hasShadow?: boolean;
	haveErrorMessage?: boolean;
}

export const IntegerNumberInput: FC<IProps> = (props: IProps) => {
	const { value = '', onChange, hasShadow = true, haveErrorMessage = false,  ...rest } = props;
	const { t } = useTranslation();

	const [isFocused, setFocused] = useState(false);

	const handleTextChange = useCallback((v: string) => onChange(removeLeadingZeros(v)), [onChange]);

	const handleFocus = useCallback(() => setFocused(true), []);
	const handleBlur = useCallback(() => setFocused(false), []);

	return (
		<View style={styles.inputBlock}>
			<Input
				onChangeText={handleTextChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={value}
				placeholderTextColor={Colors.Darkgray}
				keyboardType="number-pad"
				returnKeyType="done"
				returnKeyLabel={t('Done')}
				labelStyle={[styles.labelStyle]}
				errorStyle={haveErrorMessage && [styles.errorMessage]}
				inputContainerStyle={[
					styles.inputWrapper,
					isFocused && styles.focused,
					hasShadow && styles.shadow,
					!!rest.errorMessage && styles.error,
					haveErrorMessage && styles.inputErrorWrapper
				]}
				{...rest}
			/>
		</View>
	);
};

export const IntegerNumberInputWithValidation = withValidation(IntegerNumberInput);

const styles = StyleSheet.create({
	inputBlock: {
		minHeight: 70,
		position: 'relative',
	},
	inputWrapper: {
		paddingHorizontal: 5,
		borderWidth: 1,
		borderColor: 'transparent',
		borderRadius: 5,
		backgroundColor: Colors.White,
	},
	inputErrorWrapper: {
		position: 'absolute',
	},
	input: {
		color: Colors.Black,
		fontSize: FontSizes.Medium,
	},
	focused: {
		borderColor: Colors.Accent,
	},
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
	labelStyle: {
		position: 'relative',
		marginBottom: 2,
		fontSize: FontSizes.Small,
		fontFamily: Fonts.Kelson,
		fontWeight: 'normal',
		color: Colors.Primary,
	},
	error: {
		borderColor: Colors.LightRed,
	},
	errorMessage: {
		top: 50,
		fontSize: FontSizes.SmallHint,
	}
});

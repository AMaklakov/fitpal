import React, { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '@css/colors.style';
import { Input, InputProps } from 'react-native-elements';
import { withValidation } from '@components/with-validation/with-validation';
import { Fonts, FontSizes } from '@css/fonts';

interface IProps extends Omit<InputProps, 'onChange'> {
	value: string;
	onChange: (v: string) => void;

	isPassword?: boolean;
	hasShadow?: boolean;
}

export const StringInput: FC<IProps> = (props: IProps) => {
	const { onChange, value, isPassword = false, hasShadow = true, ...rest } = props;

	const [isFocused, setFocused] = useState(false);
	const onTextChangeHandler = useCallback((v: string) => onChange(v), [onChange]);

	const handleFocus = useCallback(() => setFocused(true), []);
	const handleBlur = useCallback(() => setFocused(false), []);

	return (
		<Input
			value={value}
			onChangeText={onTextChangeHandler}
			labelStyle={[styles.labelStyle]}
			onFocus={handleFocus}
			onBlur={handleBlur}
			secureTextEntry={isPassword}
			inputContainerStyle={[styles.inputWrapper, isFocused && styles.focused, hasShadow && styles.shadow]}
			{...rest}
		/>
	);
};

export const StringInputWithValidation = withValidation(StringInput);

const styles = StyleSheet.create({
	inputWrapper: {
		paddingHorizontal: 5,
		borderWidth: 1,
		borderColor: 'transparent',
		borderRadius: 5,
		backgroundColor: Colors.White,
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
		marginBottom: 2,
		fontSize: FontSizes.Small,
		fontFamily: Fonts.Kelson,
		fontWeight: 'normal',
		color: Colors.Primary,
	},
});

import React, { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '@css/colors.style';
import { Input, InputProps } from 'react-native-elements';
import { withValidation } from '@components/with-validation/with-validation';
import { Fonts, FontSizes } from '@css/fonts';

interface IProps extends Omit<InputProps, 'onChange'> {
	onChange: (v: string) => void;
	value?: string;
	isPassword?: boolean;
	hasShadow?: boolean;
	onFocus?: () => void;
	onBlur?: () => void;
}

export const StringInput: FC<IProps> = (props: IProps) => {
	const {
		onChange,
		value,
		isPassword = false,
		hasShadow = true,
		inputContainerStyle,
		onFocus,
		onBlur,
		...rest
	} = props;

	const [isFocused, setFocused] = useState(false);
	const onTextChangeHandler = useCallback((v: string) => onChange(v), [onChange]);

	const handleFocus = useCallback(() => {
		setFocused(true);
		onFocus?.();
	}, [onFocus]);
	const handleBlur = useCallback(() => {
		setFocused(false);
		onBlur?.();
	}, [onBlur]);

	return (
		<Input
			value={value}
			onChangeText={onTextChangeHandler}
			labelStyle={[styles.labelStyle]}
			inputStyle={styles.input}
			onFocus={handleFocus}
			onBlur={handleBlur}
			secureTextEntry={isPassword}
			inputContainerStyle={[
				styles.inputWrapper,
				isFocused && styles.focused,
				hasShadow && styles.shadow,
				inputContainerStyle,
			]}
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
		backgroundColor: Colors.WhiteSandy,
	},
	input: {
		color: Colors.Black,
		fontSize: FontSizes.Medium,
		fontFamily: Fonts.RobotoCondensed,
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
		fontFamily: Fonts.RobotoCondensed,
		fontWeight: '200',
		color: Colors.Primary,
	},
});

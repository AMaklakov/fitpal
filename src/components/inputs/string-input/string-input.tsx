import React, { FC } from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle, View } from 'react-native';
import { Colors, placeholderTextColor } from '@css/colors.style';
import { withValidation } from '@components/with-validation/with-validation';

interface IProps {
	placeholder?: string;

	value: string;
	onChange: (v: string) => void;

	isPassword?: boolean;
	inputStyle?: StyleProp<TextStyle>;
}

export const StringInput: FC<IProps> = (props: IProps) => {
	const { onChange, placeholder = '', value, inputStyle = {}, isPassword = false } = props;

	const onTextChangeHandler = (v: string) => onChange(v);

	return (
		<View style={styles.inputWrapper}>
			<TextInput
				style={[styles.input, inputStyle]}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				onChangeText={onTextChangeHandler}
				value={value}
				secureTextEntry={isPassword}
			/>
		</View>
	);
};

export const StringInputWithValidation = withValidation(StringInput);

const styles = StyleSheet.create({
	inputWrapper: {
		borderWidth: 1,
		borderColor: Colors.Black,
		borderRadius: 15,
	},
	input: {
		color: Colors.Black,
		padding: 10,
		fontSize: 16,
	},
});

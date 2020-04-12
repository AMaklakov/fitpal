import React from 'react';
import style from './style';
import { TextInputPropsModel } from './types';
import { TextInput, View } from 'react-native';
import { placeholderTextColor } from '../../css/colors.style';

const DEFAULT_MAX_LENGTH = 500;
const DEFAULT_PLACEHOLDER = 'Enter some text here...';

const StringInput = (props: TextInputPropsModel) => {
	const {
		maxLength = DEFAULT_MAX_LENGTH,
		onTextChange,
		placeholder = DEFAULT_PLACEHOLDER,
		value,
		inputStyle = {},
	} = props;

	const onTextChangeHandler = (v: string) => {
		onTextChange(v);
	};

	return (
		<View style={style.inputWrapper}>
			<TextInput
				style={[style.input, inputStyle]}
				maxLength={maxLength}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				onChangeText={onTextChangeHandler}
				value={value}
			/>
		</View>
	);
};

export default StringInput;

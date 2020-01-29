import React, { useState } from 'react';
import style from './style';
import { TextInputPropsModel } from './types';
import { TextInput } from 'react-native';

const StringInput = (props: TextInputPropsModel) => {
	const [value, setValue] = useState(props?.initValue ?? '');
	const [maxLength] = useState(props?.maxLength ?? 500);

	const onTextChange = (v: string) => {
		setValue(v);

		props?.onTextChange(value);
	};

	return (
		<TextInput
			style={style.input}
			maxLength={maxLength}
			placeholder={props?.placeholder}
			onChangeText={onTextChange}
			value={value}
		/>
	);
};

export default StringInput;

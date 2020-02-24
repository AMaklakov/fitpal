import React, { useState } from 'react';
import { AutocompleteInputProps, SelectedItemViewComponentProps } from './types';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { autocomplete } from './helpers';
import style from './style';
import { placeholderTextColor } from '../../css/colors.style';

const DEFAULT_SELECTED_ITEM_COMPONENT = ({
	item,
	onCancel,
}: SelectedItemViewComponentProps<{ [key: string]: any }>) => (
	<View>
		<Text>{Object.keys(item).reduce((buffer, k) => (buffer += `${k} - ${item[k]}`), '')}</Text>
		<Text onPress={onCancel}>ⓧ</Text>
	</View>
);

const AutocompleteInput = <T extends Object>(props: AutocompleteInputProps<T>) => {
	const {
		autocompleteField,
		autocompleteList,
		changeSelectedItem,
		placeholder,
		selectedItem,
		selectedItemViewComponent = DEFAULT_SELECTED_ITEM_COMPONENT,
	} = props;

	const [value, changeValue] = useState('');
	const [filteredAutocompleteList, setFilteredAutocompleteList] = useState<T[]>([]);

	const onChangeTextHandler = (v: string): void => {
		changeValue(v);

		setFilteredAutocompleteList(
			v ? autocomplete({ value: v, autocompleteList, autocompleteField }) : []
		);
	};

	const selectAutocompletion = (autocompleteObj: T) => () => {
		changeSelectedItem(autocompleteObj);

		setFilteredAutocompleteList([]);
	};

	const cancelAutocompletion = () => {
		changeSelectedItem(null);
		changeValue('');
	};

	if (selectedItem !== null) {
		return (
			<View style={style.selectedWrapper}>
				{selectedItemViewComponent({ item: selectedItem, onCancel: cancelAutocompletion })}
			</View>
		);
	}

	return (
		<View style={style.inputWrapper}>
			<TextInput
				style={style.input}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				onChangeText={onChangeTextHandler}
				value={value}
			/>

			{filteredAutocompleteList?.length > 0 && (
				<ScrollView style={style.scrollArea}>
					{filteredAutocompleteList.map((x, i) => (
						<TouchableOpacity key={`autocomplete-field-${i}`} onPress={selectAutocompletion(x)}>
							<View>
								<Text>{x[autocompleteField]}</Text>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			)}
		</View>
	);
};

export default AutocompleteInput;

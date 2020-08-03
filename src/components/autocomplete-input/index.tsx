import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { autocomplete } from './helpers';
import { Colors } from '@css/colors.style';
import { Fonts, FontSizes } from '@css/fonts';
import { StringInput } from '@inputs/string-input/string-input';
import { IconNode } from 'react-native-elements';

export interface SelectedItemViewComponentProps<T extends Object> {
	item: T;
	onCancel: () => void;
}

export interface ISelectedItemIconActions {
	onCancelAutocompletion: () => void;
}

interface IProps<T extends Object> {
	selectedItem: T | null;
	changeSelectedItem: (newVal: T | null) => void;
	autocompleteList: T[];
	autocompleteField: keyof T;
	autocompleteType?: 'substring' | 'starts-with';
	selectedItemRightIcon?: (actions: ISelectedItemIconActions) => IconNode;

	selectedItemViewComponent?: React.FC<SelectedItemViewComponentProps<T>>;
	onShowSelected?: (item: T) => string;
	placeholder?: string;
	label?: string;
}

export const AutocompleteInput = <T extends Object>(props: IProps<T>) => {
	const { autocompleteField, autocompleteList, changeSelectedItem, placeholder, selectedItem, label } = props;
	const { selectedItemViewComponent, onShowSelected, autocompleteType = 'starts-with', selectedItemRightIcon } = props;

	const [value, setValue] = useState('');
	const [filteredAutocompleteList, setFilteredAutocompleteList] = useState<T[]>([]);

	const handleTextChange = useCallback(
		(v: string): void => {
			setValue(v);
			setFilteredAutocompleteList(autocomplete({ value: v, autocompleteList, autocompleteField, autocompleteType }));
		},
		[autocompleteField, autocompleteList, autocompleteType]
	);

	const selectAutocompletion = useCallback(
		(autocompleteObj: T) => () => {
			changeSelectedItem(autocompleteObj);
			setFilteredAutocompleteList([]);
		},
		[changeSelectedItem]
	);

	const handleCancelAutocompletion = useCallback(() => {
		changeSelectedItem(null);
		setValue('');
	}, [changeSelectedItem]);

	const handleFocus = useCallback(() => handleTextChange(value), [handleTextChange, value]);

	if (selectedItem !== null && selectedItemViewComponent) {
		return <View>{selectedItemViewComponent({ item: selectedItem, onCancel: handleCancelAutocompletion })}</View>;
	}

	if (selectedItem !== null && !selectedItemViewComponent && onShowSelected) {
		return (
			<StringInput
				label={label}
				value={onShowSelected(selectedItem)}
				caretHidden={true}
				rightIcon={
					selectedItemRightIcon
						? selectedItemRightIcon({ onCancelAutocompletion: handleCancelAutocompletion })
						: { name: 'clear', onPress: handleCancelAutocompletion }
				}
				onChange={noop}
				disabled={true}
				disabledInputStyle={styles.disabledInput}
				inputContainerStyle={styles.inputContainer}
				errorStyle={styles.errorInput}
			/>
		);
	}

	return (
		<View style={styles.inputWrapper}>
			<StringInput
				label={label}
				placeholder={placeholder}
				onChange={handleTextChange}
				value={value}
				inputContainerStyle={styles.inputContainer}
				errorStyle={styles.errorInput}
				onFocus={handleFocus}
			/>

			{filteredAutocompleteList?.length > 0 && (
				<View style={styles.scrollArea}>
					<FlatList<T>
						data={filteredAutocompleteList}
						keyExtractor={(s, index) => `autocomplete-field-${s[autocompleteField]}-${index}`}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={selectAutocompletion(item)}>
								<View>
									<Text style={styles.h3}>{item[autocompleteField]}</Text>
								</View>
							</TouchableOpacity>
						)}
					/>
				</View>
			)}
		</View>
	);
};

const noop = () => {};

const styles = StyleSheet.create({
	inputWrapper: {
		position: 'relative',
		overflow: 'visible',
	},
	scrollArea: {
		height: 200,
		padding: 10,
		position: 'absolute',
		marginHorizontal: 10,
		left: 0,
		right: 0,
		top: '110%',
		borderBottomStartRadius: 15,
		backgroundColor: Colors.WhiteSandy,

		shadowColor: Colors.Black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		elevation: 5,
	},
	h3: {
		paddingTop: 5,
		paddingBottom: 5,
		fontSize: FontSizes.Big,
		fontFamily: Fonts.RobotoCondensed,
		fontWeight: '300',
	},
	asLabel: {
		fontFamily: Fonts.RobotoCondensedLight,
		fontSize: 14,
	},
	defaultPaddingHorizontal: {
		paddingHorizontal: 24,
	},
	cancelButton: {
		position: 'absolute',
		right: 0,
		top: 13,
	},
	disabledInput: {
		opacity: 1,
	},
	inputContainer: {
		height: 40,
	},
	errorInput: {
		display: 'none',
	},
});

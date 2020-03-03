import { Item } from 'react-native-picker-select';
import { PropType } from '../../util/type.util';
import { StyleSheet } from 'react-native';

export interface SelectInputProps<T extends Item> {
	items: T[];
	value?: PropType<T, 'value'> | null;
	onChange: (value: PropType<T, 'value'> | null, index: number) => void;

	styles?: StyleSheet.NamedStyles<any>;
}

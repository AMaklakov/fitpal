import { Item } from 'react-native-picker-select';
import { PropType } from '../../util/type.util';

export interface SelectInputProps<T extends Item> {
	items: T[];
	onChange: (value: PropType<T, 'value'> | null, index: number) => void;
}

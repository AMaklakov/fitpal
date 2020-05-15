import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export function useDebounce<T>(value: T, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

/**
 * Like Localstorage in web
 */
export const useAsyncStorage = (key: string = 'token') => {
	const [storageItem, setStorageItem] = useState<string | null>(null);

	const getStorageItem = useCallback(async () => {
		const data = await AsyncStorage.getItem(key);
		setStorageItem(data);
	}, [key]);

	const updateStorageItem = useCallback(
		(data: string | null) => {
			if (typeof data !== 'string') {
				return data;
			}

			AsyncStorage.setItem(key, data);
			setStorageItem(data);
			return data;
		},
		[key]
	);

	const clearStorageItem = useCallback(() => {
		AsyncStorage.removeItem(key);
		setStorageItem(null);
	}, [key]);

	useEffect(() => {
		getStorageItem();
	}, [getStorageItem]);

	return [storageItem, updateStorageItem, clearStorageItem];
};

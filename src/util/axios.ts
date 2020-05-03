import axiosLib from 'axios';
import { SERVER_URL } from '@const/server-const';
import AsyncStorage from '@react-native-community/async-storage';

export const axios = axiosLib.create({
	baseURL: `${SERVER_URL}/api/v1/`,
});

axios.interceptors.request.use(
	async request => {
		const token = await getToken();
		if (token) {
			request.headers.Authorization = `Bearer ${token}`;
		}

		return request;
	},
	error => Promise.reject(error)
);

export const setToken = async (token: string) => await AsyncStorage.setItem('token', token);
export const getToken = async () => await AsyncStorage.getItem('token');
export const removeToken = async () => await AsyncStorage.removeItem('token');
